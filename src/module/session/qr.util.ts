import * as crypto from 'crypto';

const HMAC_SECRET = process.env.HMAC_SECRET || 'change_it';

export function makeToken(sessionId: string){
  const ts = Math.floor(Date.now()/1000);
  const nonce = crypto.randomBytes(6).toString('hex');
  const payload = JSON.stringify({ session_id: sessionId, ts, nonce, v:1 });
  const signature = crypto.createHmac('sha256', HMAC_SECRET).update(payload).digest('base64url');
  return Buffer.from(payload).toString('base64url') + '.' + signature;
}

export function verifyToken(token: string, allowedSkewSeconds = 30) {
  try {
    const [payloadB64, sig] = token.split('.');
    const payload = Buffer.from(payloadB64, 'base64url').toString('utf8');
    const expectedSig = crypto.createHmac('sha256', HMAC_SECRET).update(payload).digest('base64url');
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig))) return { ok: false, reason: 'bad-sign' };
    const obj = JSON.parse(payload);
    const now = Math.floor(Date.now()/1000);
    if (Math.abs(now - obj.ts) > allowedSkewSeconds) return { ok: false, reason: 'stale' };
    return { ok: true, payload: obj };
  } catch (err) {
    return { ok: false, reason: 'err', detail: (err as Error).message };
  }
}

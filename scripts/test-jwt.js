const { SignJWT, jwtVerify } = require('jose');
const fs = require('fs');
const path = require('path');
(async ()=>{
  const env = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8');
  const secretMatch = env.match(/JWT_SECRET\s*=\s*"?(.*?)"?$/m);
  const secret = secretMatch ? secretMatch[1].replace(/^['\"]|['\"]$/g,'') : null;
  if(!secret){ console.error('no secret'); process.exit(1); }
  const key = new TextEncoder().encode(secret);
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .setIssuer('royyan-collectibles')
    .setAudience('admin-panel')
    .sign(key);
  console.log('token:', token);
  const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'], issuer: 'royyan-collectibles', audience: 'admin-panel' });
  console.log('payload role:', payload.role);
})();

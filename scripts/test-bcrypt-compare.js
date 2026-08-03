const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const env = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8');
const match = env.match(/ADMIN_PIN_HASH\s*=\s*"?(.*?)"?$/m);
const hash = match ? match[1].replace(/\\\$/g, '$') : null;
if (!hash) {
  console.error('No hash found');
  process.exit(1);
}
bcrypt.compare('130903', hash).then(r => console.log('compare result:', r)).catch(e => { console.error(e); process.exit(1); });

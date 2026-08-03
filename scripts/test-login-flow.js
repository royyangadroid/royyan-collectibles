const fs = require('fs');
const path = require('path');
const fetch = global.fetch;

function readEnv() {
  const p = path.join(__dirname, '..', '.env.local');
  if (!fs.existsSync(p)) throw new Error('.env.local missing');
  const env = fs.readFileSync(p, 'utf8');
  const get = (k) => {
    const m = env.match(new RegExp(k + "\\s*=\\s*\"?(.*?)\"?$", 'm'));
    return m ? m[1].replace(/^['\"]|['\"]$/g, '').replace(/\\\$/g, '$') : null;
  };
  return { ADMIN_ACCESS_KEY: get('ADMIN_ACCESS_KEY'), HOST: get('HOST') || 'http://localhost:3000' };
}

async function waitForServer(url, attempts = 30, delayMs = 1000) {
  for (let i = 0; i < attempts; i++) {
    try {
      const r = await fetch(url, { method: 'GET' });
      if (r.ok) return true;
    } catch (e) {}
    await new Promise(r => setTimeout(r, delayMs));
  }
  return false;
}

(async ()=>{
  try {
    const env = readEnv();
    const host = env.HOST;
    const accessKey = env.ADMIN_ACCESS_KEY || 'royyan-admin-secret-7x';
    console.log('HOST:', host);
    console.log('ADMIN_ACCESS_KEY:', accessKey ? 'present' : 'missing');

    const ready = await waitForServer(host + '/api/rcpanel7x/csrf');
    if (!ready) throw new Error('Server not responding at ' + host);

    // Get CSRF
    const res = await fetch(host + '/api/rcpanel7x/csrf');
    const body = await res.text();
    console.log('\n== CSRF GET raw response ==');
    console.log('status', res.status);
    console.log('headers set-cookie:', res.headers.get('set-cookie'));
    console.log('body:', body);

    const json = JSON.parse(body);
    const csrfToken = json.csrfToken;
    const setcookie = res.headers.get('set-cookie') || '';
    // extract cookie name=value pair
    const cookiePair = (setcookie.split(';')[0]) || '';

    console.log('\nUsing csrfToken:', csrfToken);
    console.log('Using cookie header:', cookiePair);

    // Now login
    const payload = { pin: '130903', csrfToken, accessKey };
    const loginRes = await fetch(host + '/api/rcpanel7x/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'cookie': cookiePair
      },
      body: JSON.stringify(payload),
    });
    const loginText = await loginRes.text();
    let loginJson = null;
    try { loginJson = JSON.parse(loginText); } catch(e){}

    console.log('\n== LOGIN POST response ==');
    console.log('status', loginRes.status);
    console.log('set-cookie:', loginRes.headers.get('set-cookie'));
    console.log('body:', loginJson || loginText);

    process.exit(0);
  } catch (err) {
    console.error('ERROR:', err.message || err);
    process.exit(2);
  }
})();

const bcrypt = require('bcryptjs');

async function test() {
  const pin = '123456';
  // Let's test the hash with and without quotes
  const hashWithQuotes = '"$2b$12$IDKHS1rWO8AugksL.m6ZO.mZYpQo.2r7z/zUrRzKY9ABH4CB/MBay"';
  const hashWithoutQuotes = '$2b$12$IDKHS1rWO8AugksL.m6ZO.mZYpQo.2r7z/zUrRzKY9ABH4CB/MBay';

  try {
    const res1 = await bcrypt.compare(pin, hashWithQuotes);
    console.log('Result with quotes:', res1);
  } catch (e) {
    console.log('Error with quotes:', e.message);
  }

  try {
    const res2 = await bcrypt.compare(pin, hashWithoutQuotes);
    console.log('Result without quotes:', res2);
  } catch (e) {
    console.log('Error without quotes:', e.message);
  }
}

test();

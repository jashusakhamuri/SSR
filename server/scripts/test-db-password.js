const { Client } = require('pg');

const passwordsToTest = [
  'Jaswanth@1234',
  'Jaswant',
  'postgres',
  'admin',
  'root',
  '123456',
  '1234',
  ''
];

async function testPasswords() {
  console.log('Testing PostgreSQL passwords...\n');
  for (const pw of passwordsToTest) {
    const client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'postgres',
      password: pw,
      port: 5432,
      connectionTimeoutMillis: 2000,
    });

    try {
      await client.connect();
      console.log(`✅ SUCCESS! Correct password is: "${pw}"`);
      await client.end();
      return pw;
    } catch (err) {
      if (err.code === '28P01') {
        console.log(`❌ Failed: "${pw}" (Incorrect Password)`);
      } else {
        console.log(`⚠️ Connection Error for "${pw}":`, err.message);
      }
    }
  }
  console.log('\nNone of the common passwords worked.');
}

testPasswords();

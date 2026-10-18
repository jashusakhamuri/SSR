/**
 * Generate a bcrypt hash for the admin password.
 * Run: node scripts/gen-admin-hash.js
 * Copy the output hash into database/schema.sql INSERT INTO admins line.
 */
const bcrypt = require('bcryptjs');

const password = process.argv[2] || 'Admin@123';
bcrypt.hash(password, 12, (err, hash) => {
  if (err) { console.error(err); process.exit(1); }
  console.log('\n✅ Bcrypt hash for password:', password);
  console.log('\n' + hash + '\n');
  console.log('Update schema.sql admins INSERT with this hash.\n');
});

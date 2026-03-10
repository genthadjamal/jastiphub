const { Client } = require('pg');
const bcrypt = require('bcryptjs');

async function main() {
    // Use session mode (port 6543) to avoid SASL issues with transaction mode pooler
    const connStr = process.env.DATABASE_URL.replace(':5432/', ':6543/');
    const client = new Client({ connectionString: connStr });
    await client.connect();

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const id = 'admin_' + Date.now();

    const result = await client.query(
        `INSERT INTO "User" (id, name, email, password, role, "createdAt", "updatedAt")
     VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
     ON CONFLICT (email) DO NOTHING
     RETURNING email, name`,
        [id, 'Admin JastipHub', 'admin@jastiphub.com', hashedPassword, 'ADMIN']
    );

    if (result.rows.length > 0) {
        console.log('Admin created:', result.rows[0].email);
    } else {
        console.log('Admin already exists (admin@jastiphub.com)');
    }

    await client.end();
}

main().catch(console.error);

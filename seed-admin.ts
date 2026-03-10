import { prisma } from './src/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = await prisma.user.upsert({
        where: { email: 'admin@jastiphub.com' },
        update: {},
        create: {
            name: 'Admin JastipHub',
            email: 'admin@jastiphub.com',
            password: hashedPassword,
            role: 'ADMIN'
        }
    });

    console.log('✅ Admin created successfully!');
    console.log('   Email:', admin.email);
    console.log('   Name:', admin.name);
}

main().catch(console.error);

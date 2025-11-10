const bcrypt = require('bcrypt')
const { PrismaClient } = require('../generated/prisma')

const prisma = new PrismaClient();

async function main() {
  console.log('Starting to inject test data...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: adminPassword,
      isActive: true,
    },
  });

  // Create test platform data
  await Promise.all([
    prisma.platform.upsert({
      where: { name: 'GitHub' },
      update: {},
      create: {
        name: 'GitHub',
      },
    }),
    prisma.platform.upsert({
      where: { name: 'Google' },
      update: {},
      create: {
        name: 'Google',
      },
    }),
    prisma.platform.upsert({
      where: { name: 'Microsoft' },
      update: {},
      create: {
        name: 'Microsoft',
      },
    }),
    prisma.platform.upsert({
      where: { name: 'Facebook' },
      update: {},
      create: {
        name: 'Facebook',
      },
    }),
  ]);
  console.log('Test data injection completed!');
  console.log('Default account credentials: admin / admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

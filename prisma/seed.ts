import 'dotenv/config';
import { AssetType, PaymentMethod, PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = "postgres://harcamayonetimi:harcamayonetimi123.@45.158.14.222:54399/harcamayonetimi";
if (!connectionString) {
  throw new Error(
    'Database URL is not defined. Set DATABASE_URL or POSTGRES_PRISMA_URL/POSTGRES_URL.',
  );
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.payment.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.asset.deleteMany();
  await prisma.card.deleteMany();

  const card = await prisma.card.create({
    data: {
      name: 'Primary Card',
      limit: '25000.00',
      currentDebt: '6000.00',
      statementDate: 10,
      dueDate: 20,
    },
  });

  await prisma.expense.createMany({
    data: [
      {
        amount: '1250.00',
        category: 'MARKET',
        description: 'Monthly grocery',
        date: new Date(),
        paymentMethod: PaymentMethod.CARD,
        cardId: card.id,
      },
      {
        amount: '320.00',
        category: 'TRANSPORT',
        description: 'Fuel',
        date: new Date(),
        paymentMethod: PaymentMethod.CASH,
      },
    ],
  });

  await prisma.payment.create({
    data: {
      amount: '1500.00',
      date: new Date(),
      cardId: card.id,
    },
  });

  await prisma.asset.createMany({
    data: [
      {
        type: AssetType.CASH,
        amount: '4000.00',
      },
      {
        type: AssetType.BANK,
        amount: '12000.00',
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

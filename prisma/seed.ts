import { Item, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const username = "admin";

  // cleanup the existing database
  await prisma.user.deleteMany()

  const hashedPassword = await bcrypt.hash("admin", 10);

  const admin = await prisma.user.create({
    data: {
      username,
      name: "admin",
      admin: true,
      verified: true,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: admin.id,
    },
  });

  await prisma.task.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: admin.id,
    },
  });

  const user = await prisma.user.create({
    data: {
      username: "user",
      name: "user",
      admin: false,
      verified: true,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });


  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.task.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });


  [
    {
      name: "Create Data Center",
      reference: "DC-001",
      number: "12231",
    },
    {
      name: "Create VSAT",
      reference: "DC-002",
      number: "12232",
    },
    {
      name: "Update Data Center",
      reference: "DC-003",
      number: "12233",
    }
  ].map(async (item) => {
    await prisma.item.create({
      data: {
        name: item.name,
        description: item.name,
        reference: item.reference,
        number: item.number,
        userId: admin.id,
        budget: {
          create: [
            {
              year: 2021,
              cash: (Number(Math.random().toFixed(4).slice(2)) * 1000),
              cost: (Number(Math.random().toFixed(4).slice(2)) * 1000),
              userId: admin.id,
            },
            {
              year: 2022,
              cash: (Number(Math.random().toFixed(4).slice(2)) * 1000),
              cost: (Number(Math.random().toFixed(4).slice(2)) * 1000),
              userId: admin.id,
            },
            {
              year: 2023,
              cash: (Number(Math.random().toFixed(4).slice(2)) * 1000),
              cost: (Number(Math.random().toFixed(4).slice(2)) * 1000),
              userId: admin.id,
            },
          ]
        },
      },
    });
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

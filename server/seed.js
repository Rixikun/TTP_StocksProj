const db = require("../server/db");
const { User, Stock, Transaction } = require("../server/db/models");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const users = [
    {
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123"
    },
    {
      name: "Jane Doe",
      email: "janedoe@email.com",
      password: "123"
    }
  ];
  const stocks = [
    {
      ticker: "ABC",
      price: 200,
      date: "2020-02-21 16:24:01.251-05"
    },
    {
      ticker: "EFG",
      price: 100,
      transactionId: 2,
      userId: 2
    },
    {
      ticker: "HIJ",
      price: 300
    },
    {
      ticker: "ABC",
      price: 500,
      date: "2020-02-22 16:24:01.251-05",
      transactionId: 1,
      userId: 1
    },
    {
      ticker: "KLM",
      price: 400
    }
  ];

  await Promise.all(
    users.map(user => {
      return User.create(user);
    })
  );

  console.log(`seeded ${users.length} users`);

  await Transaction.create({ userId: 1 });
  await Transaction.create({ userId: 2 });

  console.log(`seeded Transactions`);

  await Promise.all(
    stocks.map(async (stock, idx) => {
      await Stock.create(stock);
    })
  );

  console.log(`seeded ${stocks.length} stocks`);
  console.log(`seeded successfully`);
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}
module.exports = seed;

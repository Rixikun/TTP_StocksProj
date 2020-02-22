const db = require("../server/db");
const { User, Stock } = require("../server/db/models");

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
      name: "ABC",
      price: 200
    },
    {
      name: "EFG",
      price: 100
    },
    {
      name: "HIJ",
      price: 300
    }
  ];

  await Promise.all(
    users.map(user => {
      return User.create(user);
    })
  );
  console.log(`seeded ${users.length} users`);
  await Promise.all(
    stocks.map(stock => {
      return Stock.create(stock);
    })
  );
  console.log(`seeded ${stocks.length} users`);

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

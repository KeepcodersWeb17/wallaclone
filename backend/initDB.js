import { createInterface } from "node:readline";
import { connectMongoDB } from "./src/lib/connectMongoDB.js";
import User from "./src/models/User.js";

const ask = (questionText) => {
  return new Promise((resolve, reject) => {
    const consoleInterface = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    consoleInterface.question(questionText, (answer) => {
      consoleInterface.close();
      resolve(answer);
    });
  });
};

const resetUsers = async () => {
  try {
    // delete all Users in the MONGODB and store them in 'deletedUsers'
    const deletedUsers = await User.deleteMany();
    // log the number of Users deleted using the 'deletedUsers'
    console.log(`Deleted ${deletedUsers.deletedCount} users`);

    // insert DEFAULT users in the MONGODB and store them in 'defaultUsers'
    const defaultUsers = await User.insertMany([
      {
        username: "guille",
        email: "codesthenos@gtpm.com",
        password: await User.hashPassword("123456"),
      },
      {
        username: "agustin",
        email: "agustin@gtpm.com",
        password: await User.hashPassword("123456"),
      },
      {
        username: "alex",
        email: "stackoverlord@gtpm.com",
        password: await User.hashPassword("123456"),
      },
    ]);
    // log the number of users created using 'defaultUsers'
    console.log(`Inserted ${defaultUsers.length} users`);
  } catch (error) {
    console.error("ERROR RESETTING USERS", error);
  }
};

// Ask if SURE to RESET
try {
  await connectMongoDB();
  const responseAsk = await ask(
    "Are you sure about RESETTING the DATABASE to DEFAULT values?\n"
  );
  if (responseAsk.toLowerCase().trim() !== "yes") {
    console.log("RESET ABORTED");
    process.exit();
  }
} catch (error) {
  console.error("ERROR", error);
}

// Reset Users
try {
  await resetUsers();
} catch (error) {
  console.error("ERROR resetting Users", error);
}
// end process
process.exit();

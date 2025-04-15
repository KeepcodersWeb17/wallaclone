import { createInterface } from "node:readline";
import { connectMongoDB } from "./src/lib/connectMongoDB.js";
import User from "./src/models/User.js";
import Tag from "./src/models/Tag.js";
import { Advert } from "./src/models/Advert.js";

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
    console.error("ERROR RESETTING USERS", error.message);
  }
};

const resetTags = async () => {
  try {
    // delete all Tags in the MONGODB and store them in 'deletedTags'
    const deletedTags = await Tag.deleteMany();
    // log the number of Tags deleted using the 'deletedTags'
    console.log(`Deleted ${deletedTags.deletedCount} tags`);

    // insert DEFAULT tags in the MONGODB and store them in 'defaultTags'
    const defaultTags = await Tag.insertMany([
      {
        name: "motor",
      },
      {
        name: "mobile",
      },
      {
        name: "work",
      },
      {
        name: "lifestyle",
      },
    ]);
    // log the number of tags created using 'defaultTags'
    console.log(`Inserted ${defaultTags.length} tags`);
  } catch (error) {
    console.error("ERROR RESETTING TAGS", error.message);
  }
};

const resetAdverts = async () => {
  try {
    // delete all Adverts in the MONGODB and store them in 'deletedAdverts'
    const deletedAdverts = await Advert.deleteMany();
    // log the number of Adverts deleted using the 'deletedAdverts'
    console.log(`Deleted ${deletedAdverts.deletedCount} adverts`);

    // get the ids of the default users and tags
    const [
      guilleId,
      agustinId,
      alexId,
      motorId,
      mobileId,
      workId,
      lifestyleId,
    ] = await Promise.all([
      User.findOne({ username: "guille" }).select("_id"),
      User.findOne({ username: "agustin" }).select("_id"),
      User.findOne({ username: "alex" }).select("_id"),
      Tag.findOne({ name: "motor" }).select("_id"),
      Tag.findOne({ name: "mobile" }).select("_id"),
      Tag.findOne({ name: "work" }).select("_id"),
      Tag.findOne({ name: "lifestyle" }).select("_id"),
    ]);

    // insert DEFAULT adverts in the MONGODB and store them in 'defaultAdverts'
    const defaultAdverts = await Advert.insertMany([
      {
        name: "Camiseta",
        description: "Camiseta de color naranja",
        price: 10,
        image:
          "https://www.verdementa.es/media/cache/c/a/400/camiseta-manga-corta-tubular-naranja-m.webp",
        owner: guilleId,
        tags: [motorId, lifestyleId, workId, mobileId],
        sale: "sell",
        favorites: [],
      },
      {
        name: "Coche",
        description: "Coche de color rojo",
        price: 10000,
        image:
          "https://www.verdementa.es/media/cache/c/a/400/camiseta-manga-corta-tubular-naranja-m.webp",
        owner: agustinId,
        tags: [motorId, lifestyleId],
        sale: "buy",
        favorites: [],
      },
      {
        name: "Bicicleta",
        description: "Bicicleta de color azul",
        price: 500,
        image:
          "https://www.verdementa.es/media/cache/c/a/400/camiseta-manga-corta-tubular-naranja-m.webp",
        owner: alexId,
        tags: [mobileId, workId],
        sale: "sell",
        favorites: [],
      },
      {
        name: "Ordenador",
        description: "Ordenador de color gris",
        price: 1000,
        image:
          "https://www.verdementa.es/media/cache/c/a/400/camiseta-manga-corta-tubular-naranja-m.webp",
        owner: guilleId,
        tags: [motorId, lifestyleId],
        sale: "buy",
        favorites: [],
      },
      {
        name: "Zapato",
        description: "Zapato deportivo",
        price: 20,
        image:
          "https://www.verdementa.es/media/cache/c/a/400/camiseta-manga-corta-tubular-naranja-m.webp",
        owner: guilleId,
        tags: [motorId, mobileId],
        sale: "sell",
        favorites: [],
      },
      {
        name: "Gorra",
        description: "Gorra azul",
        price: 5,
        image:
          "https://www.verdementa.es/media/cache/c/a/400/camiseta-manga-corta-tubular-naranja-m.webp",
        owner: guilleId,
        tags: [workId],
        sale: "buy",
        favorites: [],
      },
      {
        name: "Libro",
        description: "Libro de bolsillo",
        price: 8,
        image:
          "https://www.verdementa.es/media/cache/c/a/400/camiseta-manga-corta-tubular-naranja-m.webp",
        owner: guilleId,
        tags: [lifestyleId, workId],
        sale: "sell",
        favorites: [],
      },
      {
        name: "Bolso",
        description: "Bolso pequeño",
        price: 15,
        image:
          "https://www.verdementa.es/media/cache/c/a/400/camiseta-manga-corta-tubular-naranja-m.webp",
        owner: agustinId,
        tags: [mobileId, lifestyleId],
        sale: "buy",
        favorites: [],
      },
      {
        name: "Móvil",
        description: "Móvil usado",
        price: 50,
        image:
          "https://www.verdementa.es/media/cache/c/a/400/camiseta-manga-corta-tubular-naranja-m.webp",
        owner: agustinId,
        tags: [mobileId],
        sale: "sell",
        favorites: [],
      },
      {
        name: "Reloj",
        description: "Reloj clásico",
        price: 30,
        image:
          "https://www.verdementa.es/media/cache/c/a/400/camiseta-manga-corta-tubular-naranja-m.webp",
        owner: agustinId,
        tags: [workId, lifestyleId],
        sale: "buy",
        favorites: [],
      },
      {
        name: "Chaqueta",
        description: "Chaqueta ligera",
        price: 25,
        image:
          "https://www.verdementa.es/media/cache/c/a/400/camiseta-manga-corta-tubular-naranja-m.webp",
        owner: alexId,
        tags: [motorId, workId],
        sale: "sell",
        favorites: [],
      },
      {
        name: "Pantalón",
        description: "Pantalón informal",
        price: 18,
        image:
          "https://www.verdementa.es/media/cache/c/a/400/camiseta-manga-corta-tubular-naranja-m.webp",
        owner: alexId,
        tags: [lifestyleId, mobileId],
        sale: "buy",
        favorites: [],
      },
      {
        name: "Gafas",
        description: "Gafas de sol",
        price: 12,
        image:
          "https://www.verdementa.es/media/cache/c/a/400/camiseta-manga-corta-tubular-naranja-m.webp",
        owner: alexId,
        tags: [workId],
        sale: "sell",
        favorites: [],
      },
      {
        name: "Mochila",
        description: "Mochila urbana",
        price: 22,
        image:
          "https://www.verdementa.es/media/cache/c/a/400/camiseta-manga-corta-tubular-naranja-m.webp",
        owner: guilleId,
        tags: [mobileId, motorId],
        sale: "buy",
        favorites: [],
      },
      {
        name: "Sombrero",
        description: "Sombrero elegante",
        price: 10,
        image:
          "https://www.verdementa.es/media/cache/c/a/400/camiseta-manga-corta-tubular-naranja-m.webp",
        owner: agustinId,
        tags: [lifestyleId, workId],
        sale: "sell",
        favorites: [],
      },
      {
        name: "Cinturón",
        description: "Cinturón corto",
        price: 7,
        image:
          "https://www.verdementa.es/media/cache/c/a/400/camiseta-manga-corta-tubular-naranja-m.webp",
        owner: alexId,
        tags: [motorId, workId],
        sale: "buy",
        favorites: [],
      },
    ]);
    // log the number of adverts created using 'defaultAdverts'
    console.log(`Inserted ${defaultAdverts.length} adverts`);
  } catch (error) {
    console.error("ERROR RESETTING ADVERTS", error.message);
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
await resetUsers();
// Reset Tags
await resetTags();
// Reset Adverts
await resetAdverts();
// end process
process.exit();

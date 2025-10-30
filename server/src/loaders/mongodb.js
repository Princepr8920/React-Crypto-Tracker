const HISTORY_DATA_SCHEMA = require("../models/historyData");
const CURRENT_DATA_SCHEMA = require("../models/currentData");
const { MongoClient } = require("mongodb"),
  client = new MongoClient(process.env.MONGO_DB_URL, {
    retryWrites: true, // Retry write operations upon transient network errors
  }),
  connection = { isConnected: false };

async function connectToDatabase() {
  try {
    await client.connect();
    console.log(`Database connected successfully 💽`);
    connection.isConnected = true;
    const appCollections = [
      createCollectionWithSchema({
        collection: "currentDataCollection",
        schema: CURRENT_DATA_SCHEMA,
        indexes: [{ key: { id: 1 }, unique: true }],
      }),
      createCollectionWithSchema({
        collection: "historyDataCollection",
        schema: HISTORY_DATA_SCHEMA,
        indexes: [{ key: { id: 1 } }],
      }),
    ];

    Promise.all(appCollections)
      .then((responses) => responses)
      .catch((error) => {
        console.error(error);
      });
  } catch (err) {
    connection.isConnected = false;
    console.error(err);
  }
}

async function createCollectionWithSchema(options) {
  let { collection, schema, indexes } = options;
  try {
    if (connection.isConnected && schema && collection) {
      const connectedDb = client.db("cryptoDB");
      const collections = await connectedDb.listCollections().toArray();
      const exisitingCollections = collections.map((e) => e.name);

      if (!exisitingCollections.includes(collection)) {
        // If db collection with schema are not created so this will create it🔌
        const createdCollection = await connectedDb.createCollection(
          collection,
          schema
        );
        if (createdCollection) {
          console.log(`Collection '${collection}' created successfully. ✔`);
          let getCollection = await connectedDb.collection(collection);
          await getCollection.createIndexes(indexes);
          console.log(`specified indexes attached to ${collection}. 🆗`);
        }
      }

      return { collection, created: true };
    } else {
      throw new Error("Database couldn't be connected ❌");
    }
  } catch (error) {
    console.error(error);
    process.exit(1); // Force exit with failure code
  }
}

function database(collection) {
  const db = client.db("cryptoDB").collection(collection);
  return db;
}

async function disconnectDatabase() {
  await client.close();
  console.log("Database disconnected 🚫");
  return;
}

module.exports = {
  connectToDatabase,
  client,
  database,
  createCollectionWithSchema,
  disconnectDatabase,
};

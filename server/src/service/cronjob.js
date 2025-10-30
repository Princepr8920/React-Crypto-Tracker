const { default: axios } = require("axios");
const cron = require("node-cron");
const { database } = require("../loaders/mongodb");
const historyDataCollection = database("historyDataCollection");

const makeRequest = async () => {
  try {
    const getCoins =
      await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order
=market_cap_desc&per_page=10&page=1`);

    return getCoins.data;
  } catch (error) {
    console.error(error);
  }
};

const saveUpdatedDataToDB = async () => {
  const data = await makeRequest();

  const fields = [
    "id",
    "name",
    "image",
    "current_price",
    "symbol",
    "price_change_24h",
    "market_cap",
    "last_updated",
  ];

  const dataToSave = [];

  for (let i = 0, len = data.length; i < len; i++) {
    let entry = {};
    for (let key in data[i]) {
      if (fields.includes(key)) {
        entry[key] = `${data[i][key]}`;
      }
    }
    dataToSave.push(entry);
  }

  const query = dataToSave.map((e) => {
    e.last_updated = new Date(e.last_updated);

    return {
      insertOne: {
        document: e,
      },
    };
  });

  await historyDataCollection.bulkWrite(query);
};

cron.schedule("0 * * * *", async () => {
  await saveUpdatedDataToDB();
});

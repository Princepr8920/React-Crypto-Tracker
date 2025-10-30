const { database } = require("../loaders/mongodb");
const currentDataCollection = database("currentDataCollection");

const updateCurrentData = async (req, res) => {
  try {
    const query = req.body.map((e) => {
      e.last_updated = new Date(e.last_updated);

      return {
        updateOne: {
          filter: { id: e.id },
          update: { $set: e },
          upsert: true,
        },
      };
    });

    await currentDataCollection.bulkWrite(query);

    return res.status(200).json({ message: "Snapshot saved to database!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "somting went wrong!" });
  }
};

module.exports = updateCurrentData;

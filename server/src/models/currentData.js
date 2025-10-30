const CURRENT_DATA_SCHEMA = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "History Data Validation",
      additionalProperties: false,
      properties: {
        _id: { bsonType: "objectId" },
        id: { bsonType: "string" },
        name: { bsonType: "string" },
        symbol: { bsonType: "string" },
        image: { bsonType: "string" },
        current_price: { bsonType: "string" },
        market_cap: { bsonType: "string" },
        price_change_24h: { bsonType: "string" },
        last_updated: { bsonType: "date" },
      },
    },
  },
  validationLevel: "strict",
  validationAction: "error",
};

module.exports = CURRENT_DATA_SCHEMA;

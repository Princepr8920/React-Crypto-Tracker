const getCoins = require("../controllers/getCoins");
const updateCurrentData = require("../controllers/updateCurrentData");

const express = require("express"),
  router = express.Router();

router.get("/api/coins", getCoins);
router.post("/api/history",updateCurrentData)

module.exports = router;

const { default: axios } = require("axios");

const getCoins = async (req, res) => {
  try {
    const getCoins =
      await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order
=market_cap_desc&per_page=10&page=1`);
    return res.status(200).json(getCoins.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "somting went wrong" });
  }
};

module.exports = getCoins;

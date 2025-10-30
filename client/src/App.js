import { useEffect, useState } from "react";
import "./App.scss";
import useGetHookEffect from "./hooks/axiosGetHook";
import { ReactComponent as Logo } from "./svg/crypto-tracker-logo.svg";
import axios from "axios";

function App() {
  let [alert, setAlert] = useState(null);
  let response = useGetHookEffect("https://react-crypto-tracker-p0ov.onrender.com/api/coins");

  useEffect(() => {
    let timeout = setTimeout(() => setAlert(null), 2000);
    return () => clearTimeout(timeout);
  }, [alert]);

  const sendData = async () => {
    try {
      if (response?.data) {
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

        for (let i = 0, len = response?.data.length; i < len; i++) {
          let entry = {};
          for (let key in response?.data[i]) {
            if (fields.includes(key)) {
              entry[key] = `${response?.data[i][key]}`;
            }
          }
          dataToSave.push(entry);
        }

        const res = await axios.post(
          "https://react-crypto-tracker-p0ov.onrender.com/api/history",
          dataToSave
        );

        if (res.status === 200) {
          setAlert({ message: res.data.message, success: true });
        }
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (err) {
      setAlert({ message: err.response.data.message, success: false });
      console.error(err);
    }
  };

  return (
    <div className="App">
      {alert && (
        <div
          id="alert"
          style={{
            background: alert.success
              ? "rgba(12, 173, 12, 0.478)"
              : "rgba(173, 12, 12, 0.478)",
          }}
        >
          {alert.message}
        </div>
      )}
      <header className="App-header">
        <div>
          <Logo />
          <h3>React Crypto Tracker</h3>
        </div>
        <button onClick={() => sendData()}>Take Snapshot</button>
      </header>
      <ul className="App-content">
        {response &&
          (!response?.data
            ? "❌ Somthing went wrong ❌"
            : response?.data.map((e) => (
                <li className="list-item" key={e.id}>
                  <div className="logo_name">
                    <img className="coin-img" src={e.image} alt="" />
                    <h5>{e.name}</h5>
                  </div>
                  <div className="coin-info">
                    <span>Coin Symbol : {e.symbol.toUpperCase()}</span>
                    <hr />
                    <span>Current Price : ${e.current_price}</span>
                    <hr />
                    <span>Market Cap : {e.market_cap}</span>
                    <hr />
                    <span>24H Change : {e.price_change_24h}</span>
                    <hr />
                    <span>
                      Last Updated : {new Date(e.last_updated).toLocaleString()}
                    </span>
                    <hr />
                    <span>Low 24h : {e.low_24h}</span>
                    <hr />
                    <span>High 24h : {e.high_24h}</span>
                  </div>
                </li>
              )))}
      </ul>
    </div>
  );
}

export default App;

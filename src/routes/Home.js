import { useEffect, useState } from "react";
import "../App.css"; // CSS 파일을 임포트
import { Link } from "react-router-dom";
import CoinTracker from "../components/Cointracker"; // Import the CoinTracker component

function Home() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(20);
  const [selectedCoin, setSelectedCoin] = useState(null);

  const onMoneyChange = (event) => {
    setMoney(event.target.value);
  };

  const onCoinChange = (event) => {
    const coin = coins.find((coin) => coin.id === event.target.value);
    console.log(coin);
    console.log(event);
    setSelectedCoin(coin);
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  const getConvertedValue = () => {
    if (!selectedCoin || money === "") {
      return 0;
    }
    return (money / selectedCoin.quotes.USD.price).toFixed(6);
  };

  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      <hr />
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        // <select onChange={onCoinChange}>
        //   <option value="">Select a coin</option>
        //   {coins.map((coin) => (
        //     // map에 고유의 key를 주어야함
        //     <option key={coin.id} value={coin.id}>
        //       {coin.name} ({coin.symbol}) : {coin.quotes.USD.price} USD
        //     </option>
        //   ))}
        // </select>
        <div>
          <CoinTracker coins={coins} onCoinChange={onCoinChange} />{" "}
          {/* <CoinTracker coins={coins} /> */}
        </div>
      )}
      <h3>---Budget---</h3>
      <input onChange={onMoneyChange} value={money} type="number" />
      <h3>
        USD: {money} → Coin: {selectedCoin ? getConvertedValue() : 0}
      </h3>
      <div className="spinner"></div>
    </div>
  );
}
export default Home;

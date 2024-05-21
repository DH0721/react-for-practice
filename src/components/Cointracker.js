import React from "react";
import { Link } from "react-router-dom";

// function CoinTracker({ coins, onCoinChange }) {
//   return (
//     <select onChange={onCoinChange}>
//       <option>Select a coin</option>
//       {coins.map((coin) => (
//         <option key={coin.id} value={coin.id}>
//           {coin.name} ({coin.symbol}) : {coin.quotes.USD.price} USD
//         </option>
//       ))}
//     </select>
//   );
// }

function CoinTracker({ coins }) {
  return (
    <div>
      {coins.map((coin) => (
        <div key={coin.id}>
          <h3>
            <Link to={`/coin/${coin.rank}`}>{coin.name} ({coin.symbol})</Link>
          </h3>
          <p>Price: {coin.quotes.USD.price} USD</p>
        </div>
      ))}
    </div>
  );
}

export default CoinTracker;

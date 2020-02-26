import React from "react";

const PortfolioList = props => {
  // console.log("p", props);
  const { portfolio, todayStocks } = props;
  todayStocks.map(e => {
    for (let i = 0; i < portfolio.length; i++) {
      if (portfolio[i].ticker.toUpperCase() === e.symbol) {
        const stockColor = () => {
          if (e.currPrice < e.open) {
            return "red";
          } else if (e.currPrice > e.open) {
            return "green";
          } else {
            return "grey";
          }
        };
        portfolio[i].color = stockColor();
      }
    }
  });
  console.log("color???", todayStocks);
  const renderRows = () => {
    return portfolio.map((port, idx) => (
      <tr key={idx}>
        <td style={{ color: `${port.color}` }}>{port.ticker.toUpperCase()}</td>
        <td>{port.quantity} shares</td>
        <td style={{ color: `${port.color}` }}>${port.totalPrice} USD</td>
      </tr>
    ));
  };
  return (
    <div>
      <h1>Portfolio</h1>
      <table>
        <thead>
          <tr id="transactionTHead">
            <th>Ticker</th>
            <th>Number of Shares</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </div>
  );
};

export default PortfolioList;

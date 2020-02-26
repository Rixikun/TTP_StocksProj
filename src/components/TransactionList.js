import React from "react";

const TransactionList = props => {
  // console.log("p", props);
  const { stocks, transactions, todayStocks } = props;
  todayStocks.map(e => {
    for (let i = 0; i < stocks.length; i++) {
      if (stocks[i].ticker.toUpperCase() === e.symbol) {
        const stockColor = () => {
          if (e.currPrice < e.open) {
            return "red";
          } else if (e.currPrice > e.open) {
            return "green";
          } else {
            return "grey";
          }
        };
        stocks[i].color = stockColor();
      }
    }
  });
  const renderRows = () => {
    return stocks.map((stock, idx) => (
      <tr key={idx}>
        <td style={{ color: `${stock.color}` }}>
          {stock.ticker.toUpperCase()}
        </td>
        <td>
          {
            transactions.filter(
              el => stock.transactionId === el.transactionId
            )[0].quantity
          }{" "}
          shares
        </td>
        <td style={{ color: `${stock.color}` }}>
          ${stock.price.slice(0, stock.price.length - 2)}
          <span style={{ color: "gray" }}>
            {stock.price.slice(stock.price.length - 2, stock.price.length)}
          </span>{" "}
          USD
        </td>
      </tr>
    ));
  };
  return (
    <div>
      <h1>Transactions</h1>
      <table>
        <thead>
          <tr id="transactionTHead">
            <th>Ticker</th>
            <th>Number of Shares</th>
            <th>Price of Shares</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </div>
  );
};

export default TransactionList;

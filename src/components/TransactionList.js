import React from "react";

const TransactionList = props => {
  // console.log("p", props);
  const { stocks, transactions, todayStocks } = props;
  todayStocks.forEach(e => {
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
      <tr className="RowName" key={idx}>
        <td className="ColumnName" style={{ color: `${stock.color}` }}>
          {stock.ticker.toUpperCase()}
        </td>
        <td className="ColumnName">
          {
            transactions.filter(
              el => stock.transactionId === el.transactionId
            )[0].quantity
          }{" "}
        </td>
        <td className="ColumnName" style={{ color: `${stock.color}` }}>
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
    <div className="StocksTable">
      <div className="TableData">
        <table className="OneTable">
          <thead>
            <tr className="RowName">
              <th className="ColumnName">Ticker</th>
              <th className="ColumnName"># of Shares</th>
              <th className="ColumnName">Price</th>
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;

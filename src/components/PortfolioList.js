import React from "react";

const PortfolioList = props => {
  // console.log("p", props);
  const { portfolio, todayStocks } = props;
  todayStocks.forEach(e => {
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
  const renderRows = () => {
    return portfolio.map((port, idx) => (
      <tr className="RowName" key={idx}>
        <td className="ColumnName" style={{ color: `${port.color}` }}>
          {port.ticker.toUpperCase()}
        </td>
        <td className="ColumnName">{port.quantity}</td>
        <td className="ColumnName" style={{ color: `${port.color}` }}>
          ${port.totalPrice} USD
        </td>
      </tr>
    ));
  };
  return (
    <div>
      <div className="TableName"> Portfolio</div>
      <table>
        <thead>
          <tr className="RowName">
            <th className="ColumnName">Ticker</th>
            <th className="ColumnName"># of Shares</th>
            <th className="ColumnName">Total Price</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </div>
  );
};

export default PortfolioList;

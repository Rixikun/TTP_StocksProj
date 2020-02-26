import React, { Component } from "react";
import axios from "axios";
import TransactionList from "./TransactionList";
import PortfolioList from "./PortfolioList";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      viewTransaction: false,
      viewPortfolio: false,
      transactionId: [],
      stocks: [],
      portfolio: [],
      todayStocks: []
    };
    this.handleTransaction = this.handleTransaction.bind(this);
    this.handlePortfolio = this.handlePortfolio.bind(this);
    this.handleToday = this.handleToday.bind(this);
    this.props = props;
    this.getTransactions = this.getTransactions.bind(this);
    this.getPortfolio = this.getPortfolio.bind(this);
    this.getTodayStock = this.getTodayStock.bind(this);
  }
  async getTransactions() {
    console.log("fetching transactions");
    try {
      const { data } = await axios.get(
        `http://localhost:8080/routes/transactions/view/${this.props.userId}`
      );
      this.setState({
        ...this.state,
        transactions: data,
        transactionId: data.map(el => el.transactionId)
      });
      const stockInfo = await axios.get(
        `http://localhost:8080/routes/stocks/view/${this.props.userId}`
      );
      this.setState({
        ...this.state,
        stocks: stockInfo.data
      });
    } catch (err) {
      console.error(err);
    }
  }
  async getPortfolio() {
    console.log("fetching portfolio");
    try {
      const { data } = await axios.get(
        `http://localhost:8080/routes/users/portfolio/${this.props.userId}`
      );
      this.setState({
        ...this.state,
        portfolio: data
      });
    } catch (err) {
      console.error(err);
    }
  }

  async getTodayStock() {
    console.log("fetching today stock");
    try {
      const userTickers = this.state.portfolio.map(stock =>
        stock.ticker.toUpperCase()
      );
      const openPrices = userTickers.map(async ticker => {
        const { data } = await axios.get(
          `http://localhost:8080/routes/stocks/select?symbol=${ticker}`
        );
        // console.log("data", data);
        let symbol = data["01. symbol"];
        let open = data["02. open"];
        let currPrice = data["05. price"];
        this.setState({
          ...this.state,
          todayStocks: [...this.state.todayStocks, { symbol, open, currPrice }]
        });
      });
    } catch (err) {
      console.error(err);
    }
  }

  componentDidMount() {
    this.getTodayStock();
  }

  handleTransaction(event) {
    if (this.props.userId > 0 && !this.state.transactions.length) {
      event.preventDefault();
      this.getTransactions();
      if (!this.state.portfolio.length) {
        this.getPortfolio();
      }
    }
    this.setState({
      ...this.state,
      viewTransaction: !this.state.viewTransaction
    });
  }
  handlePortfolio(event) {
    if (this.props.userId > 0 && !this.state.portfolio.length) {
      event.preventDefault();
      this.getPortfolio();
    }
    this.setState({
      ...this.state,
      viewPortfolio: !this.state.viewPortfolio
    });
  }

  handleToday(event) {
    event.preventDefault();
    this.getTodayStock();
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <button onClick={this.handleTransaction}>View transactions</button>
        {this.state.viewTransaction ? (
          <TransactionList
            stocks={this.state.stocks}
            transactions={this.state.transactions}
            todayStocks={this.state.todayStocks}
          />
        ) : null}
        <button onClick={this.handlePortfolio}>View Portfolio</button>
        {this.state.viewPortfolio ? (
          <PortfolioList
            portfolio={this.state.portfolio}
            todayStocks={this.state.todayStocks}
          />
        ) : null}
        <button onClick={this.handleToday}>View In Color</button>
      </div>
    );
  }
}

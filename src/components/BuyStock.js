import React, { Component } from "react";
import "../styles.css";

export default class BuyStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: "",
      quantity: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.props = props;
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.buyStock(this.state);
    this.setState({
      symbol: "",
      quantity: 0
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="Form">
        <label className="Label">
          Stock:
          <input
            type="text"
            name="symbol"
            onChange={this.handleChange}
            value={this.state.symbol || ""}
            className="Input"
          />
        </label>
        <label className="Label">
          Quantity:
          <input
            type="number"
            name="quantity"
            onChange={this.handleChange}
            value={this.state.quantity || ""}
            className="Input"
          />
        </label>
        <div className="Buy">
          <button type="submit">BUY</button>
        </div>
      </form>
    );
  }
}

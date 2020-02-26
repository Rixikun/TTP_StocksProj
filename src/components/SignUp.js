import React, { Component } from "react";
import "../styles.css";

export default class NewStudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      pwcheck: ""
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
    this.props.addUser(this.state);
    console.log(this.state);
    this.setState({
      name: "",
      email: "",
      password: "",
      pwcheck: ""
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="Form">
        <label className="Label">
          Full Name:
          <input
            type="text"
            name="name"
            onChange={this.handleChange}
            value={this.state.name || ""}
            className="Input"

          />
        </label>

        <label className="Label">
          Email:
          <input
            type="email"
            name="email"
            onChange={this.handleChange}
            value={this.state.email || ""}
            className="Input"

          />
        </label>

        <label className="Label">
          Password:
          <input
            type="password"
            name="password"
            onChange={this.handleChange}
            value={this.state.password || ""}
            className="Input"

          />
        </label>

        <label className="Label">
          Re-enter Password:
          <input
            type="password"
            name="pwcheck"
            onChange={this.handleChange}
            value={this.state.pwcheck || ""}
            className="Input"

          />
        </label>

        <button type="submit">Sign Up</button>
      </form>
    );
  }
}

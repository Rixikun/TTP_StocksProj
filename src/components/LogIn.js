import React, { Component } from "react";

export default class NewStudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
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
    // console.log("login submit>>>>>", this.state);
    this.props.verifyUser(this.state);
    this.setState({
      email: "",
      password: ""
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="Form">
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

        <button type="submit">Log In</button>
      </form>
    );
  }
}

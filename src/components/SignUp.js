import React, { Component } from "react";

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
      <form onSubmit={this.handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            name="name"
            onChange={this.handleChange}
            value={this.state.name || ""}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            onChange={this.handleChange}
            value={this.state.email || ""}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            onChange={this.handleChange}
            value={this.state.password || ""}
          />
        </label>

        <label>
          Re-enter Password:
          <input
            type="password"
            name="pwcheck"
            onChange={this.handleChange}
            value={this.state.pwcheck || ""}
          />
        </label>

        <button type="submit">Sign Up</button>
      </form>
    );
  }
}

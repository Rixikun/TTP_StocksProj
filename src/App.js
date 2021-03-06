import React, { Component } from "react";
import axios from "axios";

import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Home from "./components/Home";

// const config = {
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json"
//   }
// };

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      transactions: [],
      userId: "",
      viewAuth: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.addUser = this.addUser.bind(this);
    this.verifyUser = this.verifyUser.bind(this);
  }

  async addUser(newUser) {
    // console.log("newuser", newUser);
    const response = await axios.post(
      "http://localhost:8080/auth/signup",
      newUser
    );
    const userId = response.data.id;
    this.setState({
      ...this.state,
      user: [response],
      userId: userId
    });
  }
  async verifyUser(userInput) {
    // console.log("userInput", userInput);
    const response = await axios.post(
      "http://localhost:8080/auth/login",

      {
        ...userInput
      },
      {
        credentials: "include"
      }
      // config
    );
    const userId = response.data.id;

    this.setState({
      ...this.state,
      user: [response.data],
      userId: userId
    });
    console.log("verifyUser triggered", this.state.user);
    console.log("the end");
  }
  handleClick(e) {
    return this.setState({
      viewAuth: !this.state.viewAuth
    });
  }

  render() {
    // console.log("this is the state in main", this.state);
    const auth = () => {
      if (!this.state.user.length) {
        return (
          <div>
            <div className="Main" onClick={this.handleClick}>
              Sign Up / Log In
            </div>{" "}
            <div>
              {this.state.viewAuth ? (
                <div className="Auth">
                  <SignUp addUser={this.addUser} />
                  <LogIn verifyUser={this.verifyUser} />
                </div>
              ) : null}
            </div>
          </div>
        );
      } else {
        return null;
      }
    };
    //
    return (
      <div>
        {auth()}
        <div>
          {this.state.user.length ? <Home userId={this.state.userId} /> : null}
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import axios from "axios";
import Input from "./input";

class RegisterUser extends Component {
  state = {
    data: {
      name: "",
      username: "",
      email: "",
      age: "",
      link: "",
    },
    errors: {},
  };

  endPoint = "https://jsonplaceholder.typicode.com/users";

  handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = this.state;
    // validate data
    // submit data
    const { data: result } = await axios.post(this.endPoint, data);
    console.log("Response recived from https://jsonplaceholder.com", result);
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    // update the state.
    this.setState({ data });
  };

  render() {
    const { data } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          name="name"
          label="Name"
          value={data.name}
          onChange={this.handleChange}
        />
        <Input
          name="username"
          label="Username"
          value={data.username}
          onChange={this.handleChange}
        />
        <Input
          name="email"
          label="Email"
          value={data.email}
          onChange={this.handleChange}
        />
        <Input
          name="age"
          label="Age"
          value={data.age}
          onChange={this.handleChange}
        />
        <Input
          name="link"
          label="Link"
          value={data.link}
          onChange={this.handleChange}
        />
        <button type="submit" className="btn btn-outline-info">
          Enviar
        </button>
      </form>
    );
  }
}

export default RegisterUser;

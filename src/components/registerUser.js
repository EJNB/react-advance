import React, { Component } from "react";
import axios from "axios";
import Input from "./input";
import Joi from "joi";

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

  schema = Joi.object({
    name: Joi.string().max(100).required(),
    username: Joi.string().min(6).max(50).required(),
    email: Joi.string().required(),
    age: Joi.number().integer().min(16).required(),
    link: Joi.string(),
  });

  endPoint = "https://jsonplaceholder.typicode.com/users";

  handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = this.state;
    // validate data
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    // submit data
    const { data: result } = await axios.post(this.endPoint, data);
    console.log("Response recived from https://jsonplaceholder.com", result);
  };

  validate = () => {
    const { error } = this.schema.validate(this.state.data);
    if (!error) return null;

    const errors = {};
    for (let i of error.details) errors[i.path[0]] = i.message;

    return errors;
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

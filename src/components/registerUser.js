import React, { Component } from "react";
import axios from "axios";
import Input from "./input";
import Joi from "joi-browser";

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

  schema = {
    name: Joi.string().required().min(6).max(100).label("Name"),
    username: Joi.string().required().min(6).max(50).label("Username"),
    email: Joi.string().required().email().label("Email"),
    age: Joi.number().required().integer().min(16).label("Age"),
    link: Joi.string(),
  };

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
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let i of error.details) {
      // console.log(i.path[0]);
      errors[i.path[0]] = i.message;
    }

    return errors;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessages = this.validateProperty(input);
    if (errorMessages) errors[input.name] = errorMessages;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    // update the state.
    this.setState({ data, errors });
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  render() {
    const { data, errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          id="name"
          name="name"
          label="Name"
          value={data.name}
          onChange={this.handleChange}
          error={errors["name"]}
        />
        <Input
          id="username"
          name="username"
          label="Username"
          value={data.username}
          onChange={this.handleChange}
          error={errors["username"]}
        />
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          value={data.email}
          onChange={this.handleChange}
          error={errors["email"]}
        />
        <Input
          id="age"
          name="age"
          label="Age"
          type="number"
          value={data.age}
          onChange={this.handleChange}
          error={errors["age"]}
        />
        <Input
          id="link"
          name="link"
          label="Link"
          type="url"
          value={data.link}
          onChange={this.handleChange}
          error={errors["link"]}
        />
        <button type="submit" className="btn btn-outline-info">
          Enviar
        </button>
      </form>
    );
  }
}

export default RegisterUser;

import React from "react";

const Input = ({ name, label, value, type = "text", onChange, error }) => {
  return (
    <div className="form-group">
      <input
        name={name}
        type={type}
        className="form-control"
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e)}
      />
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;

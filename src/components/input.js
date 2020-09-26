import React from "react";

const Input = ({ name, label, value, type = "text", onChange }) => {
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
    </div>
  );
};

export default Input;

// src/components/common/CustomInput.jsx
import React from "react";

export const CustomInput = ({ label, name, value, onChange, placeholder, type = "text", ...rest }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium mb-1">{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border rounded p-2"
      {...rest}
    />
  </div>
);

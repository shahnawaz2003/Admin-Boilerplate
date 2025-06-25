// src/components/common/CustomTextArea.jsx
import React from "react";

export const CustomTextarea = ({ label, name, value, onChange, placeholder, ...rest }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium mb-1">{label}</label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border rounded p-2"
      rows={4}
      {...rest}
    />
  </div>
);

// src/components/common/CustomSelect.jsx
import React from "react";
import Select from "react-select";

export const CustomSelect = ({
  label,
  name,
  value,
  options,
  onChange,
  placeholder,
  isMulti = false,
  getOptionLabel = (opt) => opt.label,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <Select
      name={name}
      value={value}
      options={options}
      onChange={onChange}
      isMulti={isMulti}
      getOptionLabel={getOptionLabel}
      getOptionValue={(opt) => opt.id}
      placeholder={placeholder}
      className="react-select-container"
      classNamePrefix="react-select"
    />
  </div>
);

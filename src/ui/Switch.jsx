import React from "react";

export const Switch = ({ checked, onChange, disabled = false, label }) => {
  return (
    <div className="flex items-center">
      {label && (
        <span className="mr-2 text-sm text-gray-700">{label}</span>
      )}
      <label className="inline-flex relative items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer ${
          disabled ? "opacity-50" : ""
        } ${
          checked ? "peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:bg-blue-600" : ""
        } after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
      </label>
    </div>
  );
};

export default Switch;
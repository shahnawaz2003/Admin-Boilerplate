import React from "react";
import ReactQuill from "react-quill";

export default function Editor({ name, value, placeholder, label, onChange }) {
  // const { details, handleChange } = useProductContext(); // Access the global state and handler

  const handleQuillChange = (value, e) => {
    onChange(value, name); // Call the centralized handleChange function
  };

  return (
    <div>
      <label className="block text-[#1F2B6C] font-semibold mb-2">
        {label}
        <span className="text-red-500">*</span>
      </label>
      <ReactQuill
        name={name}
        value={value} // Bind React Quill's value to the correct field in global state
        onChange={handleQuillChange}
        placeholder={placeholder}
        className="w-full mt-1 border rounded-md text-sm sm:text-base"
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline"],
            [{ align: [] }],
            ["link"],
          ],
        }}
      />
    </div>
  );
}

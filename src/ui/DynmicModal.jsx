import React, { useState, useEffect, Fragment } from "react";

/**
 * A dynamic form modal component that can be used throughout the application.
 * Styled to match the provided design screenshot.
 * 
 * @param {Object} props - The component props
 * @param {string} props.title - The title of the modal
 * @param {Array} props.fields - Array of field definitions for the form
 * @param {Function} props.onSubmit - Function called when form is submitted
 * @param {Function} props.onClose - Function called when modal is closed
 * @param {Object} props.initialData - Initial data for the form fields (for edit mode)
 * @param {string} props.submitButtonText - Text for the submit button (defaults to "Save")
 * @param {boolean} props.loading - Whether the form is in a loading state
 * @returns {React.Component} The modal component
 */
const DynamicModal = ({ 
  title, 
  fields, 
  onSubmit, 
  onClose, 
  initialData = {}, 
  submitButtonText = "Save",
  loading = false
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isOpen, setIsOpen] = useState(true);

  // Initialize form data with initial values if editing
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    // Handle different input types
    if (type === "file" && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: e.target.checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Mark field as touched
    setTouched({ ...touched, [name]: true });
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    validateField(name, formData[name]);
  };

  const validateField = (name, value) => {
    const field = fields.find(f => f.name === name);
    let errorMessage = "";
    
    if (field?.required && (!value || value === "")) {
      errorMessage = `${field.label} is required`;
    }
    
    setErrors(prev => ({ ...prev, [name]: errorMessage }));
    return !errorMessage;
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    // Validate all fields
    fields.forEach((field) => {
      const fieldValue = formData[field.name];
      if (field.required && (!fieldValue || fieldValue === "")) {
        newErrors[field.name] = `${field.label} is required`;
        isValid = false;
      }
      
      // Additional validations can be added here (email format, min/max length, etc.)
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = fields.reduce((acc, field) => {
      acc[field.name] = true;
      return acc;
    }, {});
    setTouched(allTouched);
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };

  // Render a field based on its type
  const renderField = (field) => {
    const {
      name,
      label,
      type,
      placeholder,
      options,
      disabled,
      min,
      max,
      step,
      rows = 4,
      cols
    } = field;

    const hasError = touched[name] && errors[name];
    const errorClass = hasError ? "border-red-500" : "border-gray-300";
    
    switch (type) {
      case "text":
      case "email":
      case "password":
      case "number":
      case "tel":
      case "url":
      case "date":
        return (
          <input
            type={type}
            name={name}
            id={name}
            value={formData[name] || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
            className={`mt-1 block w-full rounded-md shadow-sm ${errorClass} p-2`}
            placeholder={placeholder || `Enter ${label.toLowerCase()}`}
          />
        );

      case "textarea":
        return (
          <textarea
            name={name}
            id={name}
            value={formData[name] || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled}
            rows={rows}
            cols={cols}
            className={`mt-1 block w-full rounded-md shadow-sm ${errorClass} p-2`}
            placeholder={placeholder || `Write ${label.toLowerCase()}`}
          />
        );

      case "select":
        return (
          <select
            name={name}
            id={name}
            value={formData[name] || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled}
            className={`mt-1 block w-full rounded-md shadow-sm ${errorClass} p-2`}
          >
            <option value="">Select {label}</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "checkbox":
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              name={name}
              id={name}
              checked={!!formData[name]}
              onChange={handleChange}
              disabled={disabled}
              className={`h-4 w-4 rounded ${errorClass}`}
            />
            <label htmlFor={name} className="ml-2 text-sm text-gray-700">
              {placeholder || label}
            </label>
          </div>
        );

      case "radio":
        return (
          <div className="mt-1 space-y-2">
            {options?.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  type="radio"
                  id={`${name}-${option.value}`}
                  name={name}
                  value={option.value}
                  checked={formData[name] === option.value}
                  onChange={handleChange}
                  disabled={disabled}
                  className={`h-4 w-4 ${errorClass}`}
                />
                <label htmlFor={`${name}-${option.value}`} className="ml-2 text-sm text-gray-700">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );

      case "file":
        return (
          <div className="mt-1">
            <input
              type="file"
              name={name}
              id={name}
              onChange={handleChange}
              disabled={disabled}
              className={`block w-full text-sm text-grayTextclr file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${errorClass}`}
            />
            {formData[name] && typeof formData[name] === 'string' && formData[name].startsWith('http') && (
              <div className="mt-2">
                <img src={formData[name]} alt="Preview" className="h-20 w-20 object-cover" />
              </div>
            )}
          </div>
        );
        
      case "color":
        return (
          <div className="flex items-center">
            <input
              type="text"
              name={name}
              id={name}
              value={formData[name] || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={disabled}
              className={`mt-1 block w-full rounded-md shadow-sm ${errorClass} p-2`}
              placeholder={placeholder || "Enter value"}
            />
            {formData[name] && (
              <div 
                className="mt-1 ml-2 w-8 h-8 rounded-full border border-gray-300" 
                style={{ backgroundColor: formData[name] }}
              ></div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  // If modal is closed, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-25" onClick={closeModal}></div>
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-6 text-center">
            {title}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {fields.map((field) => (
                <div key={field.name} className="mb-4">
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-600 mb-1">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {renderField(field)}
                  {touched[field.name] && errors[field.name] && (
                    <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={closeModal}
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grayTextclr mr-2 w-24"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center rounded-md border border-transparent bg-teal-500 hover:bg-teal-600 py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 w-24"
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {submitButtonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DynamicModal;
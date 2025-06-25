import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
  Button,
  Typography,
} from "@material-tailwind/react";
import imageCompression from "browser-image-compression";

const EditModal = ({
  open,
  onClose,
  onSubmit,
  columns,
  dropdownOptions,
  rowData,
  validations,
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [foregroundImg, setForegroundImg] = useState(null);
  const [images, setImages] = useState([]); // Initialize as an empty array
  const [recivedImages, setRecivedImages] = useState();

  useEffect(() => {
    if (rowData && open) {
      setFormData(rowData);
      setImages(Array.isArray(rowData.images) ? rowData.images : []); // Ensure it's an array
      setRecivedImages(rowData.images);
    }
  }, [rowData, open]);

  useEffect(() => {
    if (!open) {
      setFormData({});
      setErrors({});
      setForegroundImg(null);
      setImages(null);
    }
  }, [open]);

  const validateField = (fieldName, value) => {
    const fieldRules = validations[fieldName];
    if (!fieldRules) return null;

    for (const rule of fieldRules) {
      if (rule.type === "required" && (!value || value.length === 0)) {
        return `${fieldName} is required.`;
      }
      if (rule.type === "minLength" && value.length < rule.value) {
        return `${fieldName} must be at least ${rule.value} characters.`;
      }
      if (rule.type === "pattern" && !rule.value.test(value)) {
        return rule.message || `${fieldName} is invalid.`;
      }
      if (rule.type === "custom" && !rule.value(value)) {
        return rule.message || `${fieldName} is invalid.`;
      }
    }
    return null;
  };

  // Handle input change dynamically
  const handleInputChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));

    const error = validateField(key, value);
    setErrors((prev) => ({
      ...prev,
      [key]: error,
    }));
  };

  const handleForegroundFileUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const options = {
          maxSizeMB: 5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);

        setForegroundImg(compressedFile);
      } catch (error) {
        console.error("Error compressing foreground image:", error);
      }
    }
  };

  const handleImagesFileUpload = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
      try {
        const options = {
          maxSizeMB: 5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };

        const compressedFiles = await Promise.all(
          files.map((file) => imageCompression(file, options)),
        );

        setImages((prev) => [...prev, ...compressedFiles]);
      } catch (error) {
        console.error("Error compressing images:", error);
      }
    }
  };

  const handleSubmit = () => {
    let hasError = false;
    const newErrors = {};
    Object.keys(validations).forEach((field) => {
      const value =
        // field === "featureImage"
        //   ? foregroundImg
        //   :
        field === "images" ? images : formData[field];
      const error = validateField(field, value);
      if (error) {
        hasError = true;
        newErrors[field] = error;
      }
    });

    // setErrors(newErrors);
    // if (hasError) return;

    const updatedFormData = {
      ...formData,
      featureImage: foregroundImg,
      images,
    };
    onSubmit(updatedFormData);
    setFormData({});
    setForegroundImg(null);
    setImages(null);
    onClose();
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    setRecivedImages(updatedImages);
  };

  return (
    <div className="w-full overflow-y-scroll">
      <Dialog
        open={open}
        handler={onClose}
        size="sm"
        className="overflow-auto xl:h-[86dvh] h-[75dvh]"
      >
        <DialogHeader>Edit Entry</DialogHeader>
        <DialogBody>
          <div className="grid grid-cols-1 gap-4">
            {columns &&
              columns?.map((col, index) => {
                const key =
                  col === "Category" ? "category_id" : col?.toLowerCase();
                return (
                  <div key={index}>
                    {col === "Status" ||
                    col === "Category" ||
                    col === "Permissions" ? (
                      <div>
                        <Select
                          label={col}
                          value={
                            formData?.category?.id || formData.permissions || ""
                          }
                          onChange={(value) =>
                            handleInputChange("category_id", value)
                          }
                        >
                          {dropdownOptions?.[col]?.map((option, index) => (
                            <Option
                              key={option?.id || index}
                              value={option?.id || index}
                            >
                              {option?.category || option}
                            </Option>
                          ))}
                        </Select>
                      </div>
                    ) : col === "feature image" || col === "image" ? (
                      <div>
                        <Typography className="text-sm font-semibold capitalize text-blue-blue-600 mb-1">
                          {col}
                        </Typography>
                        <Input
                          type="file"
                          onChange={handleForegroundFileUpload}
                          accept="image/*"
                        />
                        {formData?.foreground_image && (
                          <div className="w-16 h-16 overflow-hidden rounded-md border border-blue-blue-200 mt-2">
                            <img
                              src={formData?.foreground_image?.file_url}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        {errors?.featureImage && (
                          <Typography color="red" className="text-xs mt-1">
                            {errors?.featureImage}
                          </Typography>
                        )}
                      </div>
                    ) : col === "images" ? (
                      <div>
                        <Typography className="text-sm font-semibold capitalize text-blue-blue-600 mb-1">
                          {col}
                        </Typography>
                        <Input
                          type="file"
                          multiple
                          onChange={(e) => handleImagesFileUpload(e, "images")}
                          accept="image/*"
                        />
                        {images && (
                          <div className="flex flex-wrap gap-2">
                            {images?.map((img, index) => (
                              <div
                                key={index}
                                className="overflow-hidden rounded-md border border-blue-blue-200 mt-2 relative w-16 h-16"
                              >
                                <img
                                  src={img?.props?.src || img.file_url}
                                  alt="Preview"
                                  className="w-full h-full object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(index)}
                                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : col === "question" ? (
                      <>
                        <Input
                          label="Question"
                          type="text"
                          value={formData?.title || ""}
                          onChange={(e) =>
                            handleInputChange("title", e.target.value)
                          }
                        />
                      </>
                    ) : col === "answer" ? (
                      <>
                        <Input
                          label="Answer"
                          type="text"
                          value={formData?.description || ""}
                          onChange={(e) =>
                            handleInputChange("description", e.target.value)
                          }
                        />
                      </>
                    ) : col === "date" || col === "last_date" ? (
                      <div>
                        <Typography className="text-sm font-semibold text-blue-blue-600 mb-1">
                          {col}
                        </Typography>
                        <Input
                          type="date"
                          value={formData[key] || ""}
                          onChange={(e) =>
                            handleInputChange(key, e.target.value)
                          }
                        />
                      </div>
                    ) : col === "file" ? (
                      <div>
                        <Typography className="text-sm font-semibold text-blue-blue-600 mb-1 capitalize">
                          {col}
                        </Typography>
                        <Input
                          required
                          type="file"
                          value={formData[col.toLowerCase()] || ""}
                          onChange={(e) =>
                            handleInputChange(col.toLowerCase(), e.target.value)
                          }
                        />
                      </div>
                    ) : col === "closing_date" ? (
                      <div>
                        <Typography className="text-sm font-semibold text-blue-blue-600 mb-1 capitalize">
                          {col}
                        </Typography>
                        <Input
                          required
                          type="date"
                          value={formData[col?.toLowerCase()] || ""}
                          onChange={(e) =>
                            handleInputChange(
                              col?.toLowerCase(),
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    ) : col === "laste date" ? (
                      <div>
                        <Typography className="text-sm font-semibold text-blue-blue-600 mb-1">
                          {col}
                        </Typography>
                        <Input
                          type="date"
                          value={rowData?.date || ""}
                          onChange={(e) =>
                            handleInputChange(key, e.target.value)
                          }
                        />
                      </div>
                    ) : col === "Phone" ? (
                      <div>
                        <Typography className="text-sm font-semibold text-blue-blue-600 mb-1">
                          {col}
                        </Typography>
                        <Input
                          type="tel"
                          value={rowData?.date || ""}
                          onChange={(e) =>
                            handleInputChange(key, e.target.value)
                          }
                        />
                      </div>
                    ) : (
                      <Input
                        label={col
                          ?.replace(/[-_]/g, " ")
                          .replace(/\b\w/g, (char) => char.toUpperCase())} // Capitalize and remove -/_ characters                        type="text"
                        value={formData[key] || ""}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                      />
                    )}
                    {errors[col.toLowerCase()] && (
                      <Typography color="red" className="text-xs mt-1">
                        {errors[col.toLowerCase()]}
                      </Typography>
                    )}
                  </div>
                );
              })}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="gradient" color="blue" onClick={handleSubmit}>
            Save Changes
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};
export default EditModal;

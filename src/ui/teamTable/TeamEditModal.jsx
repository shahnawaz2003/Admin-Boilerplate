import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";

const TeamEditModal = ({
  columns,
  dropdownOptions = [], // Defaults to an empty array
  onClose,
  open,
  onSubmit,
  rowData,
}) => {
  const [formData, setFormData] = useState({});
  const [socialLinks, setSocialLinks] = useState([]);
  const [existingImage, setExistingImage] = useState(""); // For existing image preview

  useEffect(() => {
    if (open && rowData) {
      // Pre-fill form data
      setFormData({ ...rowData });
      setSocialLinks(
        Array.isArray(rowData.social_links) ? rowData.social_links : []
      );
      setExistingImage(rowData.image || ""); // Set existing image URL
    }
  }, [open, rowData]);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSocialLinksChange = (index, value) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index] = value;
    setSocialLinks(updatedLinks);
    setFormData((prev) => ({ ...prev, social_links: updatedLinks }));
  };

  const handleAddSocialLink = () => {
    setSocialLinks([...socialLinks, ""]);
  };

  const handleRemoveSocialLink = (index) => {
    const updatedLinks = socialLinks.filter((_, i) => i !== index);
    setSocialLinks(updatedLinks);
    setFormData((prev) => ({ ...prev, social_links: updatedLinks }));
  };

  const handleFileUpload = (key, files) => {
    const file = files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [key]: file, // Set the new file
      }));
      setExistingImage(""); // Clear the existing image preview
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} handler={onClose} size="sm">
      <DialogHeader>Edit Team Member</DialogHeader>
      <DialogBody className="overflow-y-auto max-h-[70vh]">
        <div className="grid grid-cols-1 gap-4">
          {columns?.map((col, index) => (
            <div key={index}>
              {col === "social_links" ? (
                <div>
                  <Typography className="text-sm font-semibold text-blue-blue-600 mb-2">
                    Social Links
                  </Typography>
                  {socialLinks.map((link, idx) => (
                    <div key={idx} className="flex items-center gap-2 mb-2">
                      <Input
                        label={`Link ${idx + 1}`}
                        value={link || ""}
                        onChange={(e) =>
                          handleSocialLinksChange(idx, e.target.value)
                        }
                      />
                      <Button
                        variant="text"
                        color="red"
                        onClick={() => handleRemoveSocialLink(idx)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="gradient"
                    color="blue"
                    onClick={handleAddSocialLink}
                    className="mt-2"
                  >
                    Add Link
                  </Button>
                </div>
              ) : col === "image" ? (
                <div>
                  <Typography className="text-sm font-semibold text-blue-blue-600 mb-2">
                    Profile Image
                  </Typography>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(col, e.target.files)}
                    className="block w-full text-sm text-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {/* Existing Image Preview */}
                  {existingImage && (
                    <img
                      src={existingImage}
                      alt="Existing Profile"
                      className="mt-4 w-24 h-24 object-cover rounded border"
                    />
                  )}
                </div>
              ) : (
                <Input
                  label={col.replace("_", " ").toUpperCase()}
                  type="text"
                  value={formData[col.toLowerCase()] || ""}
                  onChange={(e) =>
                    handleInputChange(col.toLowerCase(), e.target.value)
                  }
                />
              )}
            </div>
          ))}
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
  );
};

export default TeamEditModal;

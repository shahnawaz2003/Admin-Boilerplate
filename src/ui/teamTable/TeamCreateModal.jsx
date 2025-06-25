import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";

const TeamCreateModal = ({
  columns = [],
  dropdownOptions = [],
  onClose,
  open,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({});
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    if (open) {
      const initialData = {};
      columns.forEach((col) => {
        initialData[col.toLowerCase()] = col === "social_links" ? [] : "";
      });
      setFormData(initialData);
      setSocialLinks([]);
    }
  }, [open, columns]);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFileUpload = (key, file) => {
    setFormData((prev) => ({
      ...prev,
      [key]: file, // Store the file directly
    }));
  };

  const handleSocialLinksChange = (index, field, value) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index] = {
      ...updatedLinks[index],
      [field]: value,
    };
    setSocialLinks(updatedLinks);
    setFormData((prev) => ({ ...prev, social_links: updatedLinks }));
  };

  const handleAddSocialLink = () => {
    setSocialLinks([...socialLinks, { type: "", url: "" }]);
  };

  const handleRemoveSocialLink = (index) => {
    const updatedLinks = socialLinks.filter((_, i) => i !== index);
    setSocialLinks(updatedLinks);
    setFormData((prev) => ({ ...prev, social_links: updatedLinks }));
  };

  const handleSubmit = () => {
    // Format social_links to a flat array of URLs
    const formattedSocialLinks = socialLinks.map((link) => link.url);

    const updatedFormData = {
      ...formData,
      social_links: formattedSocialLinks,
    };

    onSubmit(updatedFormData);
    onClose();
  };

  return (
    <Dialog open={open} handler={onClose} size="sm">
      <DialogHeader>Add New Team Member</DialogHeader>
      <DialogBody className="overflow-y-auto" style={{ maxHeight: "400px" }}>
        <div className="grid grid-cols-1 gap-4">
          {columns.map((col, index) => (
            <div key={index} className="mb-4">
              {col === "social_links" ? (
                <div>
                  <Typography className="text-sm font-semibold text-blue-blue-600 mb-2">
                    Social Links
                  </Typography>
                  {socialLinks.map((link, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 mb-2 border p-3 rounded-md"
                    >
                      <Select
                        value={link.type}
                        onChange={(value) =>
                          handleSocialLinksChange(idx, "type", value)
                        }
                        label="Social Media"
                      >
                        {dropdownOptions.map((option, i) => (
                          <Option key={i} value={option}>
                            {option}
                          </Option>
                        ))}
                      </Select>
                      <Input
                        label="URL"
                        type="url"
                        value={link.url}
                        onChange={(e) =>
                          handleSocialLinksChange(idx, "url", e.target.value)
                        }
                      />
                    </div>
                  ))}
                  <Button
                    variant="gradient"
                    color="blue"
                    onClick={handleAddSocialLink}
                    className="mt-4"
                  >
                    Add Link
                  </Button>
                </div>
              ) : col === "image" ? (
                <div>
                  <Typography className="text-sm font-semibold text-blue-blue-600 mb-2">
                    Profile Image
                  </Typography>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileUpload("profile", e.target.files[0])
                    }
                  />
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
          Add
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default TeamCreateModal;

import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Input,
  Textarea,
} from "@material-tailwind/react";
import ImageUploadField from "@/ui/ImageUploadField";

const HomeUpdateModal = ({
  handleOpen,
  open,
  title,
  fileType,
  fields,
  onSubmit,
  initialData,
}) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [formValues, setFormValues] = useState(initialData);

  useEffect(() => {
    setFormValues(initialData); // Update form values when initialData changes
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...formValues, file: uploadedFile || null };

    onSubmit(data);
  };

  return (
    <>
      <div className="w-full h-full  overflow-y-scroll">
        <Dialog
          open={open}
          handler={handleOpen}
          className="rounded-none overflow-auto xl:h-[95dvh] h-[80dvh] "
        >
          <DialogHeader className="border-b font-extralight text-xl">
            {title}
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <DialogBody>
              {fields?.map(({ name, label, type }) => (
                <div key={name} className="pb-4">
                  {type === "textarea" ? (
                    <Textarea
                      label={label}
                      name={name}
                      className="w-full"
                      value={formValues[name] || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    <Input
                      label={label}
                      name={name}
                      type={type}
                      value={formValues[name] || ""}
                      onChange={handleChange}
                      className="w-full"
                    />
                  )}
                </div>
              ))}
              <ImageUploadField
                fileType={fileType}
                existingFile={formValues.imagePreview}
                onFileChange={(file) => {
                  setUploadedFile(file);
                  setFormValues((prev) => ({
                    ...prev,
                    file: file || null, // If no file, explicitly set to null
                    imagePreview: file ? null : prev.imagePreview, // Clear preview if a new file is added
                  }));
                }}
              />
            </DialogBody>
            <div className="flex justify-end p-4">
              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button type="submit" variant="gradient" color="green">
                Confirm
              </Button>
            </div>
          </form>
        </Dialog>
      </div>
    </>
  );
};

export default HomeUpdateModal;

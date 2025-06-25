import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const SimplePage = ({
  tableTitle,
  name,
  content,
  isEditing,
  onEdit,
  onCancel,
  onSave,
}) => {
  const [editableTitle, setEditableTitle] = useState(name);
  const [editableContent, setEditableContent] = useState(content);
  // Synchronize state when props change
  useEffect(() => {
    setEditableTitle(name);
    setEditableContent(content);
  }, [name, content]);

  const handleSave = () => {
    onSave({ name: editableTitle, content: editableContent });
  };

  return (
    <section className="mt-12">
      <Card>
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-8 p-6 flex justify-between items-center"
        >
          <Typography variant="h6" color="white">
            {tableTitle}
          </Typography>
          {isEditing ? (
            <div className="flex gap-2">
              <Button color="green" size="sm" onClick={handleSave}>
                Save
              </Button>
              <Button color="red" size="sm" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button color="blue" size="sm" onClick={onEdit}>
              Edit
            </Button>
          )}
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0">
          <section className="mx-auto w-[85%]">
            <h1 className="mb-8 text-center font-poppins font-medium capitalize text-black md:text-start">
              {name}
            </h1>
            {isEditing ? (
              <>
                {/* <input
                  type="text"
                  value={editableTitle}
                  onChange={(e) => setEditableTitle(e.target.value)}
                  className="mb-8 w-full rounded-md border border-blue-300 p-2 text-center text-lg font-poppins font-medium capitalize text-black focus:ring-2 focus:ring-blue-500 md:text-start"
                /> */}
                <ReactQuill
                  value={editableContent}
                  onChange={setEditableContent}
                  theme="snow"
                  className="p-3 text-sm text-zinc-500 font-poppins border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </>
            ) : (
              <>
                <div
                  className="mb-5 text-center font-poppins text-sm leading-normal text-zinc-500 md:text-start"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </>
            )}
          </section>
        </CardBody>
      </Card>
    </section>
  );
};
export default SimplePage;

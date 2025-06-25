import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Radio,
  Button,
} from "@material-tailwind/react";

const AddEventModal = ({
  isOpen,
  onClose,
  onSubmit,
  selectedDate,
  title = "Add New Event",
  primaryActionLabel = "Add Event",
}) => {
  const [form, setForm] = useState({
    title: "",
    organizer: "",
    reservation: 0,
    start_date: selectedDate,
    end_date: "",
    begins_at: "",
    ends_at: "",
    description: "",
    location: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(form);
    setForm({
      title: "",
      reservation: 0,
      organizer: "",
      start_date: "",
      end_date: "",
      begins_at: "",
      ends_at: "",
      description: "",
      location: "",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} handler={onClose} size="xl" className="">
      <DialogHeader>{title}</DialogHeader>
      <DialogBody divider className="grid gap-6 overflow-auto max-h-[75vh]">
        {/* Title and Organizer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Title"
            name="title"
            value={form.title}
            onChange={handleInputChange}
          />
          <Input
            label="Organizer"
            name="organizer"
            value={form.organizer}
            onChange={handleInputChange}
          />
        </div>

        {/* Multi-day Reservation and Dates */}
        <div className="grid gap-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <span className="font-medium">Multi-day reservation?</span>
            <Radio
              id="add-yes"
              name="reservation"
              label="Yes"
              checked={form.reservation}
              onChange={() => setForm((prev) => ({ ...prev, reservation: 1 }))}
            />
            <Radio
              id="add-no"
              name="reservation"
              label="No"
              checked={!form.reservation}
              onChange={() => setForm((prev) => ({ ...prev, reservation: 0 }))}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="Start Date"
              type="date"
              name="start_date"
              value={form.start_date}
              onChange={handleInputChange}
            />
            <Input
              label="End Date"
              type="date"
              name="end_date"
              value={form.end_date}
              onChange={handleInputChange}
              disabled={!form.reservation}
            />
          </div>
        </div>

        {/* Begins At and Ends At */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Begins At"
            type="time"
            name="begins_at"
            value={form.begins_at}
            onChange={handleInputChange}
          />
          <Input
            label="Ends At"
            type="time"
            name="ends_at"
            value={form.ends_at}
            onChange={handleInputChange}
          />
        </div>

        {/* Description and Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Textarea
            label="Description"
            name="description"
            value={form.description}
            onChange={handleInputChange}
          />
          <Textarea
            label="Location"
            name="location"
            value={form.location}
            onChange={handleInputChange}
          />
        </div>
      </DialogBody>
      <DialogFooter className="flex justify-start">
        <Button
          variant="outlined"
          color="blue"
          onClick={onClose}
          className="mr-2"
        >
          Cancel
        </Button>
        <Button variant="filled" color="blue" onClick={handleSubmit}>
          {primaryActionLabel}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AddEventModal;

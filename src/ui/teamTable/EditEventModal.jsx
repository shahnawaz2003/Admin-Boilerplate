import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Radio,
} from "@material-tailwind/react";
import DeleteModal from "../DeleteModal";

const EditEventModal = ({
  isOpen,
  onClose,
  eventDetails,
  onSave,
  onDelete,
  isDeleteModalOpen,
  deteConformation,
  setIsDeleteModalOpen,
}) => {
  const [form, setForm] = useState({
    title: eventDetails.title || "",
    organizer: eventDetails.organizer || "",
    reservation: eventDetails.reservation || 0,
    start_date: eventDetails.start || "",
    end_date: eventDetails.end || "",
    begins_at: eventDetails.begins_at || "",
    ends_at: eventDetails.ends_at || "",
    description: eventDetails.description || "",
    location: eventDetails.location || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Dialog open={isOpen} handler={onClose} size="xl">
        <DialogHeader>Edit Event</DialogHeader>
        <DialogBody divider className="grid gap-6 overflow-y-auto max-h-[75vh]">
          {/* Title and Organizer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Title"
              name="title"
              value={form?.title}
              onChange={handleInputChange}
            />
            <Input
              label="Organizer"
              name="organizer"
              value={form?.organizer}
              onChange={handleInputChange}
            />
          </div>

          {/* Multi-day Reservation and Dates */}
          <div className="grid gap-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <span className="font-medium text-sm md:text-base">
                Multi-day reservation?
              </span>
              <div className="flex items-center gap-4">
                <Radio
                  id="yes"
                  name="reservation"
                  label="Yes"
                  checked={form?.reservation}
                  onChange={() =>
                    setForm((prev) => ({ ...prev, reservation: 1 }))
                  }
                />
                <Radio
                  id="no"
                  name="reservation"
                  label="No"
                  checked={!form.reservation}
                  onChange={() =>
                    setForm((prev) => ({ ...prev, reservation: 0 }))
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Start Date"
                type="date"
                name="start_date"
                value={form?.start_date}
                onChange={handleInputChange}
              />
              <Input
                label="End Date"
                type="date"
                name="end_date"
                value={form?.end_date}
                onChange={handleInputChange}
                disabled={!form?.reservation}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <DialogFooter className="flex flex-wrap gap-4 justify-center md:justify-start">
          <div className="flex gap-4">
            <Button variant="outlined" color="blue" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="filled" color="blue" onClick={() => onSave(form)}>
              Save Changes
            </Button>
            <Button variant="filled" color="red" onClick={onDelete}>
              Delete Event
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
      {/* <DeleteModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={deteConformation}
        rowData={eventDetails}
      /> */}
    </>
  );
};

export default EditEventModal;

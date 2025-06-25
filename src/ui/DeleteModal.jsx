import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
const DeleteModal = ({
  open,
  onClose,
  onDelete,
  rowData,
  isDeleting = false,
}) => {
  // Get a more meaningful identifier from the rowData
  const itemName =
    rowData?.name || rowData?.productName || rowData?.title || "this item";
  return (
    <Dialog open={open} handler={onClose} size="sm">
      <DialogHeader>Confirm Deletion</DialogHeader>
      <DialogBody>
        <p>
          Are you sure you want to delete <strong>{itemName}</strong>? This
          action cannot be undone.
        </p>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={onClose}
          disabled={isDeleting}
        >
          Cancel
        </Button>
        <Button
          variant="gradient"
          color="blue"
          onClick={() => {
            onDelete(rowData);
          }}
          disabled={isDeleting}
          className="flex items-center gap-2"
        >
          {isDeleting ? (
            <>
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Deleting...</span>
            </>
          ) : (
            "Confirm"
          )}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
export default DeleteModal;

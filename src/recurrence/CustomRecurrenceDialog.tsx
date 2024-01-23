import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import CustomRecurrenceComponent from "./CustomRecurrenceComponent";

type CustomRecurrenceDialogProps = {
  setOpen: (open: boolean) => void;
  open: boolean;
  setRecurrence: (recurrence: any) => void;
  handleRepeatChange: (value: string | null, dateString: string) => void;
};

const CustomRecurrenceDialog: React.FC<CustomRecurrenceDialogProps> = ({
  setOpen,
  open,
  setRecurrence,
  handleRepeatChange,
}) => {
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Custom Recurrence</DialogTitle>
        <DialogContent>
          <Box mt={2}>
            <CustomRecurrenceComponent
              handleRepeatChange={handleRepeatChange}
              setRecurrence={setRecurrence}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomRecurrenceDialog;

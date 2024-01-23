import { useState } from "react";
import { MenuItem, Button, Menu } from "@mui/material";
import CustomRecurrenceDialog from "./recurrence/CustomRecurrenceDialog";

const RecurrenceMenu = () => {
  const [repeat, setRepeat] = useState("");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRepeatChange = (value: string) => {
    setRepeat(value);
    handleClose();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="outlined"
      >
        {repeat || "Schedule"}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleRepeatChange("daily")}>Daily</MenuItem>
        <MenuItem onClick={() => handleRepeatChange("weekly")}>Weekly</MenuItem>
        <MenuItem onClick={() => handleRepeatChange("monthly")}>
          Monthly
        </MenuItem>
        <MenuItem onClick={() => handleOpen()}>Custom</MenuItem>
        {/* Add more recurrence options here */}
      </Menu>
      <CustomRecurrenceDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default RecurrenceMenu;

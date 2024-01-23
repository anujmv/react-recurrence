import { useState } from "react";
import { MenuItem, Button, Menu } from "@mui/material";
import CustomRecurrenceDialog from "./recurrence/CustomRecurrenceDialog";
import dayjs from "dayjs";
import { WeekDays } from "./recurrence/types";

import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

const FREQUENCY_OPTIONS = {
  daily: {
    startDate: dayjs(new Date()).startOf("date"),
    endDate: null,
    frequency: "daily",
    numberOfRepetitions: 1,
    weekDaysRepetition: [dayjs(new Date()).day()],
    endingCondition: "none",
    isAllDay: true,
    startTime: null,
    endTime: null,
  },
  weekly: {
    startDate: dayjs(new Date()).startOf("date"),
    endDate: null,
    frequency: "weekly",
    numberOfRepetitions: 1,
    weekDaysRepetition: [dayjs(new Date()).day()],
    endingCondition: "none",
    isAllDay: true,
    startTime: null,
    endTime: null,
  },
  monthly: {
    startDate: dayjs(new Date()).startOf("date"),
    endDate: null,
    frequency: "monthly",
    numberOfRepetitions: 1,
    weekDaysRepetition: [],
    endingCondition: "none",
    isAllDay: true,
    startTime: null,
    endTime: null,
  },
};
type RepeatType = {
  value: string | null;
  dateString: string;
};

const RecurrenceMenu = () => {
  const [repeat, setRepeat] = useState<RepeatType>({
    value: "daily",
    dateString: "",
  });
  const [recurrence, setRecurrence] = useState({});
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRepeatChange = (value: string | null, dateString: string) => {
    setRepeat({ value, dateString });
    if (value !== null) {
      setRecurrence(FREQUENCY_OPTIONS[value as keyof typeof FREQUENCY_OPTIONS]);
    }

    handleClose();
  };

  console.log(recurrence);

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
        {repeat.dateString || "Schedule"}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleRepeatChange("daily", "daily")}>
          Daily
        </MenuItem>
        <MenuItem
          onClick={() =>
            handleRepeatChange(
              "weekly",
              `Weekly on ${WeekDays[dayjs(new Date()).day()]}`
            )
          }
        >
          Weekly on {WeekDays[dayjs(new Date()).day()]}
        </MenuItem>
        <MenuItem
          onClick={() =>
            handleRepeatChange(
              "monthly",
              ` Monthly on ${dayjs(new Date()).format("Do")}`
            )
          }
        >
          Monthly on {dayjs(new Date()).format("Do")}
        </MenuItem>
        <MenuItem onClick={() => handleOpen()}>Custom</MenuItem>
        {/* Add more recurrence options here */}
      </Menu>
      <CustomRecurrenceDialog
        open={open}
        setOpen={setOpen}
        setRecurrence={setRecurrence}
        handleRepeatChange={handleRepeatChange}
      />
    </div>
  );
};

export default RecurrenceMenu;

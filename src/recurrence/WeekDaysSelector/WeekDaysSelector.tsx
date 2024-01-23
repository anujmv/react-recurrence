import { RecurrenceDay } from "../types";
import { Tooltip, Button } from "@mui/material";

export interface WeekDaysSelectorProps {
  // Use WithStyles in WeekDaysSelectorProps
  weekDaysRepetition: Array<number>;
  onDayClicked: (days: Array<number>) => void;
}

const DEFAULT_WEEK_DAYS: RecurrenceDay[] = [
  {
    key: 0,
    title: "Sunday",
    symbol: "S",
  },
  {
    key: 1,
    title: "Monday",
    symbol: "M",
  },
  {
    key: 2,
    title: "Tuesday",
    symbol: "T",
  },
  {
    key: 3,
    title: "Wednesday",
    symbol: "W",
  },
  {
    key: 4,
    title: "Thursday",
    symbol: "T",
  },
  {
    key: 5,
    title: "Friday",
    symbol: "F",
  },
  {
    key: 6,
    title: "Saturday",
    symbol: "S",
  },
];

const WeekDaysSelector = ({
  weekDaysRepetition = [],
  onDayClicked,
}: WeekDaysSelectorProps) => {
  // Remove WithStyles from here
  const handleDayClicked = (day: RecurrenceDay) => {
    let newDaysList: Array<number> = weekDaysRepetition;
    if (newDaysList.includes(day.key)) {
      newDaysList = newDaysList.filter((d) => d !== day.key);
    } else {
      newDaysList.push(day.key);
    }
    onDayClicked(newDaysList);
  };
  return (
    <div data-testid="recurrence-week-days-selector">
      {DEFAULT_WEEK_DAYS.map((day) => (
        <Tooltip
          key={`${day.title}-${day.key}-tooltip`}
          title={day.title}
          arrow
        >
          <Button
            key={`${day.key}-btn`}
            sx={{
              backgroundColor: weekDaysRepetition.includes(day.key)
                ? "#e0e0e0"
                : "#ffffff",
            }}
            onClick={() => handleDayClicked(day)}
            data-testid={`weekdays-${day.key}`}
          >
            {day.symbol}
          </Button>
        </Tooltip>
      ))}
    </div>
  );
};

export default WeekDaysSelector;

import { useState } from "react";
import { Grid } from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  EndingConditionType,
  FrequencyType,
  RecurrenceType,
  Recurrence,
} from "..";
import { WeekDays } from "./types";

const customRecurranceToStringCreator = (recurrence: RecurrenceType) => {
  let frequencyString = "";
  switch (recurrence.frequency) {
    case FrequencyType.Daily:
      frequencyString = `Every ${recurrence.numberOfRepetitions} Day(s)`;
      break;
    case FrequencyType.Weekly:
      frequencyString = `Every ${recurrence.numberOfRepetitions} Week(s)`;
      if (recurrence.weekDaysRepetition.length > 0) {
        const repetitationDaystring = recurrence.weekDaysRepetition.map(
          (day) => WeekDays[day]
        );
        const weekDays = repetitationDaystring.join(", ");
        frequencyString += ` On ${weekDays}`;
      }
      break;
    case FrequencyType.Monthly:
      frequencyString = `Every ${
        recurrence.numberOfRepetitions
      } Month(s) on the ${recurrence.startDate.date()} day`;
      break;
    case FrequencyType.Annually:
      frequencyString = `Every ${
        recurrence.numberOfRepetitions
      } Year(s) on the ${recurrence.startDate.date()} day of ${recurrence.startDate.format(
        "MMMM"
      )}`;
      break;
    default:
      frequencyString = "Invalid Frequency";
      break;
  }

  if (recurrence.endingCondition === EndingConditionType.OccurrencesNumber) {
    frequencyString += ` until ${recurrence.endingOccurrencesNumber} occurrences`;
  } else if (recurrence.endingCondition === EndingConditionType.EndDate) {
    frequencyString += ` until ${recurrence.endDate?.format("MMMM DD, YYYY")}`;
  }

  return frequencyString;
};

type CustomRecurrenceComponentProps = {
  setRecurrence: (recurrence: any) => void;
  handleRepeatChange: (value: string | null, dateString: string) => void;
};

const CustomRecurrenceComponent: React.FC<CustomRecurrenceComponentProps> = ({
  setRecurrence: setRecurrenceParent,
  handleRepeatChange,
}) => {
  const defaultEndingOccurrencesNumber = 13;

  const today = dayjs(new Date());
  const defaultRecurrence = {
    startDate: today,
    endDate: today,
    frequency: FrequencyType.Daily,
    numberOfRepetitions: 1,
    weekDaysRepetition: [],
    endingCondition: EndingConditionType.None,
    endingOccurrencesNumber: defaultEndingOccurrencesNumber,
    isAllDay: true,
    startTime: today,
    endTime: today,
  };
  const [recurrence, setRecurrence] =
    useState<RecurrenceType>(defaultRecurrence);

  const handleRecurrenceChange = (updatedRecurrence: RecurrenceType) => {
    setRecurrence(updatedRecurrence);
    setRecurrenceParent(updatedRecurrence);
    handleRepeatChange(
      null,
      customRecurranceToStringCreator(updatedRecurrence)
    );
  };

  //   console.log(recurrence);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Recurrence recurrence={recurrence} onChange={handleRecurrenceChange}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Recurrence.StartDateSelector />
          </Grid>

          <Grid item xs={12} md={12}>
            <Recurrence.FrequencySelector />
          </Grid>
          <Grid item sm={12}>
            <Recurrence.EndingConditionSelector />
          </Grid>
          {/* <Grid item sm={12}>
            <Recurrence.TimeSelector />
          </Grid> */}
        </Grid>
      </Recurrence>
    </LocalizationProvider>
  );
};

export default CustomRecurrenceComponent;

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

const CustomRecurrenceComponent = () => {
  const defaultEndingOccurrencesNumber = 13;

  const today = dayjs(new Date());
  const defaultRecurrence = {
    startDate: today,
    endDate: today,
    frequency: FrequencyType.Weekly,
    numberOfRepetitions: 1,
    weekDaysRepetition: [],
    endingCondition: EndingConditionType.None,
    endingOccurrencesNumber: defaultEndingOccurrencesNumber,
    isAllDay: false,
    startTime: today,
    endTime: today,
  };
  const [recurrence, setRecurrence] =
    useState<RecurrenceType>(defaultRecurrence);

  const handleRecurrenceChange = (updatedRecurrence: RecurrenceType) => {
    setRecurrence(updatedRecurrence);
  };

  console.log(recurrence);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Recurrence recurrence={recurrence} onChange={handleRecurrenceChange}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Recurrence.StartDateSelector />
          </Grid>
          <Grid item container>
            <Grid item xs={12} md={4}>
              <Recurrence.FrequencySelector />
            </Grid>
            <Grid item sm={12} md={4}>
              <Recurrence.EndingConditionSelector />
            </Grid>
          </Grid>
          <Grid item sm={12}>
            <Recurrence.TimeSelector />
          </Grid>
        </Grid>
      </Recurrence>
    </LocalizationProvider>
  );
};

export default CustomRecurrenceComponent;

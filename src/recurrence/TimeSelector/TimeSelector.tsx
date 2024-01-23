import * as React from "react";
import { FormControlLabel, Checkbox, Grid } from "@mui/material";
import { TimePicker as MUITimePicker } from "@mui/x-date-pickers";

import RecurrenceContext from "../RecurrenceContext";
import { useContext, useEffect } from "react";
import { Dayjs } from "dayjs";

const TimeSelector = () => {
  const { recurrence, onFieldChange, onFieldsChange } =
    useContext(RecurrenceContext);

  const handleAllDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFieldChange("isAllDay", event.target.checked);
  };
  const handleStartTimeChange = (startTime?: Dayjs | null) => {
    onFieldChange("startTime", startTime);
  };
  const handleEndTimeChange = (endTime?: Dayjs | null) => {
    onFieldChange("endTime", endTime);
  };
  useEffect(() => {
    if (recurrence.isAllDay) {
      onFieldsChange({
        startTime: null,
        endTime: null,
      });
    }
  }, [recurrence.isAllDay]);

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item sm={2}>
          <FormControlLabel
            control={
              <Checkbox
                id="is-all-day"
                name="is-all-day"
                checked={recurrence.isAllDay}
                onChange={handleAllDayChange}
                color="primary"
                data-testid="recurrence-all-day"
              />
            }
            label="All day"
            labelPlacement="top"
          />
        </Grid>
        <Grid item sm={5} container>
          <MUITimePicker
            label="Start"
            value={recurrence.startTime}
            onChange={handleStartTimeChange}
            disabled={recurrence.isAllDay}
          />
        </Grid>
        <Grid item sm={5} container>
          <MUITimePicker
            label="End"
            value={recurrence.endTime}
            onChange={handleEndTimeChange}
            disabled={recurrence.isAllDay}
          />
        </Grid>
      </Grid>
    </div>
  );
};
export default TimeSelector;

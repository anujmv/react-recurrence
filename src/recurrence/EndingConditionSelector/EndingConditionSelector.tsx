import * as React from "react";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import { Grid } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import DatePicker from "../general/DatePicker";
import NumberInput from "../general/NumberInput";
import { EndingConditionType } from "../types";

import RecurrenceContext from "../RecurrenceContext";
import { useContext, useEffect } from "react";

const EndingConditionSelector = ({}) => {
  const { recurrence, onFieldChange, onFieldsChange } =
    useContext(RecurrenceContext);

  const handleEndingConditionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onFieldChange("endingCondition", event.target.value);
  };
  const handleEndingOccurrencesNumberChange = (
    endingOccurrencesNumber: number
  ) => {
    onFieldChange("endingOccurrencesNumber", endingOccurrencesNumber);
  };
  const handleEndDateChange = (date: Date) => {
    onFieldChange("endDate", date);
  };
  useEffect(() => {
    switch (recurrence.endingCondition) {
      case EndingConditionType.None:
        onFieldsChange({
          endDate: null,
          endingOccurrencesNumber: undefined,
        });
        break;
      case EndingConditionType.EndDate:
        onFieldChange("endingOccurrencesNumber", undefined);
        break;
      case EndingConditionType.OccurrencesNumber:
        onFieldChange("endDate", null);
        break;
    }
  }, [recurrence.endingCondition]);

  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">Ends</FormLabel>
        <RadioGroup
          aria-label="ends"
          name="ends"
          value={recurrence.endingCondition}
          onChange={handleEndingConditionChange}
        >
          <Grid container spacing={1} mt={1}>
            <Grid item sm={6}>
              <FormControlLabel
                value={EndingConditionType.None}
                control={
                  <Radio
                    color="primary"
                    data-testid="recurrence-ending-condition-none-choice"
                  />
                }
                label="Never"
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} mt={1}>
            <Grid item sm={6} container>
              <FormControlLabel
                value={EndingConditionType.EndDate}
                control={
                  <Radio
                    color="primary"
                    data-testid="recurrence-ending-condition-end-date-choice"
                  />
                }
                label="On"
              />
            </Grid>
            <Grid item sm={6}>
              <DatePicker
                name="end-date"
                label="End"
                slotProps={{ textField: { size: "small" } }}
                value={recurrence.endDate}
                onChange={handleEndDateChange}
                disabled={
                  recurrence.endingCondition !== EndingConditionType.EndDate
                }
                minDate={recurrence.startDate}
                minDateMessage="End Date must be equal or after Start Date"
                inputProps={{
                  "data-testid": "recurrence-ending-condition-end-date",
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} mt={1}>
            <Grid item sm={6} container alignItems="flex-start">
              <FormControlLabel
                value={EndingConditionType.OccurrencesNumber}
                control={
                  <Radio
                    color="primary"
                    data-testid="recurrence-ending-condition-occurrences-number-choice"
                  />
                }
                label="After"
              />
            </Grid>
            <Grid item sm={6}>
              <NumberInput
                name="ending-occurrences-number"
                value={recurrence.endingOccurrencesNumber}
                onChange={handleEndingOccurrencesNumberChange}
                adornmentLabel="occurrences"
                disabled={
                  recurrence.endingCondition !==
                  EndingConditionType.OccurrencesNumber
                }
                size="small"
                inputProps={{
                  "data-testid":
                    "recurrence-ending-condition-occurrences-number",
                }}
              />
            </Grid>
          </Grid>
        </RadioGroup>
      </FormControl>
    </div>
  );
};
export default EndingConditionSelector;

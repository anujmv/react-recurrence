import * as React from "react";

import { Grid, ThemeProvider, useTheme } from "@mui/material";
import { RecurrenceType } from "./types";
import RecurrenceProvider from "./RecurrenceProvider";
import StartDateSelector from "./StartDateSelector/StartDateSelector";

import EndingConditionSelector from "./EndingConditionSelector";
import TimeSelector from "./TimeSelector";
import FrequencySelector from "./FrequencySelector";

export interface RecurrenceProps {
  recurrence: RecurrenceType;
  onChange: (recurrence: RecurrenceType) => void;
  children?: React.ReactNode;
}

const Recurrence = ({
  recurrence,
  onChange,

  children,
}: RecurrenceProps) => {
  const theme = useTheme();
  const handleFieldChange = (key: string, value: any) => {
    const newRecurrence = {
      ...recurrence,
      [key]: value,
    };
    onChange(newRecurrence);
  };

  const handleFieldsChange = (object: any) => {
    const newRecurrence = {
      ...recurrence,
      ...object,
    };
    onChange(newRecurrence);
  };
  const defaultChildren = (
    <Grid container direction="column" spacing={3}>
      <Grid item xs={12}>
        <StartDateSelector />
      </Grid>
      <Grid item xs={12}>
        <FrequencySelector />
      </Grid>
      <Grid item sm={12}>
        <EndingConditionSelector />
      </Grid>
      <Grid item sm={12}>
        <TimeSelector />
      </Grid>
    </Grid>
  );

  return (
    <ThemeProvider theme={theme}>
      <RecurrenceProvider
        recurrence={recurrence}
        onFieldChange={handleFieldChange}
        onFieldsChange={handleFieldsChange}
      >
        <div>{children !== undefined ? children : defaultChildren}</div>
      </RecurrenceProvider>
    </ThemeProvider>
  );
};
export default Object.assign(Recurrence, {
  StartDateSelector: StartDateSelector,
  FrequencySelector: FrequencySelector,
  EndingConditionSelector: EndingConditionSelector,
  TimeSelector: TimeSelector,
});

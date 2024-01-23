import * as React from "react";
import { FrequencyType, Option } from "../types";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import DropDown from "../general/DropDown";
import NumberInput from "../general/NumberInput";
import WeekDaysSelector from "../WeekDaysSelector";

import { FunctionComponent, useContext, useEffect } from "react";
import RecurrenceContext from "../RecurrenceContext";
import { FormLabel, InputLabel, Typography } from "@mui/material";

const FREQUENCY_OPTIONS: Option[] = [
  // {
  //   key: FrequencyType.None,
  //   title: "Does not repeat",
  // },
  // {
  //   key: FrequencyType.Hourly,
  //   title: "Hourly",
  // },
  {
    key: FrequencyType.Daily,
    title: "Day",
  },
  {
    key: FrequencyType.Weekly,
    title: "Week",
  },
  {
    key: FrequencyType.Monthly,
    title: "Month",
  },
  {
    key: FrequencyType.Annually,
    title: "Year",
  },
];
const FrequencySelector: FunctionComponent = () => {
  const { recurrence, onFieldChange, onFieldsChange } =
    useContext(RecurrenceContext);

  const handleFrequencyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onFieldChange("frequency", event.target.value);
  };
  const handleNumberOfRepetitionChange = (numberOfRepetitions: number) => {
    onFieldChange("numberOfRepetitions", numberOfRepetitions);
  };
  const handleWeekDaysChange = (days: Array<number>) => {
    onFieldChange("weekDaysRepetition", days);
  };

  const getFrequencyLabel = () => {
    switch (recurrence.frequency) {
      case FrequencyType.Hourly:
        return "hour";
      case FrequencyType.Daily:
        return "day";
      case FrequencyType.Weekly:
        return "week";
      case FrequencyType.Monthly:
        return "month";
      case FrequencyType.Annually:
        return "year";
      default:
        return "";
    }
  };

  const getRepetitionsLabelByFrequency = () => {
    const frequencyLabel = getFrequencyLabel();
    if (frequencyLabel === "") {
      return "";
    }
    return `${frequencyLabel}(s)`;
  };

  useEffect(() => {
    let toClear = {};
    if (recurrence.frequency !== FrequencyType.Weekly) {
      toClear = {
        weekDaysRepetition: [],
      };
    }
    if (recurrence.frequency === FrequencyType.None) {
      toClear = {
        ...toClear,
        numberOfRepetitions: undefined,
      };
      onFieldsChange(toClear);
    }
  }, [recurrence.frequency]);

  return (
    <React.Fragment>
      <Grid container justifyItems="center" alignItems="center">
        <Grid item xs={12} md={4} lg={4}>
          <FormLabel component="legend">Repeats Every</FormLabel>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <NumberInput
            name="number-of-repetition"
            value={recurrence.numberOfRepetitions}
            onChange={handleNumberOfRepetitionChange}
            // adornmentLabel={getRepetitionsLabelByFrequency()}
            data-testid="recurrence-number-of-repetitions"
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <DropDown
            name="frequency"
            value={recurrence.frequency}
            onChange={handleFrequencyChange}
            label="Frequency"
            options={FREQUENCY_OPTIONS}
            data-testid="recurrence-frequency"
            sx={{ width: "100%" }}
          />
        </Grid>

        {recurrence.frequency === FrequencyType.Weekly && (
          <Fade in={recurrence.frequency === FrequencyType.Weekly}>
            <Grid item sm={12} mt={2}>
              <FormLabel component="legend">Repeats On</FormLabel>
              <WeekDaysSelector
                weekDaysRepetition={recurrence.weekDaysRepetition}
                onDayClicked={handleWeekDaysChange}
              />
            </Grid>
          </Fade>
        )}
      </Grid>
    </React.Fragment>
  );
};
export default FrequencySelector;

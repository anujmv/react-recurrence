import DatePicker from "../general/DatePicker";

import RecurrenceContext from "../RecurrenceContext";
import { FunctionComponent, useContext } from "react";

const StartDateSelector: FunctionComponent = () => {
  const { recurrence, onFieldChange } = useContext(RecurrenceContext);

  const handleStartDateChange = (date: Date) => {
    console.log("date", date);
    onFieldChange("startDate", date);
  };

  return (
    <DatePicker
      name="start-date"
      label="Start"
      value={recurrence.startDate}
      onChange={handleStartDateChange}
      data-testid="recurrence-startdate"
      sx={{ width: "100%" }}
    />
  );
};
export default StartDateSelector;

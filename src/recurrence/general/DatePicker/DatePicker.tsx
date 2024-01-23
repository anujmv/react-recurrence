import {
  DatePicker as MUIDatePicker,
  DatePickerProps as MUIDatePickerProps,
} from "@mui/x-date-pickers";

const DEFAULT_DATE_FORMAT = "DD/MM/YYYY";

interface DatePickerProps extends MUIDatePickerProps<any> {
  name: string;
  label: string;
  value: any;
  onChange: (value: any) => void;
  disabled?: boolean;
  disablePast?: boolean;
  variant?: "inline" | "static" | "dialog";
  margin?: "none" | "dense" | "normal";
  minDateMessage?: string;
  inputProps?: any;
  renderInput?: (params: any) => JSX.Element; // Add renderInput property
}

const DatePicker = ({
  name,
  label,
  value,
  onChange = () => {},
  disabled = false,
  disablePast = true,
  variant = "inline",
  margin = "normal",
  ...props
}: DatePickerProps) => {
  return (
    <MUIDatePicker
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      format={DEFAULT_DATE_FORMAT}
      disablePast={disablePast}
      disabled={disabled}
      {...props}
    />
  );
};
export default DatePicker;

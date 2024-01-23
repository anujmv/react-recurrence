import * as React from "react";

import {
  InputBaseProps,
  FormControl,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";

type NumberInputProps = Omit<InputBaseProps, "onChange"> & {
  name: string;
  label?: string;
  value?: number;
  onChange: (value: number) => void;
  adornmentLabel?: string;
  min?: number;
  max?: number;
};

const NumberInput = ({
  name,
  label = "",
  value = 0,
  onChange = () => {},
  disabled = false,
  adornmentLabel = "",
  min = 1,
  max = 1000,
  ...others
}: NumberInputProps) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (isNaN(value)) return;
    onChange(value);
  };
  return (
    <FormControl variant="outlined">
      <OutlinedInput
        name={name}
        label={label}
        type="number"
        value={value}
        onChange={handleOnChange}
        disabled={disabled}
        endAdornment={
          <InputAdornment position="end">{adornmentLabel}</InputAdornment>
        }
        aria-describedby="outlined-weight-helper-text"
        inputProps={{
          "aria-label": "weight",
          min: min,
          max: max,
          "decimal-separator": "false",
        }}
        {...others}
      />
    </FormControl>
  );
};
export default NumberInput;

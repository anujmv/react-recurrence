import { MenuItem, TextField, TextFieldProps } from "@mui/material";

import { Option } from "../../types";

type DropDownProps = TextFieldProps & { options: Array<Option> };

const DropDown = ({
  name,
  label,
  value,
  onChange = () => {},
  options = [],
  ...others
}: DropDownProps) => {
  return (
    <TextField
      name={name}
      select
      value={value}
      onChange={onChange}
      label={label}
      {...others}
    >
      {options.map((option) => (
        <MenuItem key={option.key} value={option.key}>
          {option.title}
        </MenuItem>
      ))}
    </TextField>
  );
};
export default DropDown;

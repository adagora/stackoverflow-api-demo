import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  Typography
} from "@mui/material";
import React from "react";
import SelectorOption from "./SelectorOption";

const Selector: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  children,
  style,
  error,
  disabled
}) => {
  return (
    <FormControl style={{ padding: 5, ...style }}>
      <InputLabel>{label}</InputLabel>
      <Select
        labelId={`${label}-label`}
        id={`${label}-select`}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        {React.Children.map(
          children as React.ReactElement,
          (child: React.ReactElement) => {
            if (React.isValidElement(child) && child.type === SelectorOption) {
              const { label, value, disabled } = child.props as {
                label: string;
                value: string;
                disabled?: boolean;
              };
              return (
                <MenuItem key={value} value={value} disabled={disabled}>
                  {label ||
                    (child.props as { children: React.ReactNode }).children}
                </MenuItem>
              );
            }
            return null;
          }
        )}
      </Select>
      {error ? (
        <div>
          <Typography color="red" fontSize="small">
            TODO
          </Typography>
        </div>
      ) : null}
    </FormControl>
  );
};

export default Selector;

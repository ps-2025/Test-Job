
import React, { useMemo, memo } from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

const FormField = ({
  name,
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
  required = false,
  error = false,
  helperText = "",
  ...props
}) => {
  // Memoize the TextField component since it only depends on its props
  const field = useMemo(
    () => (
      <TextField
        name={name}
        label={label}
        value={value ?? ""} // Using nullish coalescing operator instead of logical OR
        onChange={onChange}
        type={type}
        disabled={disabled}
        required={required}
        error={error}
        helperText={helperText}
        fullWidth
        margin="normal"
        {...props}
      />
    ),
    [
      name,
      label,
      value,
      onChange,
      type,
      disabled,
      required,
      error,
      helperText,
      props,
    ]
  );

  return field;
};

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};

// Export with memo to prevent unnecessary re-renders
export default memo(FormField);

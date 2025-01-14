import React, { useMemo, memo } from "react";
import PropTypes from "prop-types";
import { Box, TextField, Typography } from "@mui/material";

const FormField = ({
  name,
  label,
  value,
  onChange,
  onBlur,
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
      <Box
        sx={{
          display: "flex",
          gap: "18px",
          alignItems: name === "description" ? "start" : "center",
          marginBottom: "18px",
        }}
      >
        <Box sx={{ minWidth: "150px" }}>
          <Typography variant="body1" sx={{ float: "right" }}>
            {label}
          </Typography>
        </Box>
        <Box
          sx={{
            minWidth: name === "description" ? "500px" : "200px",
            marginRight: "18px",
          }}
        >
          <TextField
            name={name}
            value={value ?? ""} // Using nullish coalescing operator instead of logical OR
            onChange={onChange}
            onBlur={onBlur}
            type={type}
            disabled={disabled}
            error={error}
            helperText={helperText}
            required={required}
            fullWidth
            multiline={name === "description"}
            rows={name === "description" ? 8 : 1}
            sx={{
              width: name === "description" ? "80%" : "188px",
              float: "left",
            }}
            InputLabelProps={{
              shrink: true,
            }}
            {...props}
          />
        </Box>
      </Box>
    ),
    [name, label, value, onChange, type, disabled, error, helperText, props]
  );

  return field;
};

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};

// Export with memo to prevent unnecessary re-renders
export default memo(FormField);

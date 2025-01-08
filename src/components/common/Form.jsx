import React, { memo, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { Box, Button } from "@mui/material";

const Form = ({
  onSubmit,
  children,
  submitLabel = "Save",
  disabled = false,
  ...props
}) => {
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit();
    },
    [onSubmit]
  );

  const submitButton = useMemo(
    () => (
      <Box mt={2}>
        <Button type="submit" variant="contained" disabled={disabled}>
          {submitLabel}
        </Button>
      </Box>
    ),
    [submitLabel]
  );

  return (
    <Box component="form" onSubmit={handleSubmit} {...props}>
      {children}
      {submitButton}
    </Box>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node,
  submitLabel: PropTypes.string,
  disabled: PropTypes.bool,
};

export default memo(Form);

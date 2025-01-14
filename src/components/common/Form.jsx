import React, { memo, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { Box, Button, Grid } from "@mui/material";

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
      <Grid marginTop={4} marginLeft={20}>
        <Button type="submit" variant="contained" disabled={disabled}>
          {submitLabel}
        </Button>
      </Grid>
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

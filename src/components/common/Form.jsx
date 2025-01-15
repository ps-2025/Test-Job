import React, { memo, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createProductDetailStyles } from "../../styles/appStyles";
import { useResponsive } from "@hooks/useResponsive";
import { BACK_BUTTON_TEXT } from "@utils/constants";

const Form = ({
  onSubmit,
  children,
  submitLabel = "Save",
  disabled = false,
  ...props
}) => {
  const navigate = useNavigate();
  const isMobile = useResponsive();
  const styles = useMemo(() => createProductDetailStyles(isMobile), [isMobile]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit();
    },
    [onSubmit]
  );

  const submitButton = useMemo(
    () => (
       <Box style={styles.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          {BACK_BUTTON_TEXT}
        </Button>
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

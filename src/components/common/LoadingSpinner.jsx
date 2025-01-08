import React from "react";
import { Box, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
};

const LoadingSpinner = React.memo(({ size = 40, color = "primary" }) => (
  <Box sx={styles.container}>
    <CircularProgress
      size={size}
      color={color}
      aria-label="Loading"
      role="status"
    />
  </Box>
));

LoadingSpinner.propTypes = {
  size: PropTypes.number,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "error",
    "info",
    "success",
    "warning",
    "inherit",
  ]),
};

LoadingSpinner.displayName = "LoadingSpinner";

export default LoadingSpinner;
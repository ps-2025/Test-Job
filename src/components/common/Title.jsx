import { PropTypes } from 'prop-types';
import React from "react";
import { Typography } from "@mui/material";

const Title = ({ children }) => (
  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
    {children}
  </Typography>
);

Title.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Title;

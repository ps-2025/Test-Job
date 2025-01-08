import React from "react";
import { ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const styles = {
  listItem: {
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
  },
};

const NavItem = React.memo(({ to, text, style }) => (
  <ListItem component={Link} to={to} sx={{ ...styles.listItem, ...style }}>
    <ListItemText primary={text} />
  </ListItem>
));

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

NavItem.displayName = "NavItem";

export default NavItem;

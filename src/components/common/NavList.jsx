import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { List, ListItem } from "@mui/material";
import Title from "./Title";
import NavItem from "./NavItem";

const NavList = React.memo(({ title, items }) => {
  const navItems = useMemo(
    () =>
      items?.map((item) => (
        <ListItem
          key={item?.id}
          sx={{
            padding: "0",
            paddingLeft: "20px",
            marginLeft: "32px",
          }}
        >
          •
          <NavItem
            style={{
              borderRadius: "8px",
              color: "#000",
            }}
            to={`/projects/${item?.id}`}
            text={item?.name}
          />
        </ListItem>
      )),
    [items]
  );

  return (
    <List>
      <ListItem>
        <Title>{title}</Title>
      </ListItem>
      {navItems}
    </List>
  );
});

NavList.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

NavList.displayName = "NavList";

export default NavList;

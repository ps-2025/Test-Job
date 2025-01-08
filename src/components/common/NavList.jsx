import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { List, ListItem } from "@mui/material";
import Title from "./Title";
import NavItem from "./NavItem";

const NavList = React.memo(({ title, items }) => {
  const navItems = useMemo(
    () =>
      items?.map((item) => (
        <NavItem
          style={{
            boxShadow:
              "0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08)",
            borderRadius: "8px",
            padding: "16px",
            color: "#000",
          }}
          key={item?.id}
          to={`/edit/${item?.id}`}
          text={item?.name}
        />
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

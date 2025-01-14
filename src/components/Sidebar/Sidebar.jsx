import React, { useMemo } from "react";
import styled from "styled-components";
import { Drawer, useTheme, useMediaQuery } from "@mui/material";
import NavList from "../common/NavList";
import { useFavoriteProjects } from "../../provider/FavoriteProjectProvider";

const SidebarContainer = styled.div`
  width: ${({ $isMobile }) => ($isMobile ? "100%" : "250px")};
  .MuiDrawer-paper {
    width: ${({ $isMobile }) => ($isMobile ? "100%" : "250px")};
    position: ${({ $isMobile }) => ($isMobile ? "relative" : "fixed")};
    height: ${({ $isMobile }) => ($isMobile ? "auto" : "100%")};
  }
`;

const Sidebar = React.memo(() => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { favorites } = useFavoriteProjects();

  const drawerStyles = useMemo(
    () => ({
      width: isMobile ? "100%" : "250px",
      flexShrink: 0,
    }),
    [isMobile]
  );

  return (
    <Drawer
      variant="permanent"
      anchor={isMobile ? "top" : "left"}
      sx={drawerStyles}
    >
      <SidebarContainer $isMobile={isMobile}>
        <NavList title="Favorite Projects" items={favorites} />
      </SidebarContainer>
    </Drawer>
  );
});

Sidebar.displayName = "Sidebar";

export default Sidebar;
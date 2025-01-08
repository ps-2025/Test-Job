/**
 * Generates styles for the app layout
 * @param {boolean} isMobile - Whether the current viewport is mobile
 * @returns {Object} Style objects for different components
 */
export const createAppStyles = (isMobile) => ({
  container: {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    minHeight: "100vh",
    width: "100%",
  },
  mainContent: {
    marginTop: isMobile ? "100px" : 0,
    marginLeft: isMobile ? 0 : "260px",
    width: isMobile ? "100%" : "calc(100% - 260px)",
    boxSizing: "border-box",
  },
  sidebar: {
    width: isMobile ? "100%" : "260px",
    position: isMobile ? "relative" : "fixed",
    top: 0,
    left: 0,
    height: isMobile ? "auto" : "100vh",
  },
});

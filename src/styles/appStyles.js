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
    marginTop: isMobile ? "100px" : "20px",
    marginLeft: isMobile ? 0 : "260px",
    width: isMobile ? "100%" : "calc(100% - 260px)",
    boxSizing: "border-box",
    marginRight: "40px",
  },
  sidebar: {
    width: isMobile ? "100%" : "260px",
    position: isMobile ? "relative" : "fixed",
    top: 0,
    left: 0,
    height: isMobile ? "auto" : "100vh",
  },
});

export const createProductDetailStyles = (isMobile) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "80px 16px 16px 40px",
    gap: "24px",
    width: isMobile ? "100%" : "600px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    gap: "24px",
    marginTop: "24px",
    marginLeft: "80px",
  },
});

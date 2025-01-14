import { useEffect, useState } from "react";
// import MOBILE_BREAKPOINT from "../../src/utils/constants";
import { MOBILE_BREAKPOINT } from "../utils/constants";
/**
 * Custom hook for handling responsive design
 * @param {number} breakpoint - The breakpoint width in pixels
 * @returns {boolean} Whether the current viewport is mobile
 */
export const useResponsive = (breakpoint = MOBILE_BREAKPOINT) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, [breakpoint]);

  return isMobile;
};

import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const updateWindowSize = (e) => {
    setWidth(e.target.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWindowSize);

    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  return [width];
};

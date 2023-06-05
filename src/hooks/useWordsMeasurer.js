import { useState, useEffect } from "react";

export const useWordsMeasurer = ({ data, fontSize }) => {
  const [wordsDimension, setWordDimension] = useState(undefined);
  const [containerEl, setContainerEl] = useState(null);

  useEffect(() => {
    setWordDimension(undefined);
  }, [data, fontSize]);

  useEffect(() => {
    if (containerEl) {
      const dimensions = Array.from(containerEl.children).map((el) => ({
        width: el.clientWidth,
        height: el.clientHeight
      }));
      setWordDimension(dimensions);
    }
  }, [containerEl]);

  return { wordsDimension, setContainerEl };
};

import { useMemo } from "react";

import { TrendingWords } from "./TrendingWords";

import { getWordsFromNodes } from "../hooks/useWords/helpers";

export const InitialWordsPlacer = ({ nodes, data, fontScale, colorScale }) => {
  const words = useMemo(() => getWordsFromNodes({ nodes, data }), [
    nodes,
    data
  ]);

  return (
    <TrendingWords
      words={words}
      fontScale={fontScale}
      colorScale={colorScale}
    />
  );
};

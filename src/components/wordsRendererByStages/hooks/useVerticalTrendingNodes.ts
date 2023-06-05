import { useMemo } from "react";

import { useWordsYScale } from "./useWordsYScale";

import { getIndexToXPositionMap, getNodes } from "./helpers";

export const useVerticalTrendingNodes = ({
  data,
  wordsDimension,
  innerDimensions
}) => {
  const yScale = useWordsYScale({
    data,
    wordsDimension,
    height: innerDimensions.height,
    key: "trendScore"
  });

  const indexToXPositionMap = useMemo(
    () =>
      getIndexToXPositionMap({ data, yScale, wordsDimension, innerDimensions }),
    [data, yScale, wordsDimension, innerDimensions]
  );

  const nodes = useMemo(
    () => getNodes({ data, wordsDimension, indexToXPositionMap, yScale }),
    [data, wordsDimension, indexToXPositionMap, yScale]
  );

  return nodes;
};

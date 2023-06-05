import { useMemo } from "react";
import { scaleLinear } from "@visx/scale";
import { extent } from "d3-array";

import { getMaxYPadding } from "./helpers";

export const useWordsYScale = ({ data, wordsDimension, height, key }) => {
  const scaleWithoutPadding = useMemo(
    () =>
      scaleLinear({
        domain: extent(data, (d) => d[key]),
        range: [height, 0]
      }),
    [data, height, key]
  );

  const { maxTopYPadding, maxBottomYPadding } = useMemo(
    () =>
      getMaxYPadding({
        data,
        scale: scaleWithoutPadding,
        height,
        wordsDimension,
        key
      }),
    [data, wordsDimension, height, scaleWithoutPadding, key]
  );

  const scaleWithPadding = useMemo(
    () =>
      scaleLinear({
        domain: extent(data, (d) => d[key]),
        range: [height - maxBottomYPadding, maxTopYPadding]
      }),
    [data, height, maxBottomYPadding, maxTopYPadding, key]
  );

  return scaleWithPadding;
};

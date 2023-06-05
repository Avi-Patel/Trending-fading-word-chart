import { useMemo } from "react";
import { scaleLinear } from "@visx/scale";
import { extent } from "d3-array";

export const useFontScale = ({ data, fontSize }) => {
  const fontScale = useMemo(
    () =>
      scaleLinear({
        domain: extent(data, (d) => d.count),
        range: [fontSize.min, fontSize.max]
      }),
    [data, fontSize]
  );

  return fontScale;
};

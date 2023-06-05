import { useMemo } from "react";
import { scaleLinear } from "@visx/scale";
import { extent } from "d3-array";

import { useVerticalTrendingNodes } from "./hooks/useVerticalTrendingNodes";
import { InitialWordsPlacer } from "./components/InitialWordsPlacer";
import { RefinedWordsPlacer } from "./components/RefinedWordsPlacer";

const colorGradient = { from: "#7462E0", to: "#C9C2F2" };
export const getColorScale = ({ data }) =>
  scaleLinear({
    domain: extent(data, (d) => d.trendScore),
    range: [colorGradient.to, colorGradient.from]
  });

export const WordsRendererByStages = ({
  stage,
  data,
  wordsDimension,
  fontScale,
  innerDimensions
}) => {
  const nodes = useVerticalTrendingNodes({
    data,
    wordsDimension,
    innerDimensions
  });
  const colorScale = useMemo(() => getColorScale({ data }), [data]);

  return stage === 1 ? (
    <InitialWordsPlacer
      fontScale={fontScale}
      colorScale={colorScale}
      nodes={nodes}
      data={data}
    />
  ) : (
    <RefinedWordsPlacer
      stage={stage}
      fontScale={fontScale}
      colorScale={colorScale}
      nodes={nodes}
      data={data}
      innerDimensions={innerDimensions}
    />
  );
};

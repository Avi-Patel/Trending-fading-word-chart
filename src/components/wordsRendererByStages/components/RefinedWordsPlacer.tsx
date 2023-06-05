import { TrendingWords } from "./TrendingWords";

import { useWords } from "../hooks/useWords/useWords";

export const RefinedWordsPlacer = ({
  nodes,
  data,
  fontScale,
  colorScale,
  stage,
  innerDimensions
}) => {
  const { words, loading } = useWords({ data, nodes, innerDimensions, stage });

  return !loading ? (
    <TrendingWords
      words={words}
      fontScale={fontScale}
      colorScale={colorScale}
    />
  ) : null;
};

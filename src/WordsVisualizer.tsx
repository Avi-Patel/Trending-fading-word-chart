import { useState } from "react";

import { StagesRenderer } from "./components/StagesRenderer";
import { WordsRendererByStages } from "./components/wordsRendererByStages/WordsRendererByStages";
import { WordCloudDataForm } from "./components/WordCloudDataForm";
import { WordDimensionsMeasurer } from "./components/WordDimensionsMeasurer";

import { useFontScale } from "./hooks/useFontScale";

import { FONT_SIZE, INNER_DIMENSIONS } from "./constants";
import { useInputDetails } from "./hooks/useInputDetails";

export const WordsVisualizer = ({
  data,
  fontSize = FONT_SIZE,
  innerDimensions = INNER_DIMENSIONS
}) => {
  const {
    key,
    inputData,
    cloudDimensions,
    onDataChange,
    onDimensionChange
  } = useInputDetails({ data, innerDimensions });

  const [stage, setStage] = useState(1);

  const fontScale = useFontScale({ data: inputData, fontSize });

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <WordCloudDataForm
        inputData={inputData}
        cloudDimensions={cloudDimensions}
        onDataChange={onDataChange}
        onDimensionChange={onDimensionChange}
      />
      <svg
        height={cloudDimensions.height}
        width={cloudDimensions.width}
        style={{ position: "relative", border: "1px solid grey" }}
      >
        <WordDimensionsMeasurer
          key={key}
          data={inputData}
          fontSize={fontSize}
          fontScale={fontScale}
        >
          {({ wordsDimension }) => (
            <WordsRendererByStages
              key={stage}
              stage={stage}
              data={inputData}
              wordsDimension={wordsDimension}
              innerDimensions={cloudDimensions}
              fontScale={fontScale}
            ></WordsRendererByStages>
          )}
        </WordDimensionsMeasurer>
      </svg>
      <StagesRenderer stage={stage} onStageChange={setStage} />
    </div>
  );
};

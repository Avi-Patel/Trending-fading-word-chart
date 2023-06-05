import { ReactElement } from "react";
import ReactDOM from "react-dom";

import { useWordsMeasurer } from "../hooks/useWordsMeasurer";

export const WordDimensionsMeasurer = ({
  data,
  fontSize,
  fontScale,
  children
}): ReactElement | null => {
  const { wordsDimension, setContainerEl } = useWordsMeasurer({
    data,
    fontSize
  });

  const wordsEl =
    typeof window !== "undefined"
      ? ReactDOM.createPortal(
          <div
            ref={setContainerEl}
            style={{
              display: "flex",
              flexWrap: "wrap",
              position: "absolute",
              alignItems: "start",
              top: 0,
              left: 0,
              visibility: "hidden"
            }}
          >
            {data.map((datum, index) => (
              <div
                key={`${datum.word}_${index}`}
                style={{
                  fontSize: `${fontScale(datum.count)}px`,
                  fontWeight: 500,
                  fontFamily: "sans-serif",
                  display: "inline-block"
                }}
              >
                {datum.word}
              </div>
            ))}
          </div>,
          document.body
        )
      : null;

  return wordsDimension ? children({ wordsDimension }) : wordsEl;
};

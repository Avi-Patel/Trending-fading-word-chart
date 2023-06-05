import { useCallback, useEffect, useState } from "react";

import { DimensionButtons } from "./DimensionsButtons";

export const WordCloudDataForm = ({
  cloudDimensions,
  inputData,
  onDataChange,
  onDimensionChange
}) => {
  const [height, setHeight] = useState(cloudDimensions.height);
  const [width, setWidth] = useState(cloudDimensions.width);
  const [dataStr, setDataStr] = useState(JSON.stringify(inputData));

  useEffect(() => {
    setHeight(cloudDimensions.height);
    setWidth(cloudDimensions.width);
  }, [cloudDimensions]);

  const onSubmit = useCallback(
    (e) => {
      onDataChange(dataStr);
      onDimensionChange({ width, height });
      e.preventDefault();
    },
    [dataStr, height, width, onDataChange, onDimensionChange]
  );

  const onHeightChange = useCallback((e) => setHeight(e.target.value), []);
  const onWidthChange = useCallback((e) => setWidth(e.target.value), []);
  const onDataInputChange = useCallback((e) => setDataStr(e.target.value), []);

  return (
    <>
      <form
        onSubmit={onSubmit}
        style={{
          marginBottom: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          border: "1px solid grey",
          padding: "8px"
        }}
      >
        <div style={{ margin: "10px 0px" }}>
          <label>data:</label>
          <textarea
            name="data"
            value={dataStr}
            onChange={onDataInputChange}
            rows={4}
            cols={50}
            style={{ margin: "0px 10px", width: "400px" }}
          />
        </div>

        <div style={{ margin: "10px 0px" }}>
          <label>Dimensions (height * width): </label>
          <input
            type="number"
            name="height"
            value={height}
            onChange={onHeightChange}
            style={{ margin: "0px 10px" }}
          />
          <input
            type="number"
            name="widht"
            value={width}
            onChange={onWidthChange}
          />
        </div>
        <div>Data will not reflect on submit if it is in wrong format. </div>
        <div>
          correct format is
          {` [{ "word": "abc", "count": 1000, "trendScore": 50 },{ "word": "abc1", "count": 100, "trendScore": 70 }]`}
        </div>
        <input type="submit" value="Submit" style={{ margin: "10px 0px" }} />
      </form>
      <div>
        <DimensionButtons
          currentDimensions={cloudDimensions}
          onDimensionChange={onDimensionChange}
        />
      </div>
    </>
  );
};

import { useState, useCallback } from "react";

const getFilteredData = (data) => {
  return data.filter(
    (datum) =>
      datum &&
      datum.word &&
      datum.count != undefined &&
      datum.trendScore != undefined
  );
};

export const useInputDetails = ({ data, innerDimensions }) => {
  const [cloudDimensions, setCloudDimensions] = useState(innerDimensions);
  const [inputData, setInputData] = useState(data);
  const [key, setKey] = useState(1);

  const onDataChange = useCallback((dataAsString) => {
    if (!dataAsString) {
      return;
    }
    try {
      const parsedData = JSON.parse(dataAsString);
      if (parsedData instanceof Array) {
        const filteredData = getFilteredData(parsedData);
        setInputData(filteredData);
        setKey((prev) => prev + 1);
      }
    } catch (e) {
      alert(e, "Please Input the data in correct format");
    }
  }, []);

  const onDimensionChange = useCallback(({ height, width }) => {
    setCloudDimensions((prev) => {
      const isEqual = height === prev.height && width === prev.width;
      return height > 0 && width > 0 && !isEqual ? { height, width } : prev;
    });
    setKey((prev) => prev + 1);
  }, []);

  return { key, inputData, cloudDimensions, onDataChange, onDimensionChange };
};

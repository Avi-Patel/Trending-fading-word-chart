import { useCallback } from "react";

const percentageToDimensionMap = {
  25: { width: 376, height: 238 },
  50: { width: 816, height: 418 },
  75: { width: 1256, height: 418 },
  100: { width: 1696, height: 418 }
};

const PercentageButton = ({
  handleDimensionChange,
  isActivated,
  percentage
}) => {
  const handleClick = useCallback(() => handleDimensionChange(percentage), [
    handleDimensionChange,
    percentage
  ]);
  return (
    <button
      style={{
        padding: "8px 16px",
        margin: "8px",
        backgroundColor: isActivated ? "grey" : "white",
        color: isActivated ? "white" : "black",
        fontWeight: 600,
        border: "1px solid grey",
        borderRadius: "8px",
        cursor: "pointer"
      }}
      onClick={handleClick}
    >
      {percentage}%
    </button>
  );
};

export const DimensionButtons = ({ currentDimensions, onDimensionChange }) => {
  const handleDimensionChange = useCallback(
    (percentage) => {
      onDimensionChange(percentageToDimensionMap[percentage]);
    },
    [onDimensionChange]
  );

  const { height: currentHeight, width: currentWidth } = currentDimensions;

  return (
    <>
      {Object.keys(percentageToDimensionMap).map((key) => {
        const { height, width } = percentageToDimensionMap[key];
        return (
          <PercentageButton
            key={key}
            percentage={key}
            isActivated={height === currentHeight && width === currentWidth}
            handleDimensionChange={handleDimensionChange}
          />
        );
      })}
    </>
  );
};

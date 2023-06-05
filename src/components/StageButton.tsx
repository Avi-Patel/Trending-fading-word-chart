export const StageButton = ({ index, text, stage, onStageChange }) => {
  return (
    <button
      onClick={() => onStageChange(index)}
      style={{
        backgroundColor: stage === index ? "green" : "grey",
        padding: "8px 8px",
        borderRadius: "4px",
        margin: "2px 10px",
        border: "none",
        cursor: "pointer",
        color: "white"
      }}
    >
      {text}
    </button>
  );
};

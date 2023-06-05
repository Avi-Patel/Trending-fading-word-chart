import { StageButton } from "./StageButton";

const indexToStageNameMap = {
  1: "Initial placing",
  2: "Apply repositioning",
  3: "Remove overlap"
};

export const StagesRenderer = ({ stage, onStageChange }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        marginTop: "20px"
      }}
    >
      {[...Array(3)].map((_, index) => {
        return (
          <StageButton
            key={index}
            index={index + 1}
            text={indexToStageNameMap[index + 1]}
            stage={stage}
            onStageChange={onStageChange}
          ></StageButton>
        );
      })}
    </div>
  );
};

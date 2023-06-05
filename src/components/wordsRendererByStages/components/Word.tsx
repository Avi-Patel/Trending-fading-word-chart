export const Word = ({
  text,
  size,
  color,
  x,
  y,
  dominantBaseline = "middle"
}) => {
  return (
    <text
      style={{
        fontWeight: 500,
        fontSize: `${size}px`
      }}
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline={dominantBaseline}
      fill={color}
    >
      {text}
    </text>
  );
};

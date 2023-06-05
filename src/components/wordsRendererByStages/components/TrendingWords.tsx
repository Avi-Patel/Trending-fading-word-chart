import { Word } from "./Word";

export const TrendingWords = ({ words, fontScale, colorScale }) => {
  return words.map((word, index) => {
    const {
      datum,
      dimension: { x, y, height, width }
    } = word;

    return (
      <Word
        key={`${word.dimension.x}_${word.dimension.y}_${index}`}
        x={x + width / 2}
        y={y + height / 2}
        text={datum.word}
        color={colorScale(datum.trendScore)}
        size={fontScale(datum.count) as number}
      />
    );
  });
};

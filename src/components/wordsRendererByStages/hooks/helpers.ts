const SLOT_SIZE = 28;

const getSlotsByYValue = (data, yScale) =>
  data
    .reduce((acc, datum, index) => {
      const slotNumber = Math.floor(yScale(datum.trendScore) / SLOT_SIZE);
      if (!acc[slotNumber]) {
        acc[slotNumber] = [{ datum, index }];
      } else {
        acc[slotNumber].push({ datum, index });
      }
      return acc;
    }, [])
    .filter(Boolean);

const getTotalSlotWidth = (slot, wordsDimension) =>
  slot.reduce((acc, datumWithIndex) => {
    const index = datumWithIndex.index;
    return acc + wordsDimension[index].width;
  }, 0);

const getDatumIndexToXPosition = (
  slot,
  wordsDimension,
  innerDimensions,
  gap = 0
) => {
  let currentX = gap;
  return slot
    .sort((d1, d2) => d2.datum.trendScore - d1.datum.trendScore)
    .reduce((acc, datumWithIndex) => {
      const index = datumWithIndex.index;
      const width = wordsDimension[index].width;

      const xPosition = currentX + width > innerDimensions.width ? 0 : currentX;
      acc[index] = xPosition;
      currentX = xPosition + width + gap;

      return acc;
    }, {});
};

export const getIndexToXPositionMap = ({
  data,
  yScale,
  wordsDimension,
  innerDimensions
}) => {
  const slots = getSlotsByYValue(data, yScale);

  const indexToXPositionMap = slots.reduce((acc, slot) => {
    const totalSlotWidth = getTotalSlotWidth(slot, wordsDimension);
    const gap =
      Math.max(0, innerDimensions.width - totalSlotWidth) / (slot.length + 1);

    const datumIndexToXPosition = getDatumIndexToXPosition(
      slot,
      wordsDimension,
      innerDimensions,
      gap
    );
    return { ...acc, ...datumIndexToXPosition };
  }, {});

  return indexToXPositionMap;
};

export const getNodes = ({
  data,
  wordsDimension,
  indexToXPositionMap,
  yScale
}) =>
  data.map((datum, index) => ({
    id: index,
    ...wordsDimension[index],
    x: indexToXPositionMap[index],
    y: yScale(datum.trendScore) - wordsDimension[index].height / 2
  }));

export const getMaxYPadding = ({ data, scale, wordsDimension, height, key }) =>
  data.reduce(
    (acc, datum, index) => {
      const yCoord = scale(datum[key] as number);
      const wordDims = wordsDimension[index];

      const topPadding = Math.abs(Math.min(yCoord - wordDims.height / 2, 0));
      const bottomPadding = Math.abs(
        Math.max(yCoord + wordDims.height / 2 - height, 0)
      );
      return {
        maxTopYPadding: Math.max(acc.maxTopYPadding, topPadding),
        maxBottomYPadding: Math.max(acc.maxBottomYPadding, bottomPadding)
      };
    },
    { maxTopYPadding: 0, maxBottomYPadding: 0 } as {
      maxTopYPadding: number;
      maxBottomYPadding: number;
    }
  );

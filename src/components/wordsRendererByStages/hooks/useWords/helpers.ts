export const getRectMap = ({ data, nodes }) =>
  nodes.reduce((acc, node, index) => {
    const { id, ...dimension } = node;
    const rect = { dimension, priority: data[index].count };
    return { ...acc, [id]: rect };
  }, {});

export const getWordsFromNodes = ({ nodes, data }) =>
  nodes.map((node) => {
    const { id, ...dimension } = node;
    return { datum: data[id], dimension };
  });

export const isIntersectingRect = (dimension1, dimension2, margin) => {
  const { x: x1, y: y1, width: w1, height: h1 } = dimension1;
  const { x: x2, y: y2, width: w2, height: h2 } = dimension2;

  return !(
    x2 > x1 + w1 + margin ||
    x2 + w2 + margin < x1 ||
    y2 > y1 + h1 + margin ||
    y2 + h2 + margin < y1
  );
};

const RECT_MARGIN = 4;

const getSortedRectArrayFromMap = (registeredRects) =>
  Object.entries(registeredRects)
    .map(([key, rect]) => ({
      key,
      dimension: rect.dimension,
      priority: rect.priority
    }))
    .sort((a, b) => b.priority - a.priority);

export const getNonCollidingRect = ({
  registeredRects,
  rectMargin = RECT_MARGIN
}) => {
  const prioritySortedRects = getSortedRectArrayFromMap(registeredRects);

  const { rects } = prioritySortedRects.reduce(
    (acc, rectangle1, index1) => {
      const isIntersecting = acc.nonIntersectingIndexes.some((index2) => {
        const rect1Dimension = registeredRects[rectangle1.key].dimension;
        const rect2Dimension =
          registeredRects[prioritySortedRects[index2].key].dimension;

        return isIntersectingRect(rect1Dimension, rect2Dimension, rectMargin);
      });
      if (!isIntersecting) {
        acc.nonIntersectingIndexes.push(index1);
      }
      acc.rects[rectangle1.key] = { shouldRender: !isIntersecting };

      return acc;
    },
    { nonIntersectingIndexes: [], rects: {} }
  );
  return rects;
};

export const getsNonCollidingWords = ({ nodes, data }) => {
  const rectMap = getRectMap({ nodes, data });

  const idVsShouldRenderMap = getNonCollidingRect({
    registeredRects: rectMap,
    rectMargin: 6
  });

  const nonCollidingNodes = Object.keys(idVsShouldRenderMap).reduce(
    (acc, key) => {
      if (idVsShouldRenderMap[key].shouldRender) {
        return [...acc, { id: Number(key), ...rectMap[key].dimension }];
      }
      return acc;
    },
    []
  );

  return getWordsFromNodes({
    nodes: nonCollidingNodes,
    data
  });
};

const LEFT_RIGHT_PADDING = 4;

export const getValidX = (x, elWidth, containerWidth) =>
  Math.min(
    Math.max(x, LEFT_RIGHT_PADDING),
    containerWidth - elWidth - LEFT_RIGHT_PADDING
  );

export const getValidY = (y, elHeight, containerHeght) =>
  Math.min(Math.max(y, 0), containerHeght - elHeight);

import { useEffect, useState, useMemo } from "react";

import {
  getValidX,
  getValidY,
  getWordsFromNodes,
  getsNonCollidingWords
} from "./helpers";
import { collisionResolverForce } from "./collisionResolverForce";

export const useWords = ({ data, nodes, innerDimensions, stage }) => {
  const [simulatedNodes, setSimulatedNodes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const forceSimulation = collisionResolverForce({
      data: nodes,
      width: innerDimensions.width,
      height: innerDimensions.height,
      yPadding: 8
    });

    for (let i = 0, n = 100; i < n; i += 1) {
      forceSimulation.tick();
    }

    const newNodes = forceSimulation.nodes();
    const updatedData = newNodes.map((node) => ({
      ...node,
      y: getValidY(node.y, node.height, innerDimensions.height),
      x: getValidX(node.x, node.width, innerDimensions.width)
    }));
    setSimulatedNodes(updatedData);
    setLoading(false);
  }, [nodes, innerDimensions, stage]);

  const nonCollidingWords = useMemo(
    () =>
      stage === 2
        ? getWordsFromNodes({ nodes: simulatedNodes, data })
        : getsNonCollidingWords({ nodes: simulatedNodes, data }),
    [simulatedNodes, data, stage]
  );

  return { words: nonCollidingWords, loading };
};

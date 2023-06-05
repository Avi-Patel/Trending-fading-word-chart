import * as d3QuadTree from "d3-quadtree";
import * as d3Force from "d3-force";

function y(d) {
  return d.y + d.vy + d.height / 2;
}

function x(d) {
  return d.x + d.vx + d.width / 2;
}

function collide({ xPadding = 10, yPadding = 10 }) {
  let nodes,
    strength = 1.5,
    iterations = 10,
    xMin,
    xMax,
    yMin,
    yMax;

  function clampVX(center, size, v) {
    if (xMin != null && center - size / 2 < xMin) {
      return 0;
    }

    if (xMax != null && center + size / 2 > xMax) {
      return 0;
    }

    return v;
  }

  function clampVY(center, size, v) {
    if (yMin != null && center - size / 2 < yMin) {
      return 0;
    }

    if (yMax != null && center + size / 2 > yMax) {
      return 0;
    }

    return v;
  }

  function force() {
    let i,
      n = nodes.length,
      tree,
      node,
      nodeXCenter,
      nodeYCenter,
      nodeWidth,
      nodeHeight,
      nodeArea;

    for (let k = 0; k < iterations; ++k) {
      tree = d3QuadTree.quadtree(nodes, x, y);
      for (i = 0; i < n; ++i) {
        node = nodes[i];
        nodeWidth = node.width;
        nodeHeight = node.height;
        nodeArea = nodeWidth * nodeHeight;
        nodeXCenter = node.x + node.width / 2 + node.vx;
        nodeYCenter = node.y + node.height / 2 + node.vy;
        // eslint-disable-next-line
        tree.visit(apply);
      }
    }

    function apply(quad) {
      let data = quad.data,
        quadWidth = data?.width,
        quadHeight = data?.height,
        quadArea = quadWidth * quadHeight;
      let updated = false;
      if (data) {
        if (data.index > node.index) {
          let quadXCenter = data.x + quadWidth / 2 + data.vx;
          let quadYCenter = data.y + quadHeight / 2 + data.vy;
          let xDistanceBetweenCenters = Math.abs(nodeXCenter - quadXCenter);
          let yDistanceBetweenCenters = Math.abs(nodeYCenter - quadYCenter);
          let xThresholdDistance = nodeWidth / 2 + quadWidth / 2 + xPadding;
          let yThresholdDistance = nodeHeight / 2 + quadHeight / 2 + yPadding;

          if (
            xDistanceBetweenCenters < xThresholdDistance &&
            yDistanceBetweenCenters < yThresholdDistance
          ) {
            let xOverlap = xThresholdDistance - xDistanceBetweenCenters;
            let yOverlap = yThresholdDistance - yDistanceBetweenCenters;

            let xNodeMove =
              (xOverlap / xThresholdDistance) *
              (quadArea / (nodeArea + quadArea));
            let yNodeMove =
              (yOverlap / yThresholdDistance) *
              (quadArea / (nodeArea + quadArea));
            let xQuadMove =
              (xOverlap / xThresholdDistance) *
              (1 - quadArea / (nodeArea + quadArea));
            let yQuadMove =
              (yOverlap / yThresholdDistance) *
              (1 - quadArea / (nodeArea + quadArea));

            let nodeVX = nodeXCenter < quadXCenter ? -yNodeMove : yNodeMove;
            let nodeVY = nodeYCenter < quadYCenter ? -xNodeMove : xNodeMove;
            let quadVX = nodeXCenter < quadXCenter ? yQuadMove : -yQuadMove;
            let quadVY = nodeYCenter < quadYCenter ? xQuadMove : -xQuadMove;

            node.vx = clampVX(nodeXCenter, nodeWidth, node.vx + nodeVX);
            node.vy = clampVY(nodeYCenter, nodeHeight, node.vy + nodeVY);
            data.vx = clampVX(quadXCenter, quadWidth, data.vx + quadVX);
            data.vy = clampVY(quadYCenter, quadHeight, data.vy + quadVY);
            updated = true;
          }
        }
        return;
      }
      return updated;
    }
  }

  force.initialize = function (_nodes) {
    nodes = _nodes;
  };

  force.iterations = function (_) {
    return arguments.length ? ((iterations = +_), force) : iterations;
  };

  force.strength = function (_) {
    return arguments.length ? ((strength = +_), force) : strength;
  };

  force.nodes = function (_) {
    if (_) {
      nodes = _;
      return force;
    }

    return nodes;
  };

  force.bounds = function (_xMin, _xMax, _yMin, _yMax) {
    xMin = _xMin;
    xMax = _xMax;
    yMin = _yMin;
    yMax = _yMax;
    return force;
  };

  return force;
}

// type Datum = {
//   id: string;
//   x: number;
//   y: number;
//   height: number;
//   width: number;
//   fx?: number;
//   fy?: number;
// };

export const collisionResolverForce = ({
  data,
  height,
  width,
  xPadding = 10,
  yPadding
}) => {
  const sim = d3Force.forceSimulation();
  sim
    .nodes(data)
    .force(
      "collide",
      collide({ xPadding, yPadding }).bounds(0, width, 0, height)
    )
    .stop();

  return sim;
};

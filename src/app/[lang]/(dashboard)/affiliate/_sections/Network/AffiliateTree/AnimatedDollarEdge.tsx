import { BaseEdge, type EdgeProps, getSmoothStepPath } from "@xyflow/react";
import type { FC } from "react";

const AnimatedDollarEdge: FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
}) => {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <svg width="0" height="0">
        <defs>
          <marker
            id="arrowClosed"
            markerWidth="8"
            markerHeight="8"
            refX="0.5"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
            style={{ zIndex: 230 }}
          >
            <path d="M0,0 L0,6 L6,3 z" fill="#FF008A" />
          </marker>
        </defs>
      </svg>

      <BaseEdge id={id} path={edgePath} style={style} markerEnd="url(#arrowClosed)" />

      <svg width="0" height="0">
        <text fontSize="16" fill="#fff" dy="5" dx="-5">
          $
          <animateMotion dur="5s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1">
            <mpath href={`#${id}`} />
          </animateMotion>
        </text>
      </svg>
    </>
  );
};

export default AnimatedDollarEdge;

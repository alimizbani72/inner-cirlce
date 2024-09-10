import { useCallback, useState, useEffect, useMemo, type FC } from "react";
import {
  ReactFlow,
  type Edge,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  ConnectionLineType,
  BackgroundVariant,
} from "@xyflow/react";
import AnimatedDollarEdge from "./AnimatedDollarEdge";
import CustomNode from "./CustomNode";
import type { AffiliateNode, AffiliateTreeProps } from "./types";
import { getLayoutedElements, mapDataToFlowElements } from "./functions";
import { initialEdges, initialNodes } from "./consts";
import { Box } from "@mui/material";

const AffiliateTree: FC<AffiliateTreeProps> = ({ data }) => {
  const [nodes, setNodes] = useState<AffiliateNode[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback((changes: any[]) => setNodes((nds) => applyNodeChanges(changes, nds)), []);

  const onEdgesChange = useCallback((changes: any[]) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);

  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);
  const edgeTypes = useMemo(() => ({ animatedSvg: AnimatedDollarEdge }), []);

  useEffect(() => {
    const { nodes, edges } = mapDataToFlowElements(data);

    const layoutedElements = getLayoutedElements(nodes, edges);
    setNodes(layoutedElements.nodes);
    setEdges(layoutedElements.edges);
  }, [data]);

  return (
    <Box sx={{ width: "100%", height: "600px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        connectionLineType={ConnectionLineType.SmoothStep}
        snapToGrid
      >
        <Controls />
        <Background gap={80} size={0.1} variant={BackgroundVariant.Cross} />
      </ReactFlow>
    </Box>
  );
};

export default AffiliateTree;

import { type Edge, Position } from "@xyflow/react";
import dagre from "dagre";
import { nodeHeight, nodeVerticalSpacing, nodeWidth } from "./consts";
import type { AffiliateNode } from "./types";

export const mapDataToFlowElements = (data: any, parentNodeId: string | null = null) => {
  const { id, username, children, avatar_url, plan_type, created_at, turnover } = data;
  const nodeId = `${id}`;
  const node: AffiliateNode = {
    id: nodeId,
    data: { username, avatar_url, plan_type, created_at, turnover, children, id },
    position: { x: 0, y: 0 }, // Position will be updated by dagre
    type: "customNode",
    width: nodeWidth,
    height: nodeHeight,
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  };

  const newEdges = parentNodeId
    ? [
        {
          id: `e${parentNodeId}-${nodeId}`,
          source: parentNodeId,
          target: nodeId,
          type: "animatedSvg",
          animated: true,
          style: { stroke: "#FF008A", strokeWidth: 2, strokeDasharray: "10 1" },
        },
      ]
    : [];

  const childNodes = children.map((child: any) => mapDataToFlowElements(child, nodeId));

  return {
    nodes: [node, ...childNodes.flatMap((n: any) => n.nodes)],
    edges: [...newEdges, ...childNodes.flatMap((n: any) => n.edges)],
  };
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

export const getLayoutedElements = (nodes: AffiliateNode[], edges: Edge[]) => {
  dagreGraph.setGraph({ rankdir: "TB", nodesep: nodeVerticalSpacing });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  let graphWidth = 0;
  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };
    graphWidth = Math.max(graphWidth, nodeWithPosition.x);
    node.data = { ...node.data };
  });
  const rootNode = nodes[0];
  if (rootNode) {
    rootNode.position.x = graphWidth / 2 - nodeWidth / 2;
  }
  return { nodes, edges };
};

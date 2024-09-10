import type { Node } from "@xyflow/react";

export type AffiliateNodeData = {
  id: number;
  username: string;
  avatar_url?: string;
  plan_type?: string;
  created_at?: string;
  turnover?: { value: string };
  children?: AffiliateNodeData[];
};

export type AffiliateNode = Node<AffiliateNodeData>;

export type CustomNodeProps = {
  data: AffiliateNodeData;
  isConnectable: boolean;
};

export type AffiliateTreeProps = {
  data: any;
};

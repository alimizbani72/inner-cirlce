export type CMSBaseBlock = {
  id?: string | null;
  blockName?: string | null;
};

export type BlockText = CMSBaseBlock & {
  blockType: "blockText";
  content: Array<Record<string, unknown>>;
};
export type Media = {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
};
export type BlockImage = CMSBaseBlock & {
  blockType: "blockImage";
  image: number | Media;
};

export type CMSBlock = BlockText | BlockImage;

export type LayoutType = {
  layout?: CMSBlock[] | null;
};

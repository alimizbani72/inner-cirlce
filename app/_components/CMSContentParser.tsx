import { Image } from "@/components/image";
import { CMSDownloadURL } from "@/consts";
import { convertRichTextToHTML } from "@/utils/convertRichTextToHTML";
import { type FC, Fragment } from "react";
import type { Descendant } from "slate";
import ContentParser from "./ContentParser";
export type Media = {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
};
export type CMSBaseBlock = {
  id?: string | null;
  blockName?: string | null;
  blockType: string;
};

export type BlockText = CMSBaseBlock & {
  blockType: "blockText";
  content: Array<Record<string, unknown>>;
};

export type BlockImage = CMSBaseBlock & {
  blockType: "blockImage";
  image: number | Media;
};

export type CMSBlock = BlockText | BlockImage;

export type LayoutType = {
  layout?: CMSBlock[] | null;
};

const CMSContentParser: FC<LayoutType> = ({ layout }: LayoutType) => {
  return layout?.map((layout) => {
    if (layout.blockType === "blockImage") {
      const media = layout.image as Media;

      const isLocal = media?.url?.startsWith("/");

      const src = isLocal ? media.url : CMSDownloadURL(media.url);

      return (
        <Fragment key={layout.id}>
          <Image src={src} maxWidth="100%" />
        </Fragment>
      );
    }

    return (
      <Fragment key={layout.id}>
        <ContentParser
          content={convertRichTextToHTML(
            layout?.content as unknown as Descendant[],
          )}
        />
      </Fragment>
    );
  });
};
export default CMSContentParser;

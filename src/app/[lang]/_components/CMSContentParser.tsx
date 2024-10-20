import Image from "@/components/Image";
import { Fragment, type FC } from "react";
import ContentParser from "./ContentParser";
import { CMSDownloadURL } from "@/consts";
import { convertRichTextToHTML } from "@/utils/convertRichTextToHTML";
import type { media } from "@cms/requests";
import type { Descendant } from "slate";

export type LayoutType = {
  layout?: Array<
    | {
        content: Array<{
          [key: string]: unknown;
        }>;
        id?: string | null;
        blockName?: string | null;
        blockType: "blockText";
      }
    | {
        image: number | media;
        id?: string | null;
        blockName?: string | null;
        blockType: "blockImage";
      }
  > | null;
};

const CMSContentParser: FC<LayoutType> = ({ layout }: LayoutType) => {
  return layout?.map((layout) => (
    <Fragment key={layout.id}>
      {layout.blockType === "blockImage" ? (
        <Image src={CMSDownloadURL((layout?.image as media)?.url!)} maxWidth="100%" />
      ) : (
        <ContentParser content={convertRichTextToHTML(layout?.content as unknown as Descendant[])} />
      )}
    </Fragment>
  ));
};

export default CMSContentParser;

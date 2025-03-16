import { Fragment, type FC } from 'react';
import ContentParser from './ContentParser';
import { CMSDownloadURL } from '@/consts';
import { convertRichTextToHTML } from '@/utils/convertRichTextToHTML';
import type { Descendant } from 'slate';
import { Image } from '@/components/image';
import type { Media } from '@/services/cms/chainmindCms.schemas';

export type LayoutType = {
  layout?: Array<
    | {
        content: Array<{
          [key: string]: unknown;
        }>;
        id?: string | null;
        blockName?: string | null;
        blockType: 'blockText';
      }
    | {
        image: number | Media;
        id?: string | null;
        blockName?: string | null;
        blockType: 'blockImage';
      }
  > | null;
};

const CMSContentParser: FC<LayoutType> = ({ layout }: LayoutType) => {
  return layout?.map((layout) => (
    <Fragment key={layout.id}>
      {layout.blockType === 'blockImage' ? (
        <Image src={CMSDownloadURL((layout?.image as Media)?.url!)} maxWidth="100%" />
      ) : (
        <ContentParser
          content={convertRichTextToHTML(layout?.content as unknown as Descendant[])}
        />
      )}
    </Fragment>
  ));
};

export default CMSContentParser;

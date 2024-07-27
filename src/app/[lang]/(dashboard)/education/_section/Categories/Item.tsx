import Image from "@/components/Image";
import Link from "@/components/Link";
import { flexItem } from "@/utils/grid";
import { Box, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import { useTranslate } from "@/locales";
import { CMSDownloadURL } from "@/consts";

type Props = { content: { [k: string]: any } };

const CategoryItem: FC<Props> = ({ content }) => {
  const { t } = useTranslate();

  return (
    <Stack
      borderRadius={2}
      border="1.5px solid"
      borderColor={"dark.3"}
      overflow={"hidden"}
      sx={flexItem({ count: { lg: 4, md: 2 }, gap: 24 })}
    >
      <Box sx={{ flexBasis: 1 }}>
        <Image src={CMSDownloadURL(content.banner)} objectFit="cover" width={"100%"} height={"100%"} ratio="1/1" />
      </Box>

      <Stack
        gap={3}
        p={2}
        bgcolor={"dark.3"}
        alignItems={"flex-start"}
        sx={{ height: "100%" }}
        justifyContent={"space-between"}
      >
        <Stack gap={1}>
          <Typography variant="p1-medium">{content.title}</Typography>
          <Typography variant="caption-medium" color={"grey.light"}>
            {content.description}
          </Typography>
        </Stack>

        <Link href={encodeURIComponent(content.title)} display={"flex"}>
          <Typography variant="p2-medium" color={"pink.light"} sx={{ cursor: "pointer" }}>
            {t("categoryItem.moreDetails")}
          </Typography>
        </Link>
      </Stack>
    </Stack>
  );
};

export default CategoryItem;

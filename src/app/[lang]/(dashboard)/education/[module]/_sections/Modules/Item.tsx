import Image from "@/components/Image";
import Link from "@/components/Link";
import { snipText } from "@/utils/string";
import { Box, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import { Icon } from "@/components/icons";

type Props = { content: { [k: string]: any } };

const ModuleItem: FC<Props> = ({ content }) => {
  return (
    <Stack
      borderRadius={2}
      border="1.5px solid"
      borderColor={"dark.3"}
      overflow={"hidden"}
      direction={{ md: "row", xs: "column" }}
      component={Link}
      href={encodeURIComponent(content.title)}
    >
      <Box height={"104px"} width={{ md: "182px", xs: "100%" }}>
        <Image src={content.image || "/logo/logo-type.svg"} objectFit="contain" width={"100%"} height={"100%"} />
      </Box>

      <Stack
        gap={1}
        flex={1}
        p={{ md: 3, xs: 2 }}
        direction={"row"}
        alignItems={"center"}
        borderLeft="1.5px solid"
        borderColor={"dark.3"}
        justifyContent="space-between"
      >
        <Stack gap={1}>
          <Typography variant="p1-medium">{content.title}</Typography>
          <Typography variant="caption-medium" color={"grey.light"} sx={snipText(1)}>
            {content.description}
          </Typography>
        </Stack>

        <Stack>
          <Icon name="Arrow-right" />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ModuleItem;

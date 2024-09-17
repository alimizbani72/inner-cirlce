import { Icon } from "@/components/icons";
import Link from "@/components/Link";
import { Stack, Typography } from "@mui/material";

type TelegramBannerProps = {
  logo: string;
  linkUrl: string;
  linkText: string;
  bannerText: string;
};

const TelegramBanner = ({ logo, bannerText }: TelegramBannerProps) => {
  return (
    <Stack
      direction={"row"}
      position={"relative"}
      width={"100%"}
      justifyContent={"space-between"}
      sx={{
        borderBottom: "1.5px solid",
        borderColor: "dark.3",
      }}
    >
      <Stack direction={"row"} alignItems={"center"}>
        <img src="/assets/svg/leftCloud.svg" width={100} height={56} />
        <Stack position={"absolute"} left={32} top={16}>
          <img src={logo} width={24} height={24} alt="" />
          {/* "/assets/svg/telegramlogo.svg" */}
        </Stack>
        <Stack direction={"row"} position={"absolute"} left={68} top={16}>
          <Typography>
            {/* Join our premium telegram channel! */}
            {bannerText}
          </Typography>
          <img src="/assets/svg/king.svg" alt="" />
        </Stack>
      </Stack>
      <Stack>
        <Stack position={"absolute"} right={18} top={16} direction={"row"} spacing={1}>
          <Link href={"/pricing"} color={"white"}>
            Get the link
          </Link>
          <Icon name="Arrow-right" />
        </Stack>
        <img src="/assets/svg/rightCloud.svg" width={100} height={56} />
      </Stack>
    </Stack>
  );
};

export default TelegramBanner;

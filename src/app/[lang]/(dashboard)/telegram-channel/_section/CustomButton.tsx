import Link from "@/components/Link";
import { Icon } from "@/components/icons";
import type { iconsType } from "@/components/icons/iconsNames";
import { Box, Button } from "@mui/material";
const buttonStyle = {
  position: "relative",
  zIndex: 1,
  textWrap: "nowrap",
  overflow: "hidden",
  width: "100%",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
    linear-gradient(to right, 
      rgba(86, 92, 228, 0.64) 0%,     
      rgba(86, 92, 228, 0.64) 20%,     
      transparent 20%,                  
      transparent 80%,                
      rgba(255, 64, 157, 0.64) 80%,   
      rgba(255, 64, 157, 0.64) 100%) 
    no-repeat`,
    filter: "blur(40px)",
    zIndex: -1,
    boxShadow: "0px 16px 32px 0px rgba(0, 0, 0, 0.24)",
  },
};
const buttonContainerStyle = {
  position: "relative",
  display: "inline-block",
  padding: "1.5px",
  borderRadius: "28px",
  background: `linear-gradient(to right, 
  #779DFF 0%,   
  #779DFF 15%,  
  rgba(255, 64, 157, 0.64) 50%, 
  rgba(255, 64, 157, 0.64) 100%) no-repeat`,

  boxSizing: "border-box",
};
type CustomButtonProps = {
  loading?: boolean;
  onClick?: () => void;
  buttonText: string;
  iconName: iconsType;
  href?: string;
};

const CustomButton = ({ buttonText, iconName, href, onClick }: CustomButtonProps) => {
  return (
    <Box sx={buttonContainerStyle}>
      {href ? (
        <Button
          LinkComponent={Link}
          href={href}
          rel="nofollow noopener noreferrer external"
          target="_blank"
          color="info"
          size="large"
          sx={buttonStyle}
        >
          <Box pr={1}>
            <Icon name={iconName} />
          </Box>
          {buttonText}
        </Button>
      ) : (
        <Button color="info" size="large" sx={buttonStyle} onClick={onClick}>
          <Box pr={1}>
            <Icon name={iconName} />
          </Box>
          {buttonText}
        </Button>
      )}
    </Box>
  );
};

export default CustomButton;

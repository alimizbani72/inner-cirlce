import { Icon } from "@/components/icons";
import Image from "@/components/Image";
import { Typography } from "@mui/material";
import { packageOptions } from "../../consts";

interface PackageHandlerProps {
  plan: string;
  name: string;
}

const PackageHandler = ({ name, plan }: PackageHandlerProps) => {
  return (
    <Typography variant="p2-medium" display="flex" alignItems="center">
      <Image src={packageOptions?.find((pack) => pack.value === plan)?.img} sx={{ width: 24, height: 24 }} alt={plan} />{" "}
      {!name && <Icon name="lock" />}
    </Typography>
  );
};

export default PackageHandler;

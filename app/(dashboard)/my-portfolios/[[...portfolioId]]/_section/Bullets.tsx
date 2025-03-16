import { Box } from '@mui/material';
type Props = {
  bgcolor: string;
};
const Bullets = ({ bgcolor }: Props) => {
  return <Box sx={{ width: '8px', height: '8px', borderRadius: '50%', bgcolor: bgcolor }} />;
};

export default Bullets;

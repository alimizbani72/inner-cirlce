import { Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CustomSelect = styled(Select)(({ theme }) => ({
  backgroundColor: theme.palette.dark[2],
  color: '#fff',
  '& .MuiSelect-icon': {
    color: '#fff',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
}));

export const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  backgroundColor: theme.palette.dark[2],
  color: '#fff',
  '&:hover': {
    backgroundColor: '#333',
  },
  '&.Mui-selected': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  '& .MuiListItemText-primary': {
    color: '#fff',
  },
}));

import {
  Checkbox as MUICheckbox,
  type CheckboxProps,
  type SvgIconProps,
  SvgIcon,
} from '@mui/material';

export const CheckboxIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <rect
      x="0.751953"
      y="0.75"
      width="22.5"
      height="22.5"
      rx="3.25"
      fill="#E7E9F6"
      stroke="#B7C0D3"
      strokeWidth="1.5"
    />
  </SvgIcon>
);

export const CheckboxCheckedIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <path
      fill="#00B1B1"
      d="M17 2a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm-1.625 7.255-4.13 4.13-1.75-1.75a.881.881 0 0 0-1.24 0c-.34.34-.34.89 0 1.24l2.38 2.37c.17.17.39.25.61.25.23 0 .45-.08.62-.25l4.75-4.75c.34-.34.34-.89 0-1.24a.881.881 0 0 0-1.24 0Z"
    />
  </SvgIcon>
);

export const CheckboxIndeterminateIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <path d="M17,2 C19.7614,2 22,4.23858 22,7 L22,7 L22,17 C22,19.7614 19.7614,22 17,22 L17,22 L7,22 C4.23858,22 2,19.7614 2,17 L2,17 L2,7 C2,4.23858 4.23858,2 7,2 L7,2 Z M15,11 L9,11 C8.44772,11 8,11.4477 8,12 C8,12.5523 8.44772,13 9,13 L15,13 C15.5523,13 16,12.5523 16,12 C16,11.4477 15.5523,11 15,11 Z" />
  </SvgIcon>
);
const Checkbox = (props: CheckboxProps) => (
  <MUICheckbox
    size="small"
    icon={<CheckboxIcon />}
    checkedIcon={<CheckboxCheckedIcon />}
    indeterminateIcon={<CheckboxIndeterminateIcon />}
    {...props}
  />
);

export default Checkbox;

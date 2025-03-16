import { RHFTextField } from '@/components/hook-form';
import Icon from '@/components/icon';
import { IconButton } from '@mui/material';
import { type FC, useState } from 'react';

type InputEditorProps = {
  placeholder?: string;
  name: string;
  onSave: VoidFunction;
  label: string;
};

const InputEditor: FC<InputEditorProps> = ({ placeholder, name, onSave, label }) => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <RHFTextField
      name={name}
      label={label}
      placeholder={placeholder}
      slotProps={{
        input: {
          readOnly: !isEdit,
          endAdornment: (
            <IconButton
              onClick={() => {
                onSave?.();
                setIsEdit((prev) => !prev);
              }}
            >
              <Icon name={isEdit ? 'CheckIcon' : 'PenIcon'} />
            </IconButton>
          ),
        },
      }}
    />
  );
};

export default InputEditor;

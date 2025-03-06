import { InputLabel, Stack, TextField } from '@mui/material';
import type {
  AutocompleteProps as AutocompletePropsMui,
  AutocompleteRenderInputParams,
} from '@mui/material/Autocomplete';
import Autocomplete from '@mui/material/Autocomplete';
import { Fragment, type KeyboardEvent, type ReactNode } from 'react';

export interface AutoCompleteProps
  extends Omit<AutocompletePropsMui<any, boolean, boolean, boolean>, 'onChange' | 'renderInput'> {
  onChange: (value: any[]) => void;
  renderValue?: (value: any) => ReactNode;
  renderInput?: (params: AutocompleteRenderInputParams) => ReactNode;
  placeholder?: string;
}

export const AutoComplete = (props: AutoCompleteProps) => {
  const {
    title,
    onChange,
    getOptionLabel,
    renderInput,
    renderValue,
    multiple,
    value,
    placeholder,
    options,
    renderOption,
    ...rest
  } = props;

  return (
    <Stack>
      {title && (
        <InputLabel
          sx={{
            typography: 'caption-semi-bold',
            textTransform: 'uppercase',
            color: 'white',
            mb: 1,
          }}
        >
          {title}
        </InputLabel>
      )}
      <Autocomplete
        multiple={multiple}
        fullWidth
        value={value}
        options={options}
        onChange={(event, newValue, reason) => {
          if (
            event.type === 'keydown' &&
            ((event as KeyboardEvent).key === 'Backspace' ||
              (event as KeyboardEvent).key === 'Delete') &&
            reason === 'removeOption'
          ) {
            return;
          }
          onChange(newValue);
        }}
        renderTags={() => null}
        getOptionLabel={getOptionLabel ? getOptionLabel : (option) => option.label}
        slotProps={{
          paper: {
            sx: {
              boxShadow: '0px 4px 16px 0px rgba(10, 10, 17, 0.08)',
              bgcolor: 'dark.3',
              color: 'common.white',
              my: 0.75,
            },
          },
        }}
        renderInput={
          renderInput
            ? renderInput
            : (params) => (
                <TextField
                  ref={params.InputProps.ref}
                  {...params}
                  fullWidth
                  sx={{ '.MuiInputBase-root': { pr: '9px !important', py: '2px !important' } }}
                  placeholder={placeholder}
                  value={value}
                />
              )
        }
        renderOption={renderOption}
        {...rest}
      />

      {multiple && (
        <Stack direction="row" pt={1} gap={1} flexWrap="wrap">
          {value?.map((label: any, index: number) => (
            <Fragment key={index + '-value'}> {renderValue?.(label)}</Fragment>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

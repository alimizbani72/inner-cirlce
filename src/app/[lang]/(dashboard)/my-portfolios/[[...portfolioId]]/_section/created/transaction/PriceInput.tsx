"use client";
import { useEffect } from "react";
import { RHFTextField } from "@/components/hook-form";
import { useFormContext } from "react-hook-form";

type PriceInputProps = {
  perCoinPrice: any;
  isEditMode: boolean;
  topHelperText: string;
  name: string;
  label: string;
  placeholder?: string;
};

const PriceInput = ({ perCoinPrice, isEditMode, name, label, placeholder, topHelperText }: PriceInputProps) => {
  const { setValue } = useFormContext();

  useEffect(() => {
    if (perCoinPrice && !isEditMode) {
      const formattedPrice = Number(perCoinPrice).toFixed();
      setValue("price", formattedPrice);
    }
  }, [perCoinPrice, setValue, isEditMode]);

  return (
    <RHFTextField
      topHelperText={topHelperText}
      name={name}
      label={label}
      placeholder={placeholder}
      type="number"
      isMoney
    />
  );
};

export default PriceInput;

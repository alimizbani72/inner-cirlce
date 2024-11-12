"use client";
import { useEffect } from "react";
import { RHFTextField } from "@/components/hook-form";
import { useFormContext } from "react-hook-form";

type PriceInputProps = {
  perCoinPrice: any;
  isEditMode: boolean;
  name: string;
  label: string;
  placeholder?: string;
};

const PriceInput = ({ perCoinPrice, isEditMode, name, label, placeholder }: PriceInputProps) => {
  const { setValue } = useFormContext();

  useEffect(() => {
    if (perCoinPrice && !isEditMode) {
      setValue("price", perCoinPrice);
    }
  }, [perCoinPrice, setValue, isEditMode]);

  return <RHFTextField name={name} label={label} placeholder={placeholder} type="number" isMoney />;
};

export default PriceInput;

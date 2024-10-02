import CustomDialog from "@/components/CustomDialog";
import { RHFSelect, RHFTextField } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";
import { Icon } from "@/components/icons";
import Toggle from "@app/_components/Toggle";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import useToggleState from "@/hooks/use-toggle-state";
import DateAndTimeModal from "./DateAndTimeModal";
import { formatDateTime } from "@/utils/formatDateTime";
import NoteModal from "./NoteModal";
import CustomBadge from "./CustomBadge";
import { useTranslate } from "@/locales";
export const coins = [
  {
    id: 1,
    name: "Bitcoin",
    slug: "BTC",
    img: "/assets/svg/btc.svg",
    price: "45929.14",
  },
  {
    id: 2,
    name: "Etherium",
    slug: "ETH",
    img: "/assets/svg/eth.svg",
    price: "4592.14",
  },
  {
    id: 3,
    name: "Bnb",
    slug: "BNB",
    img: "/assets/svg/bnb.svg",
    price: "459.14",
  },
];

type TransactionModalProps = {
  open: boolean;
  close: VoidFunction;
};

const TransactionModal = ({ open, close }: TransactionModalProps) => {
  const { t } = useTranslate();
  const buttons = [
    { label: t("portfolioTransaction.buy"), value: 1 },
    { label: t("portfolioTransaction.sell"), value: 2 },
  ];

  const [btnValue, setBtnValue] = useState<any>(buttons[0].value);
  const [dateModalIsOpen, toggleDateAndTimeModal] = useToggleState();
  const [noteModalIsOpen, toggleNoteModal] = useToggleState();
  const [dateTime, setDateTime] = useState<{ date: Date | null; time: Date | null }>({ date: null, time: null });

  const UpdateUserSchema = useMemo(
    () =>
      Yup.object().shape({
        coins: Yup.number().required(),
        quantity: Yup.string().required(t("portfolioTransaction.quantityIsRequired")),
        price_per_coin: Yup.string(),
        fee: Yup.string().required(t("portfolioTransaction.feeIsRequired")),
      }),
    [t]
  );
  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues: {
      coins: 1,
      quantity: "",
      price_per_coin: "",
      fee: "",
    },
    mode: "onSubmit",
  });
  const handleButtonChange = (newValue: any) => {
    setBtnValue(newValue);
  };

  const { handleSubmit, watch, formState } = methods;
  const { isValid } = formState;
  const onSubmit = handleSubmit((data) => {
    const formattedDate = dateTime.date ? dateTime.date.toISOString().split("T")[0] : null;
    const formattedTime = dateTime.time
      ? dateTime.time.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : null;
    const transactionType = btnValue === 1 ? "buy" : "sell";
    const formData = {
      ...data,
      date: formattedDate,
      time: formattedTime,
      transactionType,
    };
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log("🚀 ~ data:", formData);
    close();
  });

  return (
    <CustomDialog fullWidth maxWidth="sm" onClose={close} aria-labelledby="Transaction-dialog" open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="Transaction-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4-semi-bold">{t("portfolioTransaction.addTransaction")}</Typography>
          <IconButton onClick={close}>
            <Icon name="Close" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />

      <DialogContent sx={{ p: 3 }}>
        <FormProvider methods={methods} onSubmit={onSubmit} sx={{ gap: 3 }}>
          <Toggle size="large" setValue={handleButtonChange} buttons={buttons} value={btnValue} width="100%" />
          <Stack>
            <RHFSelect name="coins" label={t("portfolioTransaction.coins")}>
              {coins.map((coin) => (
                <MenuItem key={coin.id} value={coin.id} sx={{ textTransform: "capitalize" }}>
                  <Stack direction={"row"} spacing={2}>
                    <img src={coin.img} />
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                      {coin.name}
                      <Typography variant="p2-medium" color={"grey.light"}>
                        {" "}
                        {coin.slug}
                      </Typography>
                    </Stack>
                  </Stack>
                </MenuItem>
              ))}
            </RHFSelect>
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <RHFTextField
              name="quantity"
              label={t("portfolioTransaction.quantity")}
              placeholder={t("portfolioTransaction.enterQuentity")}
              topHelperText={t("portfolioTransaction.topQuantityHelpText")}
            />
            <RHFTextField
              topHelperText={t("portfolioTransaction.topPricePerCoinHelpText")}
              value={coins[watch("coins") - 1].price}
              name="price_per_coin"
              label={t("portfolioTransaction.pricePerCoin")}
            />
          </Stack>

          <RHFTextField
            topHelperText={t("portfolioTransaction.topFeeHelpText")}
            name="fee"
            label={t("portfolioTransaction.fee")}
            placeholder={t("portfolioTransaction.enterTheFee")}
          />

          <Stack direction={"row"} spacing={1} flexWrap={"wrap"}>
            <CustomBadge
              icon="Clock"
              value={formatDateTime(dateTime.date, dateTime.time, t("portfolioTransaction.dateAndTime"))}
              onClick={toggleDateAndTimeModal}
            />

            <CustomBadge icon="Pen" value={t("portfolioTransaction.notes")} onClick={toggleNoteModal} />
          </Stack>
        </FormProvider>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Stack width={"100%"} direction={"row"} justifyContent={"space-between"}>
          <Stack>
            <Typography variant="p1-medium">$0</Typography>
            <Typography variant="caption-medium" color={"grey.light"}>
              {btnValue === 1 ? t("portfolioTransaction.totalSpent") : t("portfolioTransaction.totalReceived")}
            </Typography>
          </Stack>
          <Button onClick={onSubmit} size="large" disabled={!isValid}>
            {t("portfolioTransaction.addTransaction")}
          </Button>
        </Stack>
      </DialogActions>

      {dateModalIsOpen && (
        <DateAndTimeModal
          open={dateModalIsOpen}
          close={toggleDateAndTimeModal}
          onConfirm={(dateTime) => setDateTime(dateTime)}
          initialDateTime={dateTime}
        />
      )}
      {noteModalIsOpen && <NoteModal open={noteModalIsOpen} close={toggleNoteModal} />}
    </CustomDialog>
  );
};

export default TransactionModal;

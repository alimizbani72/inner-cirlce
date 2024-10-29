"use client";
import { useTranslate } from "@/locales";
import CustomBadge from "./CustomBadge";
import { formatDateTime } from "@/utils/formatDateTime";
import DateAndTimeModal from "./DateAndTimeModal";
import useToggleState from "@/hooks/use-toggle-state";
type Props = {
  onConfirm?: (date: any) => void;
  initialDate?: any;
};
const DateBadge = ({ initialDate, onConfirm }: Props) => {
  const { t } = useTranslate();
  const [dateModalIsOpen, toggleDateAndTimeModal] = useToggleState();
  return (
    <>
      <CustomBadge
        icon="Clock"
        value={formatDateTime(initialDate, t("portfolioTransaction.dateAndTime"))}
        onClick={toggleDateAndTimeModal}
      />
      {dateModalIsOpen && (
        <DateAndTimeModal
          open={dateModalIsOpen}
          close={toggleDateAndTimeModal}
          onConfirm={onConfirm}
          initialDate={initialDate}
        />
      )}
    </>
  );
};

export default DateBadge;

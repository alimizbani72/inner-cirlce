"use client";
import { useTranslate } from "@/locales";
import CustomBadge from "./CustomBadge";
import NoteModal from "./NoteModal";
import useToggleState from "@/hooks/use-toggle-state";
type Props = {
  onConfirm?: (note: string) => void;
  initialNote?: string;
};
const NoteBadge = ({ onConfirm, initialNote }: Props) => {
  const { t } = useTranslate();
  const [noteModalIsOpen, toggleNoteModal] = useToggleState();
  return (
    <>
      <CustomBadge icon="Pen" value={t("portfolioTransaction.notes")} onClick={toggleNoteModal} />
      {noteModalIsOpen && (
        <NoteModal open={noteModalIsOpen} close={toggleNoteModal} onConfirm={onConfirm} initialNote={initialNote} />
      )}
    </>
  );
};

export default NoteBadge;

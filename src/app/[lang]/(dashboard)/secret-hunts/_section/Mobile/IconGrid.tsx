import { Stack } from "@mui/material";
import type { FC } from "react";
import Image from "@/components/Image"; // Ensure Image component is correctly typed

interface IconBlock {
  id: number;
}

const iconBlocks1: IconBlock[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }];
const iconBlocks2: IconBlock[] = [{ id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 }];

const getIconSrc = (id: number, activeId: number): string => {
  if (id === 12) {
    return "12.svg";
  }

  if (id < activeId) {
    return `Gray ${id}.svg`;
  }

  if (id === activeId) {
    return `Pink ${id}.svg`;
  }

  return "Gray Lock.svg";
};

interface IconGridProps {
  activeNumber: number;
}

const IconGrid: FC<IconGridProps> = ({ activeNumber }) => {
  return (
    <Stack gap={2}>
      <Stack gap={1} direction="row">
        {iconBlocks1.map((block) => (
          <Image src={`/assets/svg/${getIconSrc(block.id, activeNumber)}`} alt={`icon-${block.id}`} key={block.id} />
        ))}
      </Stack>
      <Stack gap={1} direction="row">
        {iconBlocks2.map((block) => (
          <Image src={`/assets/svg/${getIconSrc(block.id, activeNumber)}`} alt={`icon-${block.id}`} key={block.id} />
        ))}
      </Stack>
    </Stack>
  );
};

export default IconGrid;

"use client";

import { type FC, useEffect, useRef } from "react";
import Player from "@vimeo/player";
import { Box, type BoxProps } from "@mui/material";

interface VimeoPlayerProps {
  videoId?: number;
  videoUrl?: string;
  width?: number;
  height?: number;
  sx?: BoxProps["sx"];
}

const VimeoPlayer: FC<VimeoPlayerProps> = ({
  videoId,
  videoUrl,
  width = 640,
  height = 360,
  sx,
}) => {
  const vimeoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (vimeoRef?.current) {
      const player = new Player(vimeoRef.current, {
        id: videoId,
        url: videoUrl,
        width: width,
        height: height,
        responsive: true,
        controls: true,
      });

      // Cleanup the player on component unmount
      return () => {
        player.destroy();
      };
    }
  }, [videoId, width, height]);

  return <Box ref={vimeoRef} sx={sx} />;
};

export default VimeoPlayer;

import { Icon } from "@/components/icons";
import { Box, Typography } from "@mui/material";
import { Avatar, Stack } from "@mui/material";
import { Handle, Position } from "@xyflow/react";
import { type FC, useState } from "react";
import type { CustomNodeProps } from "./types";
import { useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/features/user/userSlice";
import { toNumber } from "@/utils/toNumber";

const CustomNode: FC<CustomNodeProps> = ({ data, isConnectable }) => {
  const user = useAppSelector(selectUser);
  const isMine = toNumber(user?.id) === data.id;
  const [detailedView, setDetailedView] = useState(false);

  return (
    <Stack
      onClick={() => setDetailedView(!detailedView)}
      sx={{
        p: detailedView ? 2 : 3,
        borderRadius: 2,
        border: "1.5px solid",
        borderColor: detailedView ? "dark.3" : "dark.3",
        bgcolor: detailedView ? "dark.3" : "dark.2",
        width: "168px",
        height: "140px",
        cursor: "pointer",
      }}
      gap={1.5}
      justifyContent={detailedView ? "flex-start" : "center"}
      alignItems={detailedView ? "flex-start" : "center"}
    >
      {!isMine && (
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
          style={{ top: "-8px", background: "#FF008A", borderColor: "#FF008A" }}
        />
      )}
      {!detailedView ? (
        <>
          <Box sx={{ position: "relative" }}>
            {isMine && (
              <Box
                sx={{
                  display: "inline-flex",
                  padding: "2px 12px 0px 12px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  position: "absolute",
                  height: "20px",
                  top: -10,
                  zIndex: 2,
                  borderRadius: "12px",
                  background: (theme) => theme.palette.gradient.pink,
                }}
              >
                <Typography variant="caption-semi-bold">YOU</Typography>
              </Box>
            )}
            <Avatar sx={{ width: 56, height: 56 }} src={data.avatar_url}>
              {data.username.charAt(0)}
            </Avatar>
          </Box>

          <Typography variant="p2-medium" sx={{ textAlign: "center" }}>
            {data.username}
          </Typography>
        </>
      ) : (
        <>
          <Stack direction={"row"} gap={1}>
            <Icon name="Subscription" />
            <Typography variant="p2-medium">{data.plan_type}</Typography>
          </Stack>
          <Stack direction={"row"} gap={1}>
            <Icon name="Clock" />
            <Typography variant="p2-medium">{new Date(data.created_at!).toLocaleDateString()}</Typography>
          </Stack>
          <Stack direction={"row"} gap={1}>
            <Icon name="Money" />
            <Typography variant="p2-medium">${data.turnover?.value}</Typography>
          </Stack>
        </>
      )}
      {data.children && data.children.length > 0 && (
        <Handle
          type="source"
          position={Position.Bottom}
          isConnectable={isConnectable}
          style={{ background: "#070720", borderColor: "#FF008A" }}
        />
      )}
    </Stack>
  );
};

export default CustomNode;

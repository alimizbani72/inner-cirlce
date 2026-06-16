"use client";

import Icon from "@/components/icon";
import type { IconNames } from "@/components/icon/types";
import { useBoolean } from "@/hooks/use-boolean";
import { mobileMenuToggle } from "@/lib/features/menu/menuSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useAppRouter } from "@/routes/hooks";
import { normalize } from "@/utils/path";
import { SubMenuItem } from "@app-components/sidebar/Menu/SubMenuItem";
import { Box, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { usePathname } from "next/navigation";
import { type FC, useCallback } from "react";

export type ItemType = {
  path: string;
  name: string;
  items: ItemType[];
  mainSlug?: string;
};

export type MenuItemProps = {
  icon: IconNames;
  route: string | undefined;
  label: string;
  subItems?: ItemType[];
  isCollapsed?: boolean;
  mainSlug?: string;
};

export const activeStyle = {
  backgroundColor: "dark.3",
  borderColor: "dark.2",
  boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.16)",
};

const MenuItem: FC<MenuItemProps> = ({
  icon,
  label,
  subItems,
  route,
  isCollapsed,
  mainSlug: mainSlugProps,
}) => {
  const pathname = usePathname();
  const router = useAppRouter();
  const dispatch = useAppDispatch();
  const isDisabled = route === "education/";
  const isActive = useCallback(
    (path: string | undefined, mainSlug?: string) => {
      if (path === "education/") {
        return false;
      } // 🚫 never active

      return mainSlugProps || mainSlug
        ? pathname.includes(mainSlugProps || mainSlug || "")
        : normalize(pathname) === normalize(`/${path}`);
    },
    [pathname],
  );
  const open = useBoolean(
    !!subItems?.find((s) => isActive(s.path, s.mainSlug)),
  );

  if (subItems && !subItems.length) {
    return null;
  }

  const isActiveSubItem = !!subItems
    ?.flatMap((item) => (item?.items ? [item, ...item?.items] : item))
    ?.find((s) => isActive(s?.path, s.mainSlug));
  return (
    <Box>
      <ListItemButton
        sx={{
          ":hover": {
            backgroundColor: "unset",
          },
          borderRadius: 3,
          border: "1px solid",
          borderColor: "dark.1",
          opacity: isDisabled ? 0.5 : 1,
          pointerEvents: isDisabled ? "none" : "auto",
          cursor: isDisabled ? "not-allowed" : "pointer",
          ...(isActive(route) && activeStyle),
          ...(isActiveSubItem && {
            backgroundColor: "dark.1",
            borderColor: "dark.3",
            boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.16)",
          }),
        }}
        onClick={
          isDisabled
            ? undefined
            : Array.isArray(subItems)
              ? open.onToggle
              : () => {
                  if (!isActive(route)) {
                    router.push(`/${route ?? ""}`);
                  }

                  dispatch(mobileMenuToggle(false));
                }
        }
      >
        <ListItemIcon sx={{ mr: 0 }}>
          <Icon
            stroke={isActive(route) ? "" : "grey.light"}
            name={
              (isActiveSubItem || isActive(route)
                ? `${icon}fillIcon`
                : `${icon}Icon`) as IconNames
            }
          />
        </ListItemIcon>

        {!isCollapsed && (
          <ListItemText
            sx={{ ml: 1 }}
            slotProps={{
              primary: {
                variant: "p2-regular",
                color: (isActiveSubItem ? open.value : isActive(route))
                  ? "white"
                  : "grey.light",
              },
            }}
            primary={label}
          />
        )}
        {Array.isArray(subItems) &&
          !isCollapsed &&
          (open.value ? (
            <Icon name="ArrowUpIcon" />
          ) : (
            <Icon name="ArrowDownIcon" />
          ))}
      </ListItemButton>

      {Array.isArray(subItems) && (
        <SubMenuItem
          isActive={isActive}
          open={open?.value}
          subItems={subItems}
          isCollapsed={isCollapsed}
        />
      )}
    </Box>
  );
};

export default MenuItem;

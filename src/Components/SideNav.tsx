import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";

import React from "react";
export const SideNav: React.FC<{
  setOpen: any;
  open: boolean;
}> = ({ setOpen, open }) => {
  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon></SettingsIcon>
          </ListItemIcon>
          <ListItemText primary={"Settings"} />
        </ListItem>
      </List>
    </SwipeableDrawer>
  );
};

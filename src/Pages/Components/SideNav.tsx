import { SwipeableDrawer } from "@material-ui/core";
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
      <p>Not implemented</p>
    </SwipeableDrawer>
  );
};

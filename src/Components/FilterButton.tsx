import { Box, Paper, Tab, Tabs } from "@material-ui/core";
import React from "react";
import { Mode } from "./Graph";

export const FilterButton: React.FC<{
  setMode: (val: Mode) => void;
  mode: Mode;
}> = React.memo(({ setMode, mode }) => {
  return (
    <Box position="fixed" width="100vw">
      <Paper square>
        <Tabs
          value={mode}
          onChange={(e, val) => setMode(val)}
          indicatorColor="primary"
          variant="scrollable"
          textColor="primary"
          aria-label="icon tabs example"
        >
          <Tab label="E-Mail" value={"email" as Mode} />
          <Tab label="Password" value={"password" as Mode} />
          <Tab label="2FA" value={"2fa" as Mode} />
          <Tab label="Created" value={"created" as Mode} />
          <Tab label="LastLogin" value={"last_login" as Mode} />
          <Tab label="Username" value={"username" as Mode} />
        </Tabs>
      </Paper>
    </Box>
  );
});

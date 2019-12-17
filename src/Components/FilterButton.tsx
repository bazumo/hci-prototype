import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  MenuItem,
  Input,
  InputLabel,
  FormControl,
  DialogActions,
  Select,
  Button,
  Paper,
  Tabs,
  Tab,
  Box
} from "@material-ui/core";
import React from "react";
import FilterIcon from "@material-ui/icons/FilterList";
import { Mode } from "./Graph";
import UserIcon from "@material-ui/icons/Person";
export const FilterButton: React.FC<{
  setMode: (val: Mode) => void;
  mode: Mode;
}> = ({ setMode, mode }) => {
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
};

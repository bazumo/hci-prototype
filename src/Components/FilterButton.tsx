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
  Button
} from "@material-ui/core";
import React from "react";
import FilterIcon from "@material-ui/icons/FilterList";
import { Mode } from "./Graph";
export const FilterButton: React.FC<{
  setMode: (val: Mode) => void;
  mode: Mode;
}> = ({ setMode, mode }) => {
  const [open, setOpen] = React.useState(false);
  const handleSwitchMode = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>Choose Graph view</DialogTitle>
        <DialogContent style={{ minWidth: "350px" }}>
          <form>
            <FormControl>
              <InputLabel id="mode-label">Sort by</InputLabel>
              <Select
                labelId="mode-label"
                id="mode-select"
                value={mode}
                onChange={e => setMode(e.target.value as Mode)}
                input={<Input />}
              >
                <MenuItem value={"password"}>password</MenuItem>
                <MenuItem value={"email"}>email</MenuItem>
                <MenuItem value={"username"}>username</MenuItem>
                <MenuItem value={"2fa"}>2FA</MenuItem>
                <MenuItem value={"last_login"}>Last log-in (Month)</MenuItem>
                <MenuItem value={"created"}>Created (Year)</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Fab
        color="primary"
        aria-label="edit"
        onClick={handleSwitchMode}
        style={{ position: "fixed", bottom: "80px", right: "20px" }}
      >
        <FilterIcon />
      </Fab>
    </>
  );
};

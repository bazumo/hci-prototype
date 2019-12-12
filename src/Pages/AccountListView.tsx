import React, { ReactNode } from "react";
import { AccountList } from "./Components/AccountList";
import { Box, Container } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { SingleAccountView } from "./SingleAccountView";

export const AccountListView: React.FC<{}> = () => {
  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = React.useState(0);



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    return (
    <Box display="flex" justifyContent="center">
      <Box>
      <Container>
        <p>Accountlist</p>

        <Button onClick={handleClickOpen}>Filter by</Button>
          <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
            <DialogTitle>Select a Filter</DialogTitle>

            <DialogContent>
            <form>
              <FormControl>
                <InputLabel id="filter-label">Age</InputLabel>
                <Select
                  labelId="filter-label"
                  id="filter-select"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as any)}
                  input={<Input />}
                >
                  <MenuItem value={0}>name</MenuItem>
                  <MenuItem value={1}>email</MenuItem>
                  <MenuItem value={2}>date created</MenuItem>
                </Select>
              </FormControl>
            </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleClose} color="primary">
                Ok
              </Button>
            </DialogActions>

          </Dialog>
        <AccountList filter={filter}></AccountList>
      </Container>
      </Box>
    </Box>
  );
};

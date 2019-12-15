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
import { Accounts } from "../App";

export const AccountListView: React.FC<{}> = () => {
  const [open, setOpen] = React.useState(false);
  const [twoFA, setTwoFA] = React.useState(0);
  const [sort, setSort] = React.useState(0);
  const [username, setUsername] = React.useState(0);



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
            <DialogTitle>Sort By</DialogTitle>

            <DialogContent>
            <form>
              <FormControl>
                <InputLabel id="sort-label">Sort by</InputLabel>
                <Select
                  labelId="sort-label"
                  id="sort-select"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as any)}
                  input={<Input />}
                >
                  <MenuItem value={0}>name</MenuItem>
                  <MenuItem value={1}>email</MenuItem>
                  <MenuItem value={2}>date created</MenuItem>
                  <MenuItem value={3}>last log in</MenuItem>
                </Select>
              </FormControl>
            </form>
            <DialogTitle>Filter By</DialogTitle>
            <form>
              <FormControl>
                <InputLabel id="twoFA-label">2FA</InputLabel>
                <Select
                  labelId="twoFA-label"
                  id="twoFA-select"
                  value={twoFA}
                  onChange={(e) => setTwoFA(e.target.value as any)}
                  input={<Input />}
                >
                  <MenuItem value={0}>all</MenuItem>
                  <MenuItem value={1}>enabled</MenuItem>
                  <MenuItem value={2}>not enabled</MenuItem>
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
        <AccountList sort={sort} twoFa={twoFA}></AccountList>
      </Container>
      </Box>
    </Box>
  );
};

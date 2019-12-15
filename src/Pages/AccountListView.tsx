import React, { ReactNode } from "react";
import { AccountList } from "../Components/AccountList";
import { Box, Container, Fab, InputAdornment } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { SingleAccountView } from "./SingleAccountView";
import Grid from "@material-ui/core/Grid";
import { Accounts } from "../App";
import FilterIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";

export const AccountListView: React.FC<{}> = () => {
  const { accounts } = Accounts.useContainer();
  const usernames = Array.from(new Set(accounts.map(a => a.username)));
  const emails = Array.from(new Set(accounts.map(a => a.email)));

  const [open, setOpen] = React.useState(false);
  const [twoFA, setTwoFA] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState(0);
  const [username, setUsername] = React.useState(0);
  const [email, setEmail] = React.useState(0);
  const [compromised, setCompromised] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReset = () => {
    setTwoFA(0);
    setUsername(0);
    setEmail(0);
    setCompromised(0);
  };

  return (
    <Box display="flex" justifyContent="center" marginTop="52px">
      <Box>
        <Container>
          <Grid container spacing={3} style={{ width: "100vw" }}>
            <Dialog
              disableBackdropClick
              disableEscapeKeyDown
              open={open}
              onClose={handleClose}
            >
              <DialogTitle>Sort By</DialogTitle>
              <DialogContent style={{ minWidth: "350px" }}>
                <form>
                  <FormControl>
                    <InputLabel id="sort-label">Sort by</InputLabel>
                    <Select
                      labelId="sort-label"
                      id="sort-select"
                      value={sort}
                      onChange={e => setSort(e.target.value as any)}
                      input={<Input />}
                    >
                      <MenuItem value={0}>name</MenuItem>
                      <MenuItem value={1}>email</MenuItem>
                      <MenuItem value={2}>date created</MenuItem>
                      <MenuItem value={3}>last log in</MenuItem>
                    </Select>
                  </FormControl>
                </form>
              </DialogContent>

              <DialogTitle>Filter By</DialogTitle>
              <DialogContent>
                <form>
                  <FormControl>
                    <InputLabel id="username-label">Username</InputLabel>
                    <Select
                      labelId="username-label"
                      id="username-select"
                      value={username}
                      onChange={e => setUsername(e.target.value as any)}
                      input={<Input />}
                    >
                      <MenuItem value={0}>all</MenuItem>
                      {usernames.map((u, i) => (
                        <MenuItem value={i + 1}>{u}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </form>
                <form>
                  <FormControl>
                    <InputLabel id="email-label">Email</InputLabel>
                    <Select
                      labelId="email-label"
                      id="email-select"
                      value={email}
                      onChange={e => setEmail(e.target.value as any)}
                      input={<Input />}
                    >
                      <MenuItem value={0}>all</MenuItem>
                      {emails.map((u, i) => (
                        <MenuItem value={i + 1}>{u}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </form>
                <form>
                  <FormControl>
                    <InputLabel id="compromised-label">Compromised</InputLabel>
                    <Select
                      labelId="compromised-label"
                      id="compromised-select"
                      value={compromised}
                      onChange={e => setCompromised(e.target.value as any)}
                      input={<Input />}
                    >
                      <MenuItem value={0}>all</MenuItem>
                      <MenuItem value={1}>compromised</MenuItem>
                      <MenuItem value={2}>not compromised</MenuItem>
                    </Select>
                  </FormControl>
                </form>
                <form>
                  <FormControl>
                    <InputLabel id="twoFA-label">2FA</InputLabel>
                    <Select
                      labelId="twoFA-label"
                      id="twoFA-select"
                      value={twoFA}
                      onChange={e => setTwoFA(e.target.value as any)}
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
                <Button onClick={handleReset} color="primary">
                  Clear
                </Button>
                <Button onClick={handleClose} color="primary">
                  Ok
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
          <form>
            <Input
              id="standard-basic"
              value={search}
              placeholder={search}
              style={{ width: "100%" }}
              onChange={e => setSearch(e.target.value as any)}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </form>
          <AccountList
            sort={sort}
            twoFa={twoFA}
            compromised={compromised}
            email={email}
            username={username}
            search={search}
          ></AccountList>
          <Fab
            color="primary"
            aria-label="edit"
            onClick={handleClickOpen}
            style={{ position: "fixed", bottom: "80px", right: "20px" }}
          >
            <FilterIcon />
          </Fab>
        </Container>
      </Box>
    </Box>
  );
};

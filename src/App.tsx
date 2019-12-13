import { blue } from "@material-ui/core/colors";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles
} from "@material-ui/core/styles";

import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, useRouteMatch } from "react-router-dom";
import { Homepage } from "./Pages/Homepage";
import { Graphview } from "./Pages/Graphview";
import { AccountListView } from "./Pages/AccountListView";
import { BottomNav } from "./Pages/Components/BottomNav";
import { SideNav } from "./Pages/Components/SideNav";
import { TopNav } from "./Pages/Components/TopNav";
import { SingleAccountView } from "./Pages/SingleAccountView";
import { Box } from "@material-ui/core";

import { createContainer } from "unstated-next";
import { accounts as fakeAccounts, Account } from "./fakedata";

function useAccounts(initialState: Account[] = fakeAccounts) {
  let [accounts, setAccounts] = useState(initialState);
  let deleteAccount = (id: string) =>
    setAccounts(accounts.filter(a => a.id !== id));
  let modifyAccount = (id: string, account: Partial<Account>) =>
    setAccounts([
      ...accounts.filter(a => a.id !== id),
      {
        ...accounts.find(a => a.id === id)!,
        ...account
      }
    ]);
  return { accounts, deleteAccount, modifyAccount };
}

export const Accounts = createContainer(useAccounts);

const theme = createMuiTheme({
  palette: {
    primary: blue
  }
});

export const useStyles = makeStyles({
  root: {
    "& .Mui-selected": {
      color: "white"
    }
  }
});

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Accounts.Provider>
        <BrowserRouter>
          <Box height="56px"></Box>
          <TopNav setOpen={setOpen}></TopNav>
          <SideNav open={open} setOpen={setOpen}></SideNav>
          <Switch>
            <Route path="/graph">
              <Graphview />
            </Route>
            <Route path="/list">
              <AccountListView />
            </Route>
            <Route path="/account/:id">
              <SingleAccountView />
            </Route>
            <Route path="/">
              <Homepage />
            </Route>
          </Switch>
          <Box height="56px"></Box>

          <BottomNav></BottomNav>
        </BrowserRouter>
      </Accounts.Provider>
    </ThemeProvider>
  );
};

export default App;

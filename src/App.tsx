import { blue } from "@material-ui/core/colors";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles
} from "@material-ui/core/styles";
import FolderIcon from "@material-ui/icons/Folder";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Timeline from "@material-ui/icons/Timeline";
import Assessment from "@material-ui/icons/Assessment";

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
        <BottomNav></BottomNav>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

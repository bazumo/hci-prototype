import {
  AppBar,
  IconButton,
  SwipeableDrawer,
  Toolbar,
  Typography,
  Box,
  BottomNavigation,
  BottomNavigationAction
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles
} from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import FolderIcon from "@material-ui/icons/Folder";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Timeline from "@material-ui/icons/Timeline";
import Assessment from "@material-ui/icons/Assessment";

import ViewModuleIcon from "@material-ui/icons/ViewModule";
import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useLocation,
  useHistory
} from "react-router-dom";
import { Homepage } from "./Pages/Homepage";
import { Graphview } from "./Pages/Graphview";
import { AccountListView } from "./Pages/AccountListView";

const theme = createMuiTheme({
  palette: {
    primary: blue
  }
});

const useStyles = makeStyles({
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
        <TopNav setOpen={setOpen}></TopNav>
        <SideNav open={open} setOpen={setOpen}></SideNav>
        <Switch>
          <Route path="/graph">
            <Graphview />
          </Route>
          <Route path="/list">
            <AccountListView />
          </Route>
          <Route path="/account">
            <div>Single Account</div>
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

const TopNav: React.FC<{ setOpen: any }> = ({ setOpen }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">Account Sanity blub</Typography>
        <Box style={{ marginLeft: "auto" }}>
          <Link to="/">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              style={{ color: "white" }}
            >
              <HomeIcon />
            </IconButton>
          </Link>

          <Link to="/list">
            <IconButton
              edge="start"
              style={{ color: "white" }}
              aria-label="menu"
            >
              <FormatListNumberedIcon />
            </IconButton>
          </Link>
          <Link to="/graph">
            <IconButton
              edge="start"
              style={{ color: "white" }}
              aria-label="menu"
            >
              <ViewModuleIcon />
            </IconButton>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const SideNav: React.FC<{ setOpen: any; open: boolean }> = ({
  setOpen,
  open
}) => {
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

const BottomNav: React.FC<{}> = ({}) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    history.push(newValue);
  };

  console.log(location.pathname);

  return (
    <Box>
      <BottomNavigation
        value={location.pathname}
        onChange={handleChange}
        className={classes.root}
        style={{
          position: "fixed",
          bottom: 0,
          width: "100vw",
          backgroundColor: "#2196f3"
        }}
      >
        <BottomNavigationAction
          label="Overview"
          value="/"
          icon={<AccountCircle />}
        />
        <BottomNavigationAction
          label="Graph"
          value="/graph"
          icon={<ViewModuleIcon />}
        />
        <BottomNavigationAction
          label="List"
          value="/list"
          icon={<LocationOnIcon />}
        />
      </BottomNavigation>
    </Box>
  );
};

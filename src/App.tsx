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

import ViewModuleIcon from "@material-ui/icons/ViewModule";
import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Homepage } from "./Pages/Homepage";
import { Graphview } from "./Pages/Graphview";

const theme = createMuiTheme({
  palette: {
    primary: blue
  }
});

const useStyles = makeStyles({
  root: {
    width: 500
  }
});

const App: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState("recents");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
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
        <SwipeableDrawer
          anchor="left"
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
        >
          <p>Not implemented</p>
        </SwipeableDrawer>
        <Switch>
          <Route path="/graph">
            <Graphview />
          </Route>
          <Route path="/account">
            <div>Single Account</div>
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
        <Box>
          <BottomNavigation
            value={value}
            onChange={handleChange}
            style={{
              position: "fixed",
              bottom: 0,
              width: "100vw",
              backgroundColor: "#2196f3",
              color: "white"
            }}
          >
            <BottomNavigationAction
              label="Recents"
              value="recents"
              icon={<RestoreIcon />}
            />
            <BottomNavigationAction
              label="Favorites"
              value="favorites"
              icon={<FavoriteIcon />}
            />
            <BottomNavigationAction
              label="Nearby"
              value="nearby"
              icon={<LocationOnIcon />}
            />
            <BottomNavigationAction
              label="Folder"
              value="folder"
              icon={<FolderIcon />}
            />
          </BottomNavigation>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

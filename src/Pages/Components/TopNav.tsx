import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Box
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import React from "react";
import { Link } from "react-router-dom";
export const TopNav: React.FC<{
  setOpen: any;
}> = ({ setOpen }) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">Account Sanity Tool</Typography>
        <Box style={{ marginLeft: "auto" }}>
             {/*<Link to="/">
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
          </Link> */}     
          
        </Box>
      </Toolbar>
    </AppBar>
  );
};

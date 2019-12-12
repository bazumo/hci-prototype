import {
  Box,
  BottomNavigation,
  BottomNavigationAction
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useStyles } from "../../App";
export const BottomNav: React.FC<{}> = ({}) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    history.push(newValue);
  };
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

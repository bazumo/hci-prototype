import React, { ReactNode } from "react";
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
  ListItemIcon,
  Container
} from "@material-ui/core";
import Circle, { CircleProps } from "react-circle";
import ErrorIcon from "@material-ui/icons/Error";
import { GraphWrapper } from "../Components/Graph";

export const Graphview: React.FC<{}> = () => {
  return (
    <Box>
      {<GraphWrapper></GraphWrapper>}
      <img src="/graph1.png" style={{ width: "100vw" }}></img>
      <Box height="100vh"></Box>
      <img src="/graph2.png" style={{ width: "100vw" }}></img>
      <Box height="100vh"></Box>
    </Box>
  );
};

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
import { Graph } from "./Components/Graph";

export const Graphview: React.FC<{}> = () => {
  return (
    <Box>
      <Container>
        <Graph></Graph>
      </Container>
    </Box>
  );
};

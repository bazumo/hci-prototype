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

function NotificationListItem(props: {
  icon?: ReactNode;
  primary: string;
  secondary: string;
}) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemIcon>
        <ListItemAvatar>
          <Avatar>{props.icon ? props.icon : <ErrorIcon />}</Avatar>
        </ListItemAvatar>
      </ListItemIcon>
      <ListItemText primary={props.primary} secondary={props.secondary} />
    </ListItem>
  );
}

function ProgressCircle({
  title,
  ...circleProps
}: CircleProps & { title: string }) {
  return (
    <Box width="20vw">
      <Circle responsive {...circleProps} />
      <Box mt={0} textAlign="center">
        {title}
      </Box>
    </Box>
  );
}

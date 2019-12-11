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

export const Homepage: React.FC<{}> = () => {
  return (
    <Box>
      <Container>
        <Box display="flex" justifyContent="center" mt={4}>
          <Box maxWidth="50vw" margin="auto">
            <Circle progress={35} responsive />
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-around" mt={8}>
          <ProgressCircle title="Passwords" progress={34}></ProgressCircle>
          <ProgressCircle title="Accounts" progress={87}></ProgressCircle>
          <ProgressCircle title="Protection" progress={96}></ProgressCircle>
          <ProgressCircle title="Dependencies" progress={57}></ProgressCircle>
        </Box>
      </Container>

      <Box mt={6}>
        <Box ml={2}>
          <Typography variant="h5">Alerts</Typography>
        </Box>
        <List>
          <NotificationListItem
            primary="PSN-Database has been leaked"
            secondary="Your account might be compromised.
Change Password!"
          ></NotificationListItem>
          <Divider variant="inset" component="li" />
          <NotificationListItem
            primary="Inactive ‘Gutefrage.de’ Account detected"
            secondary="Account last Activity 8 months ago
          You might want to delete it."
          ></NotificationListItem>

          <Divider variant="inset" component="li" />
          <NotificationListItem
            primary="Spotify-Account Security can be upgraded"
            secondary="Implement 2-Factor-Authentification"
          ></NotificationListItem>
        </List>
      </Box>
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

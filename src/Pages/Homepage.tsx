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
import { Account } from "../fakedata";
import { Accounts } from "../App";
import { useSpring, animated } from "react-spring";

function getScores(accounts: Account[]) {
  const passwordScore =
    accounts.reduce((acc, a) => acc + 90, 0) / accounts.length;
  const accountScore =
    accounts.reduce((acc, a) => acc + 30, 0) / accounts.length;
  const protectionScore =
    accounts.reduce((acc, a) => acc * (a.compromised ? 0.1 : 1), 1) * 90;
  const dependenyScore =
    accounts.reduce((acc, a) => acc + 10, 0) / accounts.length;
  const globalScore = Math.min(
    dependenyScore,
    protectionScore,
    accountScore,
    passwordScore
  );

  return {
    passwordScore,
    accountScore,
    protectionScore,
    dependenyScore,
    globalScore
  };
}

export const Homepage: React.FC<{}> = () => {
  const { accounts, modifyAccount } = Accounts.useContainer();

  const scores = getScores(accounts);

  const {
    passwordScore,
    accountScore,
    protectionScore,
    dependenyScore,
    globalScore
  } = useSpring(scores);

  return (
    <Box>
      <Container>
        <Box display="flex" justifyContent="center" mt={4}>
          <Box margin="auto">
            <AnimatedProgressCircle
              progress={globalScore}
              width="50vw"
            ></AnimatedProgressCircle>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-around" mt={8}>
          <AnimatedProgressCircle
            title="Passwords"
            progress={passwordScore}
          ></AnimatedProgressCircle>
          <AnimatedProgressCircle
            title="Accounts"
            progress={accountScore}
          ></AnimatedProgressCircle>
          <AnimatedProgressCircle
            title="Protection"
            progress={protectionScore}
          ></AnimatedProgressCircle>
          <AnimatedProgressCircle
            title="Dependencies"
            progress={dependenyScore}
          ></AnimatedProgressCircle>
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
            onClick={() =>
              modifyAccount("Google", {
                compromised: true
              })
            }
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

function NotificationListItem(
  props: {
    icon?: ReactNode;
    primary: string;
    secondary: string;
  } & any
) {
  const { icon, primary, secondary, ...listItemProps } = props;
  return (
    <ListItem alignItems="flex-start" {...listItemProps}>
      <ListItemIcon>
        <ListItemAvatar>
          <Avatar>{icon ? icon : <ErrorIcon />}</Avatar>
        </ListItemAvatar>
      </ListItemIcon>
      <ListItemText primary={primary} secondary={secondary} />
    </ListItem>
  );
}

const AnimatedProgressCircle = animated(ProgressCircle);

function ProgressCircle({
  title,
  progress,
  width = "20vw",
  ...circleProps
}: CircleProps & { title?: string; width?: string }) {
  return (
    <Box width={width}>
      <Circle
        responsive
        {...circleProps}
        progress={Math.floor(progress)}
        progressColor={`rgb(${255 - 1.8 * Math.floor(progress)}, ${2 *
          Math.floor(progress)}, 80)`}
      />
      {title && (
        <Box mt={0} textAlign="center">
          {title}
        </Box>
      )}
    </Box>
  );
}

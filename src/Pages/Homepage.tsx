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
import { Account } from "../fakedata";
import { Accounts } from "../App";
import { OptimizationList } from "../Components/OptimizationList";
import { useSpring, animated } from "react-spring";

function getScores(accounts: Account[]) {
  const email_count = e =>
    accounts.map(a => a.email).reduce((acc, a) => (a == e ? acc + 1 : acc), 0);
  const password_count = p =>
    accounts
      .map(a => a.password)
      .reduce((acc, a) => (a == p ? acc + 1 : acc), 0);
  const passwordScore =
    accounts.reduce(
      (acc, a) => acc + (a.password.length > 12 ? 90 : a.password.length * 7),
      0
    ) / accounts.length;
  const accountScore =
    accounts.reduce(
      (acc, a) =>
        acc +
        90 +
        (a.loggedIn ? -30 : 0) +
        (a.lastLoggedIn > new Date(2019, 12, 5) ? 30 : 0) +
        (a.lastLoggedIn < new Date(2019, 6, 12) ? -60 : 0) +
        (a.supportsTwoFA ? (a.twoFA ? 0 : -20) : 0),
      0
    ) / accounts.length;
  const protectionScore =
    accounts.reduce((acc, a) => acc * (a.compromised ? 0.6 : 1), 1) * 90;
  const dependenyScore =
    accounts.reduce(
      (acc, a) =>
        acc + 10 / email_count(a.email) + 80 / password_count(a.password),
      0
    ) / accounts.length;
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
        <OptimizationList></OptimizationList>
      </Box>
    </Box>
  );
};

export const scoreToColor = (val: number) => {
  return `rgb(${255 - 1.8 * Math.floor(val)}, ${2 * Math.floor(val)}, 80)`;
};
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
        animate={false}
        responsive
        {...circleProps}
        progress={Math.floor(progress)}
        progressColor={scoreToColor(progress)}
        showPercentageSymbol={false}
      />
      {title && (
        <Box mt={0} textAlign="center">
          {title}
        </Box>
      )}
    </Box>
  );
}

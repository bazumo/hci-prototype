import React, { ReactNode } from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemIcon,
  List,
  makeStyles
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { Account } from "../../fakedata";
import { useHistory } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { Accounts } from "../../App";

export const useStyles = makeStyles({
  avatar: {
    "& img": {
      objectFit: "cover"
    }
  }
});

export const AccountList: React.FC<{ sort: number, twoFa:number }> = props => {
  const sorts = [
    (a: Account, b: Account): number =>
      a.id > b.id ? 1 : a.id < b.id ? -1 : 0,
    (a: Account, b: Account): number =>
      a.email > b.email ? 1 : a.email < b.email ? -1 : 0,
    (a: Account, b: Account): number =>
      a.lastLoggedIn > b.lastLoggedIn ? 1 : a.lastLoggedIn < b.lastLoggedIn ? -1 : 0,
      (a: Account, b: Account): number =>
      a.email > b.email ? 1 : a.email < b.email ? -1 : 0
  ];

  const history = useHistory();
  const classes = useStyles();
  const { accounts } = Accounts.useContainer();
  const filtered_accounts = accounts.filter(a => props.twoFa == 1? a.twoFA : (props.twoFa == 2 ? !a.twoFA : true))
  console.log(typeof accounts[0].logo);

  return (
    <List>
      {filtered_accounts.sort(sorts[props.sort]).map(a => (
        <ListItem
          alignItems="flex-start"
          key={a.id}
          onClick={() => history.push(`/account/${a.id}`)}
        >
          <ListItemIcon>
            <ListItemAvatar className={classes.avatar}>
              {typeof a.logo === "string" ? (
                <Avatar src={a.logo}></Avatar>
              ) : (
                a.logo
              )}
            </ListItemAvatar>
          </ListItemIcon>
          <ListItemText primary={a.id} secondary={a.username + " | " + a.email + (a.loggedIn ? " | logged in" : "") + (a.twoFA ? " | 2FA" : "") + (a.compromised ? " | COMPROMISED": "")} />
        </ListItem>
      ))}
    </List>
  );
};

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

import { Account } from "../fakedata";
import { useHistory } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { Accounts } from "../App";

export const useStyles = makeStyles({
  avatar: {
    "& img": {
      objectFit: "cover"
    }
  }
});

export const AccountList: React.FC<{ sort: number; twoFa: number, compromised: number, username: number, email : number, search: string}> = props => {
  const sorts = [
    (a: Account, b: Account): number =>
      a.id > b.id ? 1 : a.id < b.id ? -1 : 0,
    (a: Account, b: Account): number =>
      a.email > b.email ? 1 : a.email < b.email ? -1 : 0,
    (a: Account, b: Account): number =>
      a.lastLoggedIn > b.lastLoggedIn
        ? 1
        : a.lastLoggedIn < b.lastLoggedIn
        ? -1
        : 0,
    (a: Account, b: Account): number =>
      a.email > b.email ? 1 : a.email < b.email ? -1 : 0
  ];

  const history = useHistory();
  const classes = useStyles();
  const { accounts } = Accounts.useContainer();
  const usernames = Array.from(new Set(accounts.map(a => a.username)));
  const emails = Array.from(new Set(accounts.map(a => a.email)));

  console.log(props.email);
  console.log(emails[props.email-1]);

  const filtered_accounts = accounts
  .filter(a =>
    props.twoFa == 1 ? a.twoFA : props.twoFa == 2 ? !a.twoFA : true
  )
  .filter(a =>
    props.compromised == 1 ? a.compromised : props.compromised == 2 ? !a.compromised : true 
    )
  .filter(a =>
    props.username == 0 ? true : usernames[props.username-1] == a.username
  ).filter(a =>
    props.email == 0 ? true : emails[props.email-1] == a.email
  ).filter(a =>
    a.username.toLowerCase().includes(props.search.toLocaleLowerCase()) 
    || a.email.toLowerCase().includes(props.search.toLowerCase()) 
    || a.id.toLowerCase().includes(props.search.toLowerCase())
  );

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
          <ListItemText
            primary={a.id}
            secondary={
              a.username +
              " | " +
              a.email +
              (a.loggedIn ? " | logged in" : "") +
              (a.twoFA ? " | 2FA" : "") +
              (a.compromised ? " | COMPROMISED" : "")
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

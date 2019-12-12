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
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { accounts, Account } from "../../fakedata";
import { useHistory } from "react-router-dom";
import Link from '@material-ui/core/Link';


export const useStyles = makeStyles({
  avatar: {
    "& img": {
      objectFit: "cover"
    }
  }
});

export const AccountList: React.FC<{filter: number}> = (props) => {
  const filters = [
    (a:Account, b:Account) : number => a.id > b.id ? 1 : (a.id < b.id ? -1 : 0),
    (a:Account, b:Account) : number => a.email > b.email ? 1 : (a.email < b.email ? -1 : 0),
    (a:Account, b:Account) : number => a.created > b.created ? 1 : (a.created < b.created ? -1 : 0)
  ]

  const history = useHistory();
  const classes = useStyles();
  console.log(typeof accounts[0].logo)

  return (
    <List> 
      {accounts.sort(filters[props.filter]).map(a => (
        <ListItem alignItems="flex-start" key={a.id} onClick={() => history.push(`/account/${a.id}`)}>
          <ListItemIcon>
          <ListItemAvatar className={classes.avatar}>
            {typeof a.logo === "string" ? <Avatar src={a.logo}></Avatar> : a.logo}
          </ListItemAvatar>
          </ListItemIcon>
          <ListItemText primary={a.id} secondary={a.email + "/" + a.created} />
        </ListItem>
      ))}
    </List>
  );
};

import React, { ReactNode } from "react";
import {
  List,
  Divider,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
  ListItemIcon
} from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import { Accounts } from "../App";
import { prependOnceListener } from "cluster";
import { accounts, Account } from "../fakedata";
import { useHistory } from "react-router-dom";

export const OptimizationList: React.FC<{}> = props => {
  const { accounts } = Accounts.useContainer();
  return (
    <List>
      {accounts
        .filter(a => a.compromised)
        .map(a => (
          <CompromisedItem a={a}></CompromisedItem>
        ))}
    </List>
  );
};

function CompromisedItem({ a }: { a: Account }) {
  const { accounts } = Accounts.useContainer();
  const res = accounts.filter(b => b.password == a.password && a.id != b.id);

  const history = useHistory();

  return (
    <ListItem
      alignItems="flex-start"
      onClick={() => history.push(`/action/${a.id}/uncompromise`)}
    >
      <ListItemIcon>
        <ListItemAvatar>
          <Avatar>{<ErrorIcon />}</Avatar>
        </ListItemAvatar>
      </ListItemIcon>
      <ListItemText
        primary={"Your " + a.id + " account has been compromised!"}
        secondary={
          "The following accounts might be affected: " +
          res.map(a => a.id).join(", ")
        }
      />
    </ListItem>
  );
}

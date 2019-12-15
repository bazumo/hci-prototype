import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ErrorIcon from "@material-ui/icons/Error";
import React from "react";
import { useHistory } from "react-router-dom";
import { Accounts } from "../App";
import { Account } from "../fakedata";
import { scoreToColor } from "../Pages/Homepage";

export const OptimizationList: React.FC<{}> = props => {
  const { accounts } = Accounts.useContainer();
  return (
    <List>
      {accounts
        .filter(a => a.compromised)
        .map(a => (
          <CompromisedItem a={a}></CompromisedItem>
        ))}
      {accounts
        .filter(b => !b.twoFA && b.supportsTwoFAP)
        .map(a => (
          <TwoFAItem a={a}></TwoFAItem>
        ))}
      {accounts
        .filter(b => b.lastLoggedIn < new Date(2019, 6, 12))
        .map(a => (
          <InactivityItem a={a}></InactivityItem>
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
          <Avatar style={{ backgroundColor: scoreToColor(0) }}>
            {<ErrorIcon />}
          </Avatar>
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

function TwoFAItem({ a }: { a: Account }) {
  const { accounts } = Accounts.useContainer();

  const history = useHistory();

  return (
    <ListItem
      alignItems="flex-start"
      onClick={() => history.push(`/action/${a.id}/twofa`)}
    >
      <ListItemIcon>
        <ListItemAvatar>
          <Avatar style={{ backgroundColor: scoreToColor(60) }}>
            {<AddCircleIcon />}
          </Avatar>
        </ListItemAvatar>
      </ListItemIcon>
      <ListItemText
        primary={a.id + " supports 2FA"}
        secondary={"make your account more secure by enabling 2FA"}
      />
    </ListItem>
  );
}

function InactivityItem({ a }: { a: Account }) {
  const { accounts } = Accounts.useContainer();

  const history = useHistory();

  return (
    <ListItem
      alignItems="flex-start"
      onClick={() => history.push(`/action/${a.id}/inactive`)}
    >
      <ListItemIcon>
        <ListItemAvatar>
          <Avatar style={{ backgroundColor: scoreToColor(70) }}>
            {<AccessTimeIcon />}
          </Avatar>
        </ListItemAvatar>
      </ListItemIcon>
      <ListItemText
        primary={"Inactive " + a.id + " Account"}
        secondary={"this account hasn't been used in a long time"}
      />
    </ListItem>
  );
}

import React, { ReactNode } from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemIcon,
  List
} from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import { accounts } from "../../fakedata";

export const AccountList: React.FC<{}> = () => {
  return (
    <List>
      {accounts.map(a => (
        <ListItem alignItems="flex-start" key={a.id}>
          <ListItemIcon>
          <ListItemAvatar>
            <Avatar src={a.logo} />
          </ListItemAvatar>
          </ListItemIcon>
          <ListItemText primary={a.id} secondary={a.url} />
        </ListItem>
      ))}
    </List>
  );
};

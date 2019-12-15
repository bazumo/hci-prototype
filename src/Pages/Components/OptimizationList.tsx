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
import {Accounts} from "../../App"
import { prependOnceListener } from "cluster";
import { accounts, Account } from "../../fakedata";

export const OptimizationList: React.FC<{}> = props => {
    const { accounts } = Accounts.useContainer();
    return (
    <List>
          {accounts.filter(a => a.compromised).map( a => <CompromisedItem a={a}></CompromisedItem>)}
    </List>);
};

function CompromisedItem ({a}: {a: Account}){
        const { accounts } = Accounts.useContainer();
        const res = accounts.filter(b => (b.password == a.password));
        return (
            <ListItem alignItems="flex-start">
            <ListItemIcon>
            <ListItemAvatar>
                <Avatar>{<ErrorIcon />}</Avatar>
            </ListItemAvatar>
            </ListItemIcon>
            <ListItemText primary={"Your " + a.id + " account has been compromised!"} secondary={""} />
        </ListItem>)
}

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
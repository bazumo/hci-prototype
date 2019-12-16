import { Avatar, Container, Box, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import NoEncryptionIcon from "@material-ui/icons/NoEncryption";
import SecurityIcon from "@material-ui/icons/Security";
import React from "react";
import { useParams } from "react-router-dom";
import { Accounts } from "../App";
import { Account } from "../fakedata";
import { scoreToColor } from "../Pages/Homepage";
import { useHistory } from "react-router-dom";

export const SingleAccountView: React.FC<{}> = props => {
  let { id } = useParams();
  const history = useHistory();
  const { accounts, deleteAccount } = Accounts.useContainer();
  const a: Account = accounts.filter(a => a.id == id)[0];

  if (!a) {
    return <div>Account not found</div>;
  }

  return (
    <div>
      <div
        style={{
          backgroundSize: "cover",
          width: "100vw",
          height: "200px",
          backgroundImage: `url(${a.backgroundImage})`,
          backgroundPosition: "center",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end"
        }}
      >
        {a.compromised && (
          <Tooltip title="This account has been compromised">
            <Avatar
              style={{ backgroundColor: scoreToColor(0), margin: "10px" }}
            >
              <NoEncryptionIcon></NoEncryptionIcon>
            </Avatar>
          </Tooltip>
        )}
        {a.supportsTwoFA && (
          <Tooltip
            title={
              a.twoFA ? "This account has 2FA enabled" : "2FA is not enabled"
            }
          >
            <Avatar style={{ margin: "10px" }}>
              <SecurityIcon
                color={a.twoFA ? "primary" : undefined}
              ></SecurityIcon>
            </Avatar>
          </Tooltip>
        )}
      </div>
      <Container>
        <Box display="flex">
          <Typography variant="h4" gutterBottom style={{ marginTop: "10px" }}>
            {a.id}
          </Typography>
          <Button href={a.url} style={{ marginLeft: "auto" }} color="primary">
            Visit
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              history.goBack();
              deleteAccount(a.id);
            }}
          >
            Delete
          </Button>
        </Box>

        <Typography variant="h6" gutterBottom style={{ marginTop: "10px" }}>
          Account Information
        </Typography>

        <Info title="username" content={a.username}></Info>

        <Info title="email" content={a.email}></Info>

        <Info
          title="account created"
          content={
            a.created.getDay() +
            "/" +
            a.created.getMonth() +
            "/" +
            a.created.getFullYear()
          }
        ></Info>

        <Typography variant="h6" gutterBottom>
          Account Protection
        </Typography>

        <Info title="2FA" content={a.twoFA ? "enabled" : "not enabled"}></Info>
        <Info
          title="password strength"
          content={String(a.password.length)}
        ></Info>
        <Info
          title="last log-in"
          content={
            a.lastLoggedIn.getDay() +
            "/" +
            a.lastLoggedIn.getMonth() +
            "/" +
            a.lastLoggedIn.getFullYear()
          }
        ></Info>
      </Container>
    </div>
  );
};

function Info(props: { title: string; content: string }) {
  return (
    <TextField
      id="standard-read-only-input"
      label={props.title}
      defaultValue={props.content}
      InputProps={{
        readOnly: true
      }}
      style={{ width: "100%", marginBottom: "30px" }}
    />
  );
}

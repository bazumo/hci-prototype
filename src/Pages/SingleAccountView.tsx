import React, { ReactNode } from "react";
import { accounts, Account } from "../fakedata";
import { Box, Container } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

export const SingleAccountView: React.FC<{}> = (props) => {
    let {id} = useParams();
    const a : Account = accounts.filter(a => a.id == id)[0];
    const deleteAccount = (event: React.SyntheticEvent) => true; // need to implement

    
    
    return (
        <Box display="flex" justifyContent="center">
            <Box>
            <p>{a.id}</p>
            <Info title={"url"} content={a.url}></Info>
            </Box>
            <Link href="" onClick={deleteAccount}>
                Delete
            </Link>
            <Link href="" onClick={deleteAccount}>
                Delete
            </Link>
        </Box>

    );
};

function Info(props: {
    title: string;
    content: string;
  }) {
    return (
        <TextField
        id="standard-read-only-input"
        label={props.title}
        defaultValue={props.content}
        InputProps={{
            readOnly: true,
        }}
    />
    );
  }
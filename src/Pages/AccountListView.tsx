import React, { ReactNode } from "react";
import {AccountList} from "./Components/AccountList"
import {
    Box,
    Container,
  } from "@material-ui/core";

export const AccountListView: React.FC<{}> = () => {
    return (
    <Box display="flex" justifyContent="center">
      <Box>
      <Container>
        <p>Accountlist</p>
          <AccountList></AccountList>
      </Container>
      </Box>
    </Box>
    );
};

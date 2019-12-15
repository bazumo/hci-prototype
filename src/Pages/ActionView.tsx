import {
  Box,
  makeStyles,
  Theme,
  createStyles,
  Step,
  StepLabel,
  StepContent,
  Typography,
  Button,
  Paper
} from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";
import { Accounts } from "../App";
import { Account } from "../fakedata";
import Stepper from "@material-ui/core/Stepper";

export const ActionView: React.FC<{}> = props => {
  let { id, actionType } = useParams();
  const { accounts } = Accounts.useContainer();
  const a: Account = accounts.filter(a => a.id == id)[0];

  return (
    <Box display="flex" justifyContent="center">
      <p>
        {actionType == "uncompromise" && (
          <CompromisedStepper a={a}></CompromisedStepper>
        )}
      </p>
    </Box>
  );
};

function getSteps() {
  return [
    "Immediately Change your Password",
    "Protect other Accounts",
    "Monitor your Activity"
  ];
}

function getStepContent(a: Account, step: number) {
  switch (step) {
    case 0:
      return `First thing you have to do is change your password. If for some reason that’s not possible, you need to call the company and freeze the account.



Be aware of what information is linked to your Account. If you have a creditcard or a social security number linked to your account you want to call your bank and lock it.`;
    case 1:
      return "The following Accounts are somehow connected to the compromised Account. To prevent any further damage, you also want to change the passwords of these accounts.";
    case 2:
      return `Now once you have changed all the passwords, it's time to look for changes on the accounts. Also look at the email connected to your accounts.


Finally keep monitoring your accounts and react immediatly if there is suspicious activity. To further lessen future attacks enable 2FA if possible and use different passwords.`;
    default:
      return "Unknown step";
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100vw"
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    actionsContainer: {
      marginBottom: theme.spacing(2)
    },
    resetContainer: {
      padding: theme.spacing(3)
    }
  })
);

function CompromisedStepper({ a }: { a: Account }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography style={{ whiteSpace: "pre" }}>
                {getStepContent(a, index)}
              </Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Go Back
          </Button>
        </Paper>
      )}
    </div>
  );
}

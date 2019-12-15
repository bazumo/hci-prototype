import {
  Box,
  makeStyles,
  Theme,
  createStyles,
  Step,
  StepLabel,
  StepContent,
  Typography,
  Link,
  Button,
  Paper
} from "@material-ui/core";
import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { Accounts } from "../App";
import { Account } from "../fakedata";
import Stepper from "@material-ui/core/Stepper";
import { listenerCount } from "cluster";

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
        {actionType == "inactive" && (
          <InactiveStepper a={a}></InactiveStepper>
        )}
        {actionType == "twofa" && (
          <TwoFAStepper a={a}></TwoFAStepper>
        )}
      </p>
    </Box>
  );
};

function getCompromisedSteps() {
  return [
    "Immediately Change your Password",
    "Protect other Accounts",
    "Monitor your Activity"
  ];
}

function getCompromisedStepContent(a: Account, step: number) { 
  switch (step) {
    case 0:
      return `First thing you have to do is change your password. 
If for some reason that’s not possible, 
you need to call the company and freeze the account.



Be aware of what information is linked to your Account. 
If you have a creditcard or a social security number linked to your account
you want to call your bank and lock it.`;
    case 1:
      return `The following Accounts are somehow connected to the compromised Account.
To prevent any further damage, you also want to change the passwords of these accounts.`;
    case 2:
      return `Now once you have changed all the passwords, 
it's time to look for changes on the accounts. 
Also look at the email connected to your accounts.


Finally keep monitoring your accounts and react immediatly if there is suspicious activity. 
To further lessen future attacks, enable 2FA if possible and use different passwords.`;
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
  const steps = getCompromisedSteps();
  const { accounts, modifyAccount } = Accounts.useContainer();
  const others = accounts.filter(b => b.password == a.password && a.id != b.id);

  const history = useHistory();


  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    const new_password = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 14);
    modifyAccount(a.id, {compromised:false, password:new_password})
    setActiveStep(0);
    history.goBack();
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography style={{ whiteSpace: "pre" }}>
                {getCompromisedStepContent(a, index)}
              </Typography>
              {index == 0 && (<Link href={a.url}>visit account</Link>)}
              {index == 1 && (others.map(b => (<Box><Link href={b.url}>{b.id}</Link></Box>)))}
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

function getInactiveSteps() {
  return [
    "Learn what deleting your account means",
    "Review and download your info",
    "Delete your Account"
  ];
}

function getInactiveStepContent(a: Account, step: number) { 
  switch (step) {
    case 0:
      return `First of all make sure what deleting your account really means.
Deleting your account means losing data and access to certain features. 
It differs from account to account, so be sure to inform yourself first.`;
    case 1:
      return `Before deleting your account, you might want to download data that you still want to keep.
If the account offers account recovery, you might want to set it up.`;
    case 2:
      return `The last step is actually deleting your account.
For that go to the page of your account and follow the instructions.`;
    default:
      return "Unknown step";
  }
}

function InactiveStepper({ a }: { a: Account }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getInactiveSteps();
  const { accounts, deleteAccount, modifyAccount} = Accounts.useContainer();

  const history = useHistory();


  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    history.goBack();
    deleteAccount(a.id);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography style={{ whiteSpace: "pre" }}>
                {getInactiveStepContent(a, index)}
              </Typography>
              {index == 2 && (<Link href={a!=null ? a.url : ""}>visit account</Link>)}
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


function getTwoFASteps() {
  return [
    "What is 2FA?",
    "Why use 2FA?",
    "How to enable it"
  ];
}

function getTwoFAStepContent(a: Account, step: number) { 
  switch (step) {
    case 0:
      return `Two-factor authentication (or 2FA, for short) 
strengthens login security by requiring a second piece of information 
— a second factor beyond your password. The second piece of information is 
usually a temporary code delivered by a device in your possession, such as your phone.
It may also be something on your body, such as a fingerprint.`;
    case 1:
      return `2-factor authentication (2FA) adds another security layer to the login process,
reducing the chances of account hacking. In this, just knowing and entering your password 
is not enough. This new layer can be anything like an OTP sent to your mobile, an auto-generated code,
or biometric verification on a device you own. All these extra steps 
are time sensitive, making them more secure.As good as 2FA maybe, it is not bulletproof.
Your phone can runs out of battery or can stop working unexpectedly, 
locking you out of your accounts. In case your phone get’s stolen, 
you can be vulnerable as someone else can access the codes to impersonate you. 
Despite these limitations, 2FA is the easiest way to drastically improve your virtual security.`;
    case 2:
      return `Go to the account website and open the settings. 
Find the settings for 2FA and follow the instructions on how to enable it`;
    default:
      return "Unknown step";
  }
}

function TwoFAStepper({ a }: { a: Account }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getTwoFASteps();
  const { accounts, modifyAccount} = Accounts.useContainer();

  const history = useHistory();


  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    modifyAccount(a.id, {twoFA: true});
    history.goBack();
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography style={{ whiteSpace: "pre" }}>
                {getTwoFAStepContent(a, index)}
              </Typography>
              {index == 2 && (<Link href={a!=null ? a.url : ""}>visit account</Link>)}
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
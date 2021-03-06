// eslint-disable-next-line
import React, { useState, useEffect } from "react";
// eslint-disable-next-line
import apiHandler from "../api/apiHandler";

import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
// eslint-disable-next-line
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "../styles/orders.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "none",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const useStepperStyles = makeStyles({
  paper: {
    backgroundColor: "transparent",
  },
});

function getSteps() {
  return [
    "submitted",
    // "confirmed",
    // "packed",
    // "ready to ship",
    "shipped",
    "received",
  ];
}

export default function HorizontalLabelPositionBelowStepper(props) {
  // console.log("here", props.steps)

  // const [countSubmitted, setSubmittedCount] = useState(null);
  // const [countShipped, setShippedCount] = useState(null);
  // const [countReceived, setReceivedCount] = useState(null);

  //     useEffect(() => {
  //       apiHandler.getAllOrders()
  //               .then((result) => {
  //           let counter1 = 0
  //           let counter2 = 0
  //           let counter3 = 0

  //           result.forEach((arr) => {

  //             const currentStep = arr.steps[arr.steps.length-1].stage
  //             // console.log(currentStep)
  //             if (currentStep === "submitted") counter1 += 1
  //             // else if(currentStep === "confirmed") setCount2(countConfirmed+1)
  //             // else if(currentStep === "packed") setCount3(countPacked+1)
  //             // else if(currentStep === "ready to ship") setCount4(countReadyToShip+1)
  //             else if(currentStep === "shipped") counter2 += 1
  //             else if(currentStep === "received") counter3 += 1

  //           })

  //           setSubmittedCount(counter1)
  //           setShippedCount(counter2)
  //           setReceivedCount(counter3)
  //                 },

  //                 (error) => {
  //                   console.log(error)
  //                 }
  //               )
  //           }, [countSubmitted, countShipped, countReceived])

  const classes = useStyles();
  const activeStep = 0;
  const steps = getSteps();
  const stepperClasses = useStepperStyles();
  // const arrayCount = [countSubmitted, countShipped, countReceived ]
  let { submitted, shipped, received } = props.steps;
  const arrayCount = [submitted, shipped, received];

  // console.log(arrayCount)

  if (!props.steps) {
    return <div>Loading.....</div>;
  }

  return (
    <div className={classes.root}>
      <Stepper
        activeStep={0}
        classes={{
          // active step c'est le stage en cours
          root: stepperClasses.paper, // cette ligne sert ?? override le css du component (pour le rendre transparent)
        }}
        alternativeLabel
      >
        {steps.map((
          label,
          index // ici on map l'array avec en dessous chaque label (inscription en dessous du point)
        ) => (
          <Step key={label} active={false}>
            <StepLabel>
              {arrayCount[index]}
              <br />
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? ( // ici on a un ternary. en gros: si on arrive ?? la fin de l'array, on a "all steps completed" sinon on peut progresser
          <div className="container">
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
          </div>
        ) : (
          <div>
            {/* <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography> */}
          </div>
        )}
      </div>
    </div>
  );
}

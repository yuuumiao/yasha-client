// eslint-disable-next-line
import React, { useState, useEffect } from "react";
// eslint-disable-next-line
import apiHandler from "../api/apiHandler";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
// eslint-disable-next-line
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import StepConnector from "@material-ui/core/StepConnector";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Check from "@material-ui/icons/Check";
import "../styles/orders.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "none",
    color: "#DAABB0",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#DAABB0",
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: "#DAABB0",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    color: "#DAABB0",
    zIndex: 1,
    fontSize: 18,
  },
});

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  active: {
    "& $line": {
      borderColor: "#DAABB0",
    },
  },
  completed: {
    "& $line": {
      borderColor: "#DAABB0",
    },
  },
  line: {
    borderColor: "#DAABB0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

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
  const classes = useStyles();

  // const activeStep = props.currentStep;
  const steps = getSteps();

  // eslint-disable-next-line
  const [activeStep, setActiveStep] = React.useState(
    steps.indexOf(props.currentStep) + 1
  );

  const stepperClasses = useStepperStyles();

  if (!props.currentStep) {
    return <div>Loading.....</div>;
  }

  return (
    <div className={classes.root}>
      {/* <Stepper
        activeStep={activeStep}
        classes={{
          // active step c'est le stage en cours
          root: stepperClasses.paper, // cette ligne sert ?? override le css du component (pour le rendre transparent)
        }}
        alternativeLabel
      >
        {steps.map((
          label, index // ici on map l'array avec en dessous chaque label (inscription en dessous du point)
        ) => (
          <Step key={label} >
            <StepLabel>
            <br/>
            {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper> */}

      <Stepper
        alternativeLabel
        classes={{ root: stepperClasses.paper }}
        activeStep={activeStep}
        connector={<QontoConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
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
          <div></div>
        )}
      </div>
    </div>
  );
}

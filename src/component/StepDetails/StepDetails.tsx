import React from 'react';
import { stepType } from '../../utils/types';
import Styles from './StepDetails.module.scss';

type stepDetailsProps = {
  steps: stepType[];
};

function StepDetails({ steps }: stepDetailsProps) {
  if (steps.length > 0) {
    let totalDone = 0;
    steps.forEach((step) => {
      if (step.done) {
        totalDone++;
      }
    });
    return (
      <span className={Styles.container}>
        {totalDone} of {steps.length}
      </span>
    );
  } else {
    return null;
  }
}

export default StepDetails;

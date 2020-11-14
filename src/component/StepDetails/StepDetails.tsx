import React from 'react';
import { stepType } from '../../utils/types';

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
  return <span>{totalDone} of {steps.length}</span>;
  } else {
    return null;
  }
}

export default StepDetails;

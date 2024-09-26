import React from 'react';
import CheckoutStepper from './components/steptracker';
import './App.css';

interface StepConfig {
  name: string;
  active?: boolean;  // Add an optional active field
}

const CHECKOUT_STEPS: StepConfig[] = [
  {
    name: "Initiation",
    active: false,  // Mark this step as active initially
  },
  {
    name: "Verification",
    active: true,
  },
  {
    name: "Contract",
    active: false,
  },
  {
    name: "Completion",
    active: false,
  },
];

const App: React.FC = () => {
  return (
    <>
      <CheckoutStepper stepsConfig={CHECKOUT_STEPS} />
    </>
  );
};

export default App;

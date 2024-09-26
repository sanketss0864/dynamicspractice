import * as React from 'react';
import CheckoutStepper from './components/steptracker';

export interface IDataProps {
  name?: string;
}

interface StepConfig {
  name: string;
  active?: boolean;  // Add an optional active field
}

const CHECKOUT_STEPS: StepConfig[] = [   {     "name": "Initiation",     "active": true   },   {     "name": "Verification",     "active": false   },   {     "name": "Contract",     "active": false   },   {     "name": "Completion",     "active": false   } ];

const App: React.FC<IDataProps> = ({ name }) => {

  const CHECKOUT_STEPS: StepConfig[]=JSON.parse(name || "");

  return (
    <>
      <CheckoutStepper stepsConfig={CHECKOUT_STEPS} />
    </>
  );
};

export default App;

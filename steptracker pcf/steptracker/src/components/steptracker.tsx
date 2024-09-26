import React, { useEffect, useRef, useState } from 'react';
import "./steptracker.css";

interface StepConfig {
  name: string;
  active?: boolean; // Add an optional active field
}

interface CheckoutStepperProps {
  stepsConfig: StepConfig[];
}

const CheckoutStepper: React.FC<CheckoutStepperProps> = ({ stepsConfig = [] }) => {
  const [currentStep, setCurrentStep] = useState<number>(
    stepsConfig.findIndex((step) => step.active) + 1 || 1  // Set initial step based on active field
  );
  const [margins, setMargins] = useState<{ marginLeft: number; marginRight: number }>({
    marginLeft: 0,
    marginRight: 0,
  });

  // Step refs to keep track of step elements
  const stepRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const firstStepWidth = stepRef.current[0]?.offsetWidth || 0;
    const lastStepWidth = stepRef.current[stepsConfig.length - 1]?.offsetWidth || 0;

    setMargins({
      marginLeft: firstStepWidth / 2,
      marginRight: lastStepWidth / 2,
    });
  }, [stepsConfig.length]);

  useEffect(() => {
    // Update currentStep whenever stepsConfig changes
    const activeStepIndex = stepsConfig.findIndex((step) => step.active);
    setCurrentStep(activeStepIndex + 1 || 1);
  }, [stepsConfig]);

  if (!stepsConfig.length) {
    return <></>;
  }

  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
  };

  return (
    <>
      <div className="stepper">
        {stepsConfig.map((step, index) => (
          <div
            key={step.name}
            ref={(el) => (stepRef.current[index] = el)}
            className={`step ${
              currentStep > index + 1 ? "complete" : ""
            } ${currentStep === index + 1 ? "active" : ""}`}
          >
              <div className="step-number">
          
          </div>
            <div className="step-name">{step.name}</div>
          </div>
        ))}

        <div
          className="progress-bar"
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div
            className="progress"
            style={{ width: `${calculateProgressBarWidth()}%` }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default CheckoutStepper;

import React from 'react';
import SavingsCalculator from './SavingsCalculator';

const WidgetWrapper: React.FC = () => {
  return (
    <div className="w-full h-full bg-transparent">
      <SavingsCalculator />
    </div>
  );
};

export default WidgetWrapper;
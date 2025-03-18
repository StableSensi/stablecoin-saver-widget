import React from 'react';
import SavingsCalculator from './SavingsCalculator';

const WidgetWrapper: React.FC = () => {
  return (
    <div className="w-full h-full bg-transparent overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
      <SavingsCalculator />
    </div>
  );
};

export default WidgetWrapper;
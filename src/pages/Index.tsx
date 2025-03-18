
import React from 'react';
import SavingsCalculator from '@/components/SavingsCalculator';
import { GlobeIcon } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-widget-bg to-black">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-widget-accent/20 mb-4">
            <GlobeIcon className="h-8 w-8 text-widget-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Save on International Transfers
          </h1>
          <p className="text-lg text-widget-muted max-w-2xl">
            Our blockchain-based stablecoin solution offers significant savings compared to traditional banking for cross-border transfers.
          </p>
        </div>

        <SavingsCalculator />
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-widget-card bg-opacity-50 p-6 rounded-lg border border-white/5">
            <div className="w-12 h-12 bg-widget-accent/20 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-widget-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Lower Fees</h3>
            <p className="text-widget-muted">
              Our stablecoin solution eliminates costly bank fees and hidden currency conversion charges.
            </p>
          </div>
          
          <div className="bg-widget-card bg-opacity-50 p-6 rounded-lg border border-white/5">
            <div className="w-12 h-12 bg-widget-accent/20 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-widget-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Faster Transfers</h3>
            <p className="text-widget-muted">
              Send money internationally in minutes, not days. Our blockchain technology ensures quick settlement.
            </p>
          </div>
          
          <div className="bg-widget-card bg-opacity-50 p-6 rounded-lg border border-white/5">
            <div className="w-12 h-12 bg-widget-accent/20 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-widget-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Secure & Transparent</h3>
            <p className="text-widget-muted">
              Blockchain technology provides security and transparency for all your international transfers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

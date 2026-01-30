import React from 'react';
import * as Icons from 'lucide-react';
import { StepData } from '../types';

interface StepNavProps {
  steps: StepData[];
  currentStepIndex: number;
  onStepClick: (index: number) => void;
}

const StepNav: React.FC<StepNavProps> = ({ steps, currentStepIndex, onStepClick }) => {
  return (
    <div className="w-64 bg-github-light-bg-subtle dark:bg-github-darker border-r border-github-light-border dark:border-github-border flex flex-col h-full z-10 transition-colors duration-300">
      <div className="p-4 border-b border-github-light-border dark:border-github-border flex items-center space-x-3">
        <div className="bg-github-light-text dark:bg-github-text p-1.5 rounded-full transition-colors duration-300">
           <Icons.Github className="text-github-light-bg dark:text-github-darker" size={20} />
        </div>
        <div>
          <h1 className="font-bold text-github-light-text dark:text-github-text text-sm transition-colors duration-300">Spec Kit</h1>
          <p className="text-xs text-github-light-text-muted dark:text-github-gray transition-colors duration-300">Workflow Visualizer</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 space-y-1">
        {steps.map((step, index) => {
          // Dynamic Icon component
          const IconComponent = (Icons as any)[step.icon] || Icons.Circle;
          const isActive = index === currentStepIndex;
          const isPast = index < currentStepIndex;

          return (
            <button
              key={step.id}
              onClick={() => onStepClick(index)}
              className={`w-full flex items-center px-4 py-3 text-sm transition-colors duration-200 relative ${
                isActive 
                  ? 'text-github-light-text dark:text-github-text bg-github-light-border/40 dark:bg-github-border/30 font-medium' 
                  : 'text-github-light-text-muted dark:text-github-gray hover:text-github-light-text dark:hover:text-github-text hover:bg-github-light-border/20 dark:hover:bg-github-border/10'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-github-light-blue dark:bg-github-blue shadow-[0_0_8px_rgba(9,105,218,0.4)] dark:shadow-[0_0_8px_rgba(88,166,255,0.6)]" />
              )}
              
              <div className={`mr-3 transition-colors duration-300 ${
                isActive ? 'text-github-light-blue dark:text-github-blue' : 
                isPast ? 'text-github-light-green dark:text-github-green' : 'text-github-light-text-muted dark:text-github-gray'
              }`}>
                {isPast && index !== 0 ? <Icons.Check size={16} /> : <IconComponent size={16} />}
              </div>
              
              <div className="text-left">
                <div className="truncate">{step.title}</div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="p-4 border-t border-github-light-border dark:border-github-border text-xs text-github-light-text-muted dark:text-github-gray transition-colors duration-300">
        <p className="mb-2">Spec-Driven Development</p>
        <div className="flex gap-2">
            <span className="w-2 h-2 rounded-full bg-github-light-green dark:bg-github-green"></span>
            <span>Input</span>
            <span className="w-2 h-2 rounded-full bg-github-light-blue dark:bg-github-blue ml-2"></span>
            <span>Output</span>
        </div>
      </div>
    </div>
  );
};

export default StepNav;
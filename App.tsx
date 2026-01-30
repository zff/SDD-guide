

import React, { useState, useEffect, useCallback } from 'react';
import { Play, RotateCcw, ChevronRight, Sun, Moon, ExternalLink } from 'lucide-react';
import { STEPS } from './constants';
import { SimulationState } from './types';
import Terminal from './components/Terminal';
import FileExplorer from './components/FileExplorer';
import Editor from './components/Editor';
import StepNav from './components/StepNav';
import WorkflowDiagram from './components/WorkflowDiagram';
import * as Icons from 'lucide-react';

const App: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [simState, setSimState] = useState<SimulationState>(SimulationState.IDLE);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Current step data convenience accessor
  const currentStep = STEPS[currentStepIndex];

  // Theme Toggle Effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  // Handlers
  const handleNextStep = useCallback(() => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setSimState(SimulationState.IDLE);
    }
  }, [currentStepIndex]);

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setSimState(SimulationState.IDLE);
  };

  const handleRunCommand = () => {
    if (simState === SimulationState.IDLE && currentStep.command) {
      setSimState(SimulationState.TYPING_COMMAND);
    } else if (simState === SimulationState.IDLE && !currentStep.command) {
      // Logic for steps without commands (intro)
      setSimState(SimulationState.SHOWING_RESULT);
    }
  };

  const onTypingComplete = () => {
    setSimState(SimulationState.PROCESSING);
    // Simulate processing time
    setTimeout(() => {
      setSimState(SimulationState.SHOWING_RESULT);
    }, 1200);
  };

  // Auto-run non-command steps (like intro or workflow map)
  useEffect(() => {
    if (currentStep.layout === 'diagram' || currentStepIndex === 0) {
      setSimState(SimulationState.SHOWING_RESULT);
    }
  }, [currentStepIndex, currentStep.layout]);

  // Logic to determine what to show in the Editor
  const isResultMode = simState === SimulationState.SHOWING_RESULT || simState === SimulationState.COMPLETE;
  const isLastStep = currentStepIndex === STEPS.length - 1;

  // Determine content to display
  // If we haven't run the command yet (IDLE/TYPING/PROCESSING), show the Concept content.
  // If we have results, show the File content.
  const displayContent = isResultMode ? currentStep.editorContent : (currentStep.conceptContent || '');
  const displayTitle = isResultMode ? (currentStep.activeFile || 'Untitled') : 'Command Guide';
  const displayMode = isResultMode ? 'result' : 'concept';
  
  const isDiagramMode = currentStep.layout === 'diagram';

  return (
    <div className="flex h-screen bg-github-light-bg dark:bg-github-dark text-github-light-text dark:text-github-text font-sans overflow-hidden transition-colors duration-300">
      {/* Sidebar Navigation */}
      <StepNav 
        steps={STEPS} 
        currentStepIndex={currentStepIndex} 
        onStepClick={(idx) => {
          setCurrentStepIndex(idx);
          setSimState(SimulationState.IDLE);
        }} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Bar / Header */}
        <div className="h-14 bg-github-light-bg-subtle dark:bg-github-darker border-b border-github-light-border dark:border-github-border flex items-center justify-between px-6 shadow-sm z-10 transition-colors duration-300">
          <div>
            <h2 className="font-semibold text-lg">{currentStep.title}</h2>
            <p className="text-xs text-github-light-text-muted dark:text-github-gray">{currentStep.description}</p>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Documentation Link for current step */}
            {currentStep.docLink && (
              <a 
                href={currentStep.docLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-github-light-text-muted dark:text-github-gray hover:text-github-light-blue dark:hover:text-github-blue hover:bg-github-light-border/20 dark:hover:bg-github-border/30 rounded-full transition-colors"
                title="View Template Source on GitHub"
              >
                <ExternalLink size={16} />
              </a>
            )}

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 mr-2 text-github-light-text-muted dark:text-github-gray hover:text-github-light-text dark:hover:text-github-text hover:bg-github-light-border/20 dark:hover:bg-github-border/30 rounded-full transition-colors"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {currentStepIndex > 0 && !isResultMode && !isDiagramMode && (
              <button 
                onClick={handleRunCommand}
                disabled={simState !== SimulationState.IDLE}
                className={`flex items-center px-4 py-1.5 rounded text-sm font-medium transition-colors ${
                   simState !== SimulationState.IDLE ? 'opacity-50 cursor-not-allowed text-github-light-text-muted dark:text-github-gray' : 'bg-github-light-green dark:bg-github-green text-white hover:bg-green-600 dark:hover:bg-green-700 shadow-md shadow-green-500/20 dark:shadow-green-900/20'
                }`}
              >
                <Play size={14} className="mr-2" />
                Run Command
              </button>
            )}

            {(isResultMode || isDiagramMode) && !isLastStep && (
               <button 
               onClick={handleNextStep}
               className="flex items-center px-4 py-1.5 rounded text-sm font-medium bg-github-light-blue dark:bg-github-blue text-white hover:bg-blue-600 dark:hover:bg-blue-600 shadow-md shadow-blue-500/20 dark:shadow-blue-900/20 animate-bounce-subtle"
             >
               Next Step
               <ChevronRight size={14} className="ml-2" />
             </button>
            )}

            <button 
              onClick={handleRestart}
              className="p-2 text-github-light-text-muted dark:text-github-gray hover:text-github-light-text dark:hover:text-github-text hover:bg-github-light-border/20 dark:hover:bg-github-border rounded-full transition-colors"
              title="Restart Simulation"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* IDE Layout: Split Panes */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Center Pane: Editor & Terminal */}
          <div className="flex-1 flex flex-col min-w-0 border-r border-github-light-border dark:border-github-border transition-colors duration-300">
            
            {/* Top: Editor */}
            <div className="flex-1 min-h-0 relative">
               {currentStepIndex === 0 ? (
                 <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center bg-github-light-bg dark:bg-github-dark transition-colors duration-300 overflow-hidden">
                   {/* Background Pattern */}
                   <div className="absolute inset-0 opacity-[0.4] pointer-events-none bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#30363d_1px,transparent_1px)] [background-size:20px_20px]" />
                   
                   <div className="relative z-10 flex flex-col items-center">
                    <div className="w-24 h-24 bg-github-light-text dark:bg-github-text rounded-full flex items-center justify-center mb-8 shadow-2xl transition-colors duration-300 animate-float">
                      <Play className="text-github-light-bg dark:text-github-dark ml-2" size={48} />
                    </div>
                    <h1 className="text-5xl font-bold text-github-light-text dark:text-white mb-6 tracking-tight transition-colors duration-300">GitHub Spec Kit</h1>
                    <p className="text-xl text-github-light-text-muted dark:text-github-gray max-w-xl leading-relaxed mb-10 transition-colors duration-300">
                      Spec-Driven Development Toolkit (SDD). <br/>
                      Define <strong className="text-github-light-blue dark:text-github-blue">WHAT</strong> before implementing <strong className="text-github-light-green dark:text-github-green">HOW</strong>.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                      <button 
                        onClick={() => {
                            setCurrentStepIndex(1);
                            setSimState(SimulationState.IDLE);
                        }}
                        className="px-8 py-3 bg-github-light-text dark:bg-white text-github-light-bg dark:text-github-dark font-bold rounded-full hover:scale-105 hover:shadow-xl transition-all shadow-lg"
                      >
                        Start Walkthrough
                      </button>
                      
                      <a 
                        href="https://github.com/github/spec-kit"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 bg-transparent border-2 border-github-light-text dark:border-white text-github-light-text dark:text-white font-bold rounded-full hover:bg-github-light-text hover:text-github-light-bg dark:hover:bg-white dark:hover:text-github-dark transition-all flex items-center"
                      >
                        <Icons.Github className="mr-2" size={20} />
                        View on GitHub
                      </a>
                    </div>
                   </div>
                 </div>
               ) : isDiagramMode ? (
                 <WorkflowDiagram />
               ) : (
                 <Editor 
                    step={currentStep} 
                    content={displayContent}
                    title={displayTitle}
                    mode={displayMode}
                 />
               )}
            </div>

            {/* Bottom: Terminal */}
            {currentStepIndex > 0 && !isDiagramMode && (
              <div className="h-1/3 min-h-[200px]">
                <Terminal 
                  command={currentStep.command}
                  output={currentStep.terminalOutput}
                  state={simState}
                  onTypingComplete={onTypingComplete}
                />
              </div>
            )}
          </div>

          {/* Right Pane: File Explorer */}
          <div className="w-64 hidden md:flex flex-col flex-shrink-0">
             {/* When in Concept mode, show the structure from the PREVIOUS step (as the new files haven't been created yet) */}
             <FileExplorer 
               structure={isResultMode ? currentStep.fileStructure : (STEPS[currentStepIndex - 1]?.fileStructure || [])}
               activeFile={isResultMode ? currentStep.activeFile : null}
             />
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;

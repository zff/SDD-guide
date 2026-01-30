import React, { useEffect, useState, useRef } from 'react';
import { SimulationState } from '../types';
import { Terminal as TerminalIcon } from 'lucide-react';

interface TerminalProps {
  command: string;
  output?: string;
  state: SimulationState;
  onTypingComplete: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ command, output, state, onTypingComplete }) => {
  const [displayedCommand, setDisplayedCommand] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Typing effect
  useEffect(() => {
    if (state === SimulationState.IDLE) {
      setDisplayedCommand('');
      return;
    }

    if (state === SimulationState.TYPING_COMMAND && command) {
      let index = 0;
      setDisplayedCommand('');
      
      const typeChar = () => {
        if (index < command.length) {
          setDisplayedCommand(command.substring(0, index + 1));
          index++;
          // Variable typing speed for realism
          setTimeout(typeChar, Math.random() * 30 + 20); 
        } else {
          // Finished typing
          setTimeout(onTypingComplete, 500);
        }
      };

      typeChar();
    }
  }, [command, state, onTypingComplete]);

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedCommand, output, state]);

  return (
    <div className="flex flex-col h-full bg-github-light-bg-subtle dark:bg-github-darker border-t border-github-light-border dark:border-github-border font-mono text-sm transition-colors duration-300">
      <div className="flex items-center px-4 py-2 bg-github-light-bg dark:bg-github-dark border-b border-github-light-border dark:border-github-border text-github-light-text-muted dark:text-github-gray text-xs select-none transition-colors duration-300">
        <TerminalIcon size={14} className="mr-2" />
        <span>Terminal — zsh</span>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto space-y-2 text-github-light-text dark:text-github-text transition-colors duration-300"
      >
        <div className="flex flex-col gap-1">
          <div className="flex">
            <span className="text-github-light-green dark:text-github-green mr-2">➜</span>
            <span className="text-github-light-blue dark:text-github-blue mr-2">~/project</span>
            <span className="text-github-light-text-muted dark:text-github-gray">git:(main)</span>
          </div>
          
          <div className="whitespace-pre-wrap break-all min-h-[1.5em]">
             {displayedCommand}
             {state === SimulationState.TYPING_COMMAND && showCursor && (
               <span className="bg-github-light-text dark:bg-github-text inline-block w-2 h-4 align-middle ml-1" />
             )}
          </div>
        </div>

        {(state === SimulationState.PROCESSING || state === SimulationState.SHOWING_RESULT || state === SimulationState.COMPLETE) && (
          <div className="text-github-light-text-muted dark:text-github-gray animate-pulse">
            {state === SimulationState.PROCESSING ? 'Processing...' : ''}
          </div>
        )}

        {(state === SimulationState.SHOWING_RESULT || state === SimulationState.COMPLETE) && output && (
          <div className="mt-2 text-github-light-text-muted dark:text-gray-300 whitespace-pre-wrap font-mono transition-colors duration-300">
            {output}
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;

import React from 'react';
import { StepData } from '../types';
import { FileText, CheckCircle2, Check, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

interface EditorProps {
  step: StepData;
  content: string;
  title: string;
  mode: 'concept' | 'result';
}

const Editor: React.FC<EditorProps> = ({ step, content, title, mode }) => {
  const isChecklist = !!step.checklist && mode === 'result';
  const isConcept = mode === 'concept';

  return (
    <div className="flex flex-col h-full bg-github-light-bg dark:bg-github-dark relative overflow-hidden transition-colors duration-300">
      {/* Tab Bar */}
      <div className="flex bg-github-light-bg-subtle dark:bg-github-darker border-b border-github-light-border dark:border-github-border transition-colors duration-300">
        <div className={`flex items-center px-4 py-2 bg-github-light-bg dark:bg-github-dark border-r border-github-light-border dark:border-github-border border-t-2 text-sm text-github-light-text dark:text-github-text transition-colors duration-300 ${isConcept ? 'border-t-purple-500' : 'border-t-github-light-blue dark:border-t-github-blue'}`}>
          {isConcept ? (
            <BookOpen size={14} className="mr-2 text-purple-500" />
          ) : (
            <FileText size={14} className="mr-2 text-github-light-blue dark:text-github-blue" />
          )}
          <span>{title}</span>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 p-6 overflow-y-auto font-mono text-sm leading-relaxed text-github-light-text dark:text-github-text relative transition-colors duration-300">
        {/* Line Numbers Background (Only for Result/File Mode) */}
        {!isConcept && (
          <div className="absolute left-0 top-0 bottom-0 w-12 border-r border-github-light-border dark:border-github-border bg-github-light-bg-subtle/50 dark:bg-github-darker/50 flex flex-col items-end pr-3 pt-6 text-github-light-text-muted/30 dark:text-github-gray/30 select-none transition-colors duration-300">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
        )}

        <div className={!isConcept ? "pl-8" : ""}>
          {isChecklist ? (
            <div className="space-y-4 max-w-2xl">
              <h1 className="text-xl font-bold text-github-light-text dark:text-github-text mb-6 pb-2 border-b border-github-light-border dark:border-github-border">
                Specification Quality Checklist
              </h1>
              {step.checklist?.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className="flex items-start p-3 rounded bg-github-light-bg-subtle dark:bg-github-darker border border-github-light-border dark:border-github-border"
                >
                   <div className="mt-0.5 mr-3 text-github-light-green dark:text-github-green">
                     <CheckCircle2 size={18} />
                   </div>
                   <span>{item}</span>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              key={`${step.id}-${mode}`} // Remount animation on step or mode change
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="whitespace-pre-wrap text-github-light-text dark:text-gray-300"
            >
              {isConcept ? (
                // Simple Markdown rendering simulation for Concept Mode
                <div className="font-sans max-w-3xl mx-auto space-y-4">
                    {content.split('\n').map((line, i) => {
                        if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold text-github-light-text dark:text-white pb-2 border-b border-github-light-border dark:border-github-border">{line.replace('# ', '')}</h1>;
                        if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-semibold text-github-light-text dark:text-white mt-4">{line.replace('## ', '')}</h2>;
                        if (line.startsWith('**Purpose**:')) return <p key={i} className="text-github-light-text dark:text-gray-200 mt-2"><strong className="text-purple-600 dark:text-purple-400">Purpose:</strong> {line.replace('**Purpose**:', '')}</p>;
                        if (line.startsWith('**Why it matters**:')) return <p key={i} className="text-github-light-text dark:text-gray-200 mt-4 bg-github-light-blue/10 dark:bg-github-blue/10 p-4 rounded border-l-4 border-github-light-blue dark:border-github-blue"><strong className="block mb-1 text-github-light-blue dark:text-github-blue">Why it matters:</strong> {line.replace('**Why it matters**:', '')}</p>;
                        if (line.startsWith('- ')) return <li key={i} className="ml-4 list-disc marker:text-github-light-text-muted dark:marker:text-github-gray">{line.replace('- ', '')}</li>;
                        if (line.trim() === '') return <br key={i} />;
                        return <p key={i}>{line}</p>;
                    })}
                </div>
              ) : (
                content
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Reminder / Toast (Only show in Result mode) */}
      {step.reminder && !isConcept && (
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`absolute bottom-6 right-6 max-w-sm p-4 rounded shadow-lg border-l-4 ${
            step.reminder.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/20 border-yellow-500 text-yellow-800 dark:text-yellow-200' :
            step.reminder.type === 'success' ? 'bg-green-100 dark:bg-green-900/20 border-green-500 text-green-800 dark:text-green-200' :
            'bg-blue-100 dark:bg-blue-900/20 border-blue-500 text-blue-800 dark:text-blue-200'
          }`}
        >
          <div className="flex items-start">
             <div className="mr-3 mt-1">
               {step.reminder.type === 'success' ? <Check size={18} /> : <span className="text-lg">!</span>}
             </div>
             <div>
               <p className="font-semibold text-sm mb-1 uppercase tracking-wide opacity-80">{step.reminder.type}</p>
               <p className="text-sm">{step.reminder.text}</p>
             </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Editor;

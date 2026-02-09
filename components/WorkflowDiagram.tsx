
import React from 'react';
import { ArrowRight, ArrowDown, FileText, Terminal, Layers, CheckCircle2, Database, Code, User, UserCheck, HardHat, PenTool } from 'lucide-react';
import { motion } from 'framer-motion';

const WorkflowDiagram: React.FC = () => {
  const steps = [
    {
      id: 'step0',
      label: 'Step 0: Foundation',
      role: 'Principal Architect',
      cmd: '/speckit.constitution',
      files: ['constitution.md'],
      color: 'purple',
      icon: Layers
    },
    {
      id: 'step1',
      label: 'Step 1: Define',
      role: 'Business Analyst',
      cmd: '/speckit.specify',
      files: ['spec.md'],
      color: 'blue',
      icon: FileText
    },
    {
      id: 'step2',
      label: 'Step 2: Refine',
      role: 'QA Engineer',
      cmd: '/speckit.clarify',
      files: ['spec.md (Updated)'],
      color: 'blue',
      dashed: true,
      icon: CheckCircle2
    },
    {
      id: 'step3',
      label: 'Step 3: Architect',
      role: 'Solution Architect',
      cmd: '/speckit.plan',
      files: ['plan.md', 'contracts/', 'data-model.md'],
      color: 'indigo',
      icon: Database
    },
    {
      id: 'step4',
      label: 'Step 4: Breakdown',
      role: 'Developer (Planner)',
      cmd: '/speckit.tasks',
      files: ['tasks.md'],
      color: 'orange',
      icon: Layers
    },
    {
      id: 'step5',
      label: 'Step 5: Verify',
      role: 'QA Engineer',
      cmd: '/speckit.analyze',
      files: ['tasks.md (Verified)'],
      color: 'orange',
      dashed: true,
      icon: CheckCircle2
    },
    {
      id: 'step6',
      label: 'Step 6: Build',
      role: 'Developer (Coder)',
      cmd: '/speckit.implement',
      files: ['Source Code'],
      color: 'green',
      icon: Code
    }
  ];

  const getColorClasses = (color: string, dashed: boolean) => {
    const base = dashed ? 'border-dashed border-2' : 'border border-opacity-50';
    switch (color) {
      case 'purple': return `${base} bg-purple-50 dark:bg-purple-900/10 border-purple-200 dark:border-purple-700 text-purple-900 dark:text-purple-100`;
      case 'blue': return `${base} bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-700 text-blue-900 dark:text-blue-100`;
      case 'indigo': return `${base} bg-indigo-50 dark:bg-indigo-900/10 border-indigo-200 dark:border-indigo-700 text-indigo-900 dark:text-indigo-100`;
      case 'orange': return `${base} bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-700 text-orange-900 dark:text-orange-100`;
      case 'green': return `${base} bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-700 text-green-900 dark:text-green-100`;
      default: return `${base} bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700`;
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-github-light-bg dark:bg-github-dark p-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-github-light-text dark:text-github-text mb-2">Spec Kit Workflow Map</h2>
          <p className="text-github-light-text-muted dark:text-github-gray">The AI switches roles at each step to ensure quality and structure.</p>
        </div>

        <div className="relative">
          {/* Vertical Connecting Line (Background) */}
          <div className="absolute left-[50%] top-4 bottom-4 w-px bg-github-light-border dark:border-github-border -translate-x-1/2 z-0 hidden md:block"></div>

          <div className="space-y-16 relative z-10">
            {steps.map((step, idx) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-32 items-center"
              >
                {/* Left: Step Node */}
                <div className="flex justify-start md:justify-end">
                  <div className={`w-full md:w-64 p-3 rounded-lg shadow-sm flex items-center gap-3 ${getColorClasses(step.color, !!step.dashed)} bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm z-10`}>
                    <div className="p-2 bg-white dark:bg-black/20 rounded-full flex-shrink-0">
                      <step.icon size={18} />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="font-semibold text-sm truncate">{step.label}</span>
                      <span className="text-[10px] uppercase tracking-wider opacity-70 flex items-center gap-1 font-medium">
                        {step.role === 'Business Analyst' && <User size={10} />}
                        {step.role.includes('QA') && <UserCheck size={10} />}
                        {step.role.includes('Architect') && <HardHat size={10} />}
                        {step.role.includes('Developer') && <Code size={10} />}
                        {step.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Center: Arrow & Command */}
                <div className="flex flex-col items-center justify-center gap-1">
                   {idx > 0 && <div className="h-8 w-px bg-github-light-border dark:border-github-border md:hidden"></div>}
                   <div className="hidden md:flex items-center text-github-light-text-muted dark:text-github-gray z-0">
                      <ArrowRight size={20} />
                   </div>
                   <div className="md:hidden flex items-center text-github-light-text-muted dark:text-github-gray rotate-90 my-2">
                      <ArrowRight size={16} />
                   </div>
                   
                   {/* Command Pill */}
                   <div className="md:absolute md:left-[50%] md:-translate-x-1/2 md:translate-y-0 px-4 py-1.5 bg-github-light-bg-subtle dark:bg-github-darker border border-github-light-border dark:border-github-border rounded-full text-xs font-mono text-github-light-blue dark:text-github-blue shadow-sm whitespace-nowrap z-20">
                     {step.cmd}
                   </div>
                </div>

                {/* Right: Artifacts */}
                <div className="flex justify-start items-center gap-2">
                  <div className="hidden md:flex items-center text-github-light-text-muted dark:text-github-gray mr-2 z-0">
                     <ArrowRight size={20} />
                  </div>
                  <div className="bg-white dark:bg-github-darker border border-github-light-border dark:border-github-border rounded p-3 shadow-sm min-w-[180px] text-sm text-github-light-text dark:text-github-text bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm z-10">
                     <div className="flex flex-col gap-1">
                       {step.files.map(f => (
                         <div key={f} className="flex items-center gap-2">
                           <FileText size={14} className="text-github-light-text-muted dark:text-github-gray" />
                           <span className="font-mono text-xs">{f}</span>
                         </div>
                       ))}
                     </div>
                  </div>
                </div>
                
                {/* Connection to next step visual for mobile */}
                {idx < steps.length - 1 && (
                  <div className="flex justify-center md:hidden">
                    <ArrowDown size={20} className="text-github-light-border dark:text-github-gray opacity-50" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowDiagram;

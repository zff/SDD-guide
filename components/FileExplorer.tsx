import React from 'react';
import { Folder, FileCode, ChevronRight, ChevronDown } from 'lucide-react';
import { FileNode } from '../types';
import { motion } from 'framer-motion';

interface FileExplorerProps {
  structure: FileNode[];
  activeFile: string | null;
}

const FileItem: React.FC<{ node: FileNode; depth: number; activeFile: string | null }> = ({ node, depth, activeFile }) => {
  const isFolder = node.type === 'folder';
  const isActive = node.name === activeFile;
  
  // Highlight animation for new files
  const isHighlighted = node.highlight;

  return (
    <div className="select-none">
      <motion.div 
        initial={isHighlighted ? { backgroundColor: 'rgba(35, 134, 54, 0.4)' } : {}}
        animate={{ backgroundColor: isActive ? 'rgba(88, 166, 255, 0.15)' : 'rgba(0,0,0,0)' }}
        transition={{ duration: 0.5 }}
        className={`flex items-center py-1 hover:bg-github-light-border/30 dark:hover:bg-github-border/30 cursor-pointer transition-colors duration-200 ${isActive ? 'text-github-light-blue dark:text-github-blue' : 'text-github-light-text dark:text-github-text'}`}
        style={{ paddingLeft: `${depth * 12 + 12}px` }}
      >
        <span className="mr-1.5 opacity-70">
          {isFolder ? (
             node.isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
          ) : (
            <span className="w-3.5 inline-block" />
          )}
        </span>
        
        <span className="mr-2">
          {isFolder ? (
            <Folder size={16} className="text-github-light-blue dark:text-github-blue fill-github-light-blue/20 dark:fill-github-blue/20" />
          ) : (
            <FileCode size={16} className={isActive ? 'text-github-light-blue dark:text-github-blue' : 'text-github-light-text-muted dark:text-github-gray'} />
          )}
        </span>
        
        <span className="text-sm truncate">{node.name}</span>
        
        {isHighlighted && (
          <motion.span 
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="ml-auto mr-2 w-2 h-2 rounded-full bg-github-light-green dark:bg-github-green"
          />
        )}
      </motion.div>

      {isFolder && node.children && node.isOpen && (
        <div className="flex flex-col">
          {node.children.map((child, idx) => (
            <FileItem key={`${child.name}-${idx}`} node={child} depth={depth + 1} activeFile={activeFile} />
          ))}
        </div>
      )}
    </div>
  );
};

const FileExplorer: React.FC<FileExplorerProps> = ({ structure, activeFile }) => {
  return (
    <div className="flex flex-col h-full bg-github-light-bg-subtle dark:bg-github-dark border-l border-github-light-border dark:border-github-border transition-colors duration-300">
      <div className="px-4 py-3 text-xs font-semibold text-github-light-text-muted dark:text-github-gray uppercase tracking-wider border-b border-github-light-border dark:border-github-border transition-colors duration-300">
        Explorer
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        {structure.length === 0 ? (
          <div className="px-4 text-sm text-github-light-text-muted dark:text-github-gray italic">No files yet</div>
        ) : (
          structure.map((node, idx) => (
            <FileItem key={`${node.name}-${idx}`} node={node} depth={0} activeFile={activeFile} />
          ))
        )}
      </div>
    </div>
  );
};

export default FileExplorer;
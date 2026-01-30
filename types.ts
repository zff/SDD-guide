

export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string; // For files
  highlight?: boolean;
  isOpen?: boolean;
}

export interface StepData {
  id: string;
  title: string;
  icon: string;
  command: string;
  description: string;
  conceptContent?: string; // New: Explanation of the command
  fileStructure: FileNode[]; // Snapshot of file structure at this step
  activeFile: string | null; // Which file to show in editor
  editorContent: string; // Content to display in editor (simulated result)
  reminder?: {
    type: 'warning' | 'info' | 'success';
    text: string;
  };
  terminalOutput?: string;
  checklist?: string[]; // For the checklist step
  layout?: 'default' | 'diagram'; // Control rendering mode
  docLink?: string; // Link to external documentation/template
}

export enum SimulationState {
  IDLE,
  TYPING_COMMAND,
  PROCESSING,
  SHOWING_RESULT,
  COMPLETE
}

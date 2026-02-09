
import { StepData } from './types';

export const STEPS: StepData[] = [
  {
    id: 'intro',
    title: 'Start',
    icon: 'Play',
    command: '',
    description: 'Welcome to GitHub Spec Kit. Transform vague requirements into executable code.',
    fileStructure: [],
    activeFile: null,
    editorContent: '',
    terminalOutput: 'Ready to initialize Spec-Driven Development workflow...',
    layout: 'default',
    docLink: 'https://github.com/github/spec-kit'
  },
  {
    id: 'workflow',
    title: 'Workflow Map',
    icon: 'Map',
    command: '',
    description: 'Overview of the Spec-Driven Development lifecycle.',
    fileStructure: [],
    activeFile: null,
    editorContent: '',
    layout: 'diagram',
    docLink: 'https://github.com/github/spec-kit'
  },
  {
    id: 'constitution',
    title: '1. Constitution',
    icon: 'Book',
    command: '/speckit.constitution Create principles focused on code quality, testing standards, user experience consistency, and performance requirements.',
    description: 'Defining project principles and governance.',
    conceptContent: `# /speckit.constitution

### 🎩 Current Role: Principal Architect

**Focus**: Governance, Standards, and Project DNA.

**Action**: Establishes the foundational principles and governance for the project. 

This command generates a \`constitution.md\` file that serves as the "Supreme Law". It defines:
- **Code Quality Standards**: Linting, formatting, test coverage.
- **Architectural Guidelines**: Preferred patterns, modularity.
- **UX/UI Principles**: Design system alignment, accessibility.

**Why it matters**: Without a constitution, decisions become subjective. This file ensures all AI-generated or human-written code aligns with agreed-upon standards.`,
    fileStructure: [
      {
        name: '.specify',
        type: 'folder',
        isOpen: true,
        children: [
          {
            name: 'memory',
            type: 'folder',
            isOpen: true,
            children: [
              { name: 'constitution.md', type: 'file', highlight: true }
            ]
          }
        ]
      }
    ],
    activeFile: 'constitution.md',
    editorContent: `# Project Core Principles

1. **Code Quality**: All features must adhere to PEP 8 / ESLint standards. Unit test coverage ≥ 80%.
2. **UX Consistency**: Follow GitHub Design System. Interactions must align with existing product patterns.
3. **Performance**: Page load time ≤ 2s (LCP). API response ≤ 500ms (P95).
4. **Governance**: Technical stack decisions must prioritize team-standardized stacks (e.g., React/TypeScript).`,
    reminder: {
      type: 'warning',
      text: 'constitution.md is the project "Constitution". All subsequent steps must align with these principles.'
    },
    layout: 'default',
    docLink: 'https://github.com/github/spec-kit/blob/main/templates/commands/constitution.md'
  },
  {
    id: 'specify',
    title: '2. Specify',
    icon: 'FileText',
    command: '/speckit.specify Build an application to organize photos in albums. Group by date, drag-and-drop reordering. Tile interface.',
    description: 'Describing the WHAT and WHY, ignoring the HOW.',
    conceptContent: `# /speckit.specify

### 🎩 Current Role: Business Analyst (BA)

**Focus**: Defines the "What" (User Value) and "Why" (Motivation).

**Action**: Writes the User Stories and Functional Requirements. 

They strictly ignore technology (e.g., no mention of databases or frameworks) to ensure the business logic is pure. This command initiates a new feature branch and creates a \`spec.md\`.

**Why it matters**: Separating requirements from implementation prevents "solutionizing" too early and ensures the problem is well-understood before coding begins.`,
    fileStructure: [
      {
        name: '.specify',
        type: 'folder',
        children: [
          {
            name: 'memory',
            type: 'folder',
            children: [{ name: 'constitution.md', type: 'file' }]
          }
        ]
      },
      {
        name: 'specs',
        type: 'folder',
        isOpen: true,
        children: [
          {
            name: '001-photo-album-app',
            type: 'folder',
            isOpen: true,
            children: [{ name: 'spec.md', type: 'file', highlight: true }]
          }
        ]
      }
    ],
    activeFile: 'spec.md',
    editorContent: `# Functional Spec: Photo Album App

## Core Scenarios
- Users can create date-grouped albums.
- Drag-and-drop sorting supported.
- Flat hierarchy (no nested albums).

## Functional Requirements
1. **Creation**: Input name + date range to generate album.
2. **Sorting**: Persist local order upon drag.
3. **Preview**: Reverse chronological grid view.

## Assumptions & Clarifications
- Assumption: EXIF data used for dates.
- [NEEDS CLARIFICATION]: Batch upload support?`,
    reminder: {
      type: 'info',
      text: 'spec.md is the "Single Source of Truth". Clarify ambiguities before proceeding.'
    },
    layout: 'default',
    docLink: 'https://github.com/github/spec-kit/blob/main/templates/commands/specify.md'
  },
  {
    id: 'clarify',
    title: '3. Clarify',
    icon: 'Search',
    command: '/speckit.clarify Focus on photo upload requirements: support batch upload of up to 50 photos per album, and auto-extract EXIF data.',
    description: 'Resolving ambiguities in the specification.',
    conceptContent: `# /speckit.clarify

### 🎩 Current Role: QA Engineer

**Focus**: Finds Ambiguities and Edge Cases.

**Action**: Acts as an **Interviewer**.

The QA Engineer reviews the Spec to find missing details (e.g., "What happens if the user is offline?", "What about invalid input?"). They ask specific questions to fix holes in the spec before any code is written.

**Why it matters**: Ambiguity is the root cause of most bugs. Fixing requirements here costs 10x less than fixing code later.`,
    fileStructure: [
      {
        name: 'specs',
        type: 'folder',
        isOpen: true,
        children: [
          {
            name: '001-photo-album-app',
            type: 'folder',
            isOpen: true,
            children: [{ name: 'spec.md', type: 'file', highlight: true }]
          }
        ]
      }
    ],
    activeFile: 'spec.md',
    editorContent: `# Functional Spec: Photo Album App
...

## Assumptions & Clarifications (Resolved)
- Assumption: Photo metadata (taken time) read from file EXIF.
- **Clarified**: Support batch upload (max 50/batch). Auto-extract EXIF date for grouping.`,
    reminder: {
      type: 'success',
      text: 'Clarification resolved. Prioritize high-impact questions.'
    },
    layout: 'default',
    docLink: 'https://github.com/github/spec-kit/blob/main/templates/commands/clarify.md'
  },
  {
    id: 'plan',
    title: '4. Plan',
    icon: 'Map',
    command: '/speckit.plan The application uses Vite, vanilla HTML/CSS/JS, SQLite for metadata, SortableJS for drag-drop.',
    description: 'Defining the technical approach (The HOW).',
    conceptContent: `# /speckit.plan

### 🎩 Current Role: Solution Architect

**Focus**: Defines the "How" (Technology & Structure).

**Action**: Translates the BA's requirements into a technical blueprint. 

They decide the Tech Stack, define Data Models, and create API Contracts to ensure the system is feasible and scalable. They generate \`plan.md\` and \`data-model.md\`.

**Why it matters**: Planning acts as a bridge between abstract requirements and concrete code. It ensures the proposed solution is compliant with the project constitution.`,
    fileStructure: [
      {
        name: 'specs',
        type: 'folder',
        isOpen: true,
        children: [
          {
            name: '001-photo-album-app',
            type: 'folder',
            isOpen: true,
            children: [
              { name: 'spec.md', type: 'file' },
              { name: 'plan.md', type: 'file', highlight: true },
              { name: 'data-model.md', type: 'file' },
              { name: 'research.md', type: 'file' }
            ]
          }
        ]
      }
    ],
    activeFile: 'plan.md',
    editorContent: `# Implementation Plan

## Tech Stack
- **Frontend**: Vite + Vanilla TS/CSS.
- **Libs**: SortableJS (drag), exif-js (meta).
- **Storage**: SQLite (wasm/local).

## Core Architecture
1. **Data Layer**: SQLite tables (albums/photos).
2. **Interaction**: SortableJS bound to grid container.
3. **View**: CSS Grid, responsive layout.`,
    reminder: {
      type: 'info',
      text: 'Check research.md for library comparisons (e.g., SortableJS vs others).'
    },
    layout: 'default',
    docLink: 'https://github.com/github/spec-kit/blob/main/templates/commands/plan.md'
  },
  {
    id: 'analyze',
    title: '5. Verify',
    icon: 'ShieldCheck',
    command: '/speckit.analyze',
    description: 'Validating spec, plan, and tasks integrity.',
    conceptContent: `# /speckit.analyze

### 🎩 Current Role: QA Engineer (Auditor)

**Focus**: Verification and Safety.

**Action**: Acts as an **Auditor**.

Checks if the Technical Plan actually covers all requirements in the Spec before coding begins. Checks for potential security issues or "hallucinated" dependencies.

**Why it matters**: This is the "Quality Gate". It prevents logical errors from propagating into the implementation phase.`,
    fileStructure: [
      {
        name: 'specs',
        type: 'folder',
        isOpen: true,
        children: [
          {
            name: '001-photo-album-app',
            type: 'folder',
            isOpen: true,
            children: [
              { name: 'spec.md', type: 'file' },
              { name: 'plan.md', type: 'file' },
              { name: 'tasks.md', type: 'file' }
            ]
          }
        ]
      }
    ],
    activeFile: 'Analysis Report',
    editorContent: '', 
    checklist: [
      'Spec-Plan Alignment: 100%',
      'Security Scan: Passed (0 issues)',
      'Task Coverage: All requirements mapped',
      'Context Window Efficiency: Optimized'
    ],
    reminder: {
      type: 'success',
      text: 'Analysis passed. Ready for implementation.'
    },
    layout: 'default',
    docLink: 'https://github.com/github/spec-kit/blob/main/templates/commands/analyze.md'
  },
  {
    id: 'tasks',
    title: '6. Tasks',
    icon: 'List',
    command: '/speckit.tasks',
    description: 'Breaking down the plan into executable units.',
    conceptContent: `# /speckit.tasks

### 🎩 Current Role: Developer (Planner)

**Focus**: Execution and Planning.

**Action**: Breaks the architecture into small, sequential steps (Task List).

They convert the \`plan.md\` into atomic tasks in \`tasks.md\`, defining dependencies and "Definition of Done" for each.

**Why it matters**: LLMs (and humans) struggle with massive contexts. Breaking work into small, verified steps dramatically increases success rates.`,
    fileStructure: [
      {
        name: 'specs',
        type: 'folder',
        isOpen: true,
        children: [
          {
            name: '001-photo-album-app',
            type: 'folder',
            isOpen: true,
            children: [
              { name: 'spec.md', type: 'file' },
              { name: 'plan.md', type: 'file' },
              { name: 'tasks.md', type: 'file', highlight: true }
            ]
          }
        ]
      }
    ],
    activeFile: 'tasks.md',
    editorContent: `# Task Breakdown

## Layer 1: Foundation
### [T001] Project Setup
- **File**: package.json, vite.config.ts
- **Action**: Init Vite, install SortableJS/exif-js.
- **Verify**: npm run dev works.

## Layer 2: Data
### [T002] Database Core [P]
- **File**: src/db/index.ts
- **Action**: Create SQLite tables (albums, photos).
- **Verify**: CRUD operations pass tests.`,
    reminder: {
      type: 'info',
      text: 'Tasks marked [P] can be executed in parallel by the team.'
    },
    layout: 'default',
    docLink: 'https://github.com/github/spec-kit/blob/main/templates/commands/tasks.md'
  },
  {
    id: 'implement',
    title: '7. Implement',
    icon: 'Cpu',
    command: '/speckit.implement',
    description: 'Generating code and verifying outcomes.',
    conceptContent: `# /speckit.implement

### 🎩 Current Role: Developer (Coder)

**Focus**: Implementation.

**Action**: Writes the actual code.

Follows the strict rules of the Architect and the requirements of the BA. Reads the task, generates the code, runs the tests, and updates the project files.

**Why it matters**: This is where the rubber meets the road. Because previous steps ensured clarity and structure, the code generation is highly accurate.`,
    fileStructure: [
      {
        name: 'src',
        type: 'folder',
        isOpen: true,
        children: [
          { name: 'db', type: 'folder', children: [{ name: 'index.ts', type: 'file' }] },
          { name: 'components', type: 'folder', children: [{ name: 'AlbumGrid.ts', type: 'file' }] },
          { name: 'main.ts', type: 'file' }
        ]
      },
      { name: 'index.html', type: 'file', highlight: true },
      { name: 'package.json', type: 'file' }
    ],
    activeFile: 'index.html',
    editorContent: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Photo Album App</title>
  </head>
  <body>
    <div id="app">
      <header>My Albums</header>
      <main class="grid-container">
        <!-- Generated by Component -->
      </main>
    </div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>`,
    terminalOutput: `[T001] Init Vite Project... ✅
[T002] Create SQLite Schema... ✅
[T003] Implement Drag & Drop... ✅
[SUCCESS] Application generated successfully.`,
    reminder: {
      type: 'success',
      text: 'Code generated. Manual verification of UX logic (drag-drop) required.'
    },
    layout: 'default',
    docLink: 'https://github.com/github/spec-kit/blob/main/templates/commands/implement.md'
  }
];

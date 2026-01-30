

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

**Purpose**: Establishes the foundational principles and governance for the project.

This command generates a \`constitution.md\` file that serves as the "Supreme Law" for the project. It defines:
- **Code Quality Standards**: Linting, formatting, test coverage.
- **Architectural Guidelines**: Preferred patterns, modularity.
- **UX/UI Principles**: Design system alignment, accessibility.
- **Performance Budgets**: Load times, bundle sizes.

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

**Purpose**: Captures the "What" and "Why" of the feature, strictly avoiding the "How".

This command initiates a new feature branch and creates a \`spec.md\`.
- **Focus**: User stories, functional requirements, business logic.
- **Constraint**: No technical implementation details (no mentioning React, SQL, etc. yet).
- **Outcome**: A pure requirement document that serves as the single source of truth.

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

**Purpose**: Identifies and resolves ambiguities in the specification.

This command analyzes \`spec.md\` to find:
- **Missing Edge Cases**: "What happens if the user is offline?"
- **Vague Terms**: "Make it fast" vs "Load under 200ms".
- **Contradictions**: Conflicting requirements.

It prompts for decisions and updates \`spec.md\` with a "Clarified" section.

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

**Purpose**: Defines the technical implementation strategy ("The How").

This command reads the \`constitution.md\` and \`spec.md\` to generate:
- **plan.md**: Tech stack choices, library selection, architectural diagrams.
- **data-model.md**: Schema definitions, API contracts.
- **research.md**: Trade-off analysis (e.g., Library A vs Library B).

**Why it matters**: Planning acts as a bridge between abstract requirements and concrete code. It ensures the proposed solution is feasible and compliant with the project constitution.`,
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
    id: 'checklist',
    title: '5. Checklist',
    icon: 'CheckSquare',
    command: '/speckit.checklist',
    description: 'Validating spec and plan integrity.',
    conceptContent: `# /speckit.checklist

**Purpose**: Validates the integrity of the Spec and Plan before execution.

This command runs a static analysis on your markdown files to verify:
- **Completeness**: Are all critical sections present?
- **Alignment**: Does the Plan contradict the Constitution?
- **Testability**: Are requirements specific enough to be tested?

**Why it matters**: This is the "Quality Gate". It prevents low-quality instructions from being fed into the coding phase, reducing hallucinations and logic errors.`,
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
              { name: 'plan.md', type: 'file' }
            ]
          }
        ]
      }
    ],
    activeFile: 'Quality Checklist',
    editorContent: '', 
    checklist: [
      'No implementation details in spec.md (WHAT only)',
      'All requirements are testable',
      'Tech plan aligns with Constitution performance goals',
      'No unresolved critical clarifications'
    ],
    reminder: {
      type: 'success',
      text: 'Quality gates passed. Ready for task breakdown.'
    },
    layout: 'default',
    docLink: 'https://github.com/github/spec-kit/blob/main/templates/commands/checklist.md'
  },
  {
    id: 'tasks',
    title: '6. Tasks',
    icon: 'List',
    command: '/speckit.tasks',
    description: 'Breaking down the plan into executable units.',
    conceptContent: `# /speckit.tasks

**Purpose**: Breaks down the implementation plan into atomic, executable units.

This command converts \`plan.md\` into \`tasks.md\`:
- **Granularity**: Small, isolated tasks (e.g., "Create DB Schema", "Setup API Endpoint").
- **Dependencies**: Identifies which tasks must happen sequentially vs parallely.
- **Verification**: Defines "Definition of Done" for each task.

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

**Purpose**: Executes the tasks to generate the actual codebase.

This command iterates through \`tasks.md\`:
1. **Context Loading**: Reads relevant parts of Spec, Plan, and existing Code.
2. **Generation**: Writes code for the specific task.
3. **Verification**: specific tests or checks.
4. **Integration**: Updates the project files.

**Why it matters**: This is where the rubber meets the road. Because previous steps ensured clarity and structure, the code generation is highly accurate and requires minimal debugging.`,
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

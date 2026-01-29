# TaskFlow

A task management dashboard built with React, TypeScript, Redux, and Redux Saga.

## Design Reference

For designs, see the [Figma file](https://www.figma.com/design/fe5MUTn4Tqi4QIn61bKiyw/Coding-Challenge?node-id=0-1&p=f&t=l64vdcuOSSxtEsAD-0).

## Features

- View tasks in different states (Todo, In Progress, Done)
- Create, edit, and delete tasks
- Filter tasks by status, search query, and assignee
- View task statistics and completion rates
- Assign tasks to team members

### Partially Implemented Features (To Be Completed)

- **Due Dates**: Display and highlight overdue tasks
- **Task Comments**: Add and view comments on tasks
- **Bulk Actions**: Select and perform actions on multiple tasks

## Important: Business Rules

**Before implementing features or fixing bugs, read `PRODUCT_REQUIREMENTS.md`** - it contains critical business rules that all implementations must follow, including:

- Status transition rules (which status changes are allowed)
- Priority validation rules (constraints on high-priority tasks)
- Due date display rules (styling and formatting requirements)
- Bulk action rules (constraints on bulk operations)

## Tech Stack

- **Frontend**: React 18, TypeScript
- **State Management**: Redux, Redux Saga
- **Styling**: CSS Modules with SCSS
- **Build Tool**: Vite
- **Testing**: Vitest, React Testing Library, Cypress

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm ci
```

### Development

Start the mock API server:
```bash
npm run server
```

Start the development server:
```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Testing

Run unit tests:
```bash
npm test
```

Run E2E tests:
```bash
npm run cypress
```

## Project Structure

```
src/
├── App.tsx
├── TaskList.tsx
├── TaskCard.tsx
├── TaskForm.tsx
├── TaskFilter.tsx
├── TaskStats.tsx
├── TaskDueDate.tsx      # Feature: Due date display (partial)
├── TaskComments.tsx     # Feature: Task comments (partial)
├── BulkActions.tsx      # Feature: Bulk actions (partial)
├── TaskContext.tsx
├── taskSaga.ts
├── taskReducer.ts
├── taskActions.ts
├── userActions.ts
├── userReducer.ts
├── userSaga.ts
├── store.ts
├── api.ts
├── types.ts
├── hooks.ts
├── styles.module.scss
└── main.tsx
```

---

## Candidate Section

*Please update this section with your findings and changes.*

### Bugs Found and Fixed

1. **Bug #1**: [Description]
   - Location:
   - Issue:
   - Fix:

2. **Bug #2**: [Description]
   - Location:
   - Issue:
   - Fix:

*(Continue for all bugs found)*

### Features Implemented

#### Due Dates
*Describe your implementation approach*

#### Task Comments
*Describe your implementation approach*

#### Bulk Actions
*Describe your implementation approach*

### Code Organization

*Describe your folder structure decisions here.*

### Testing Approach

*Describe your testing strategy and what tests you added.*

#### Unit Tests Added:
1.
2.
3.
4.
5.

#### E2E Tests Added:
1.
2.
3.

### Additional Improvements

*List any bonus improvements you made.*

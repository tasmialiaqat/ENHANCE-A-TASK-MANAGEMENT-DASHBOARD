# TaskFlow - Frontend Developer Take-Home Assignment

## Overview

TaskFlow is a task management dashboard application built with React, TypeScript, Redux, and Redux Saga. The application allows users to create, edit, delete, and filter tasks.

**Your mission:** This codebase contains several bugs and issues that need to be identified and fixed. Additionally, there are incomplete features that need to be implemented, and the test coverage needs to be expanded.

## Important: Read the Product Requirements First

**Before you begin**, read `PRODUCT_REQUIREMENTS.md` thoroughly. This document contains business rules that:
- Define how features should behave
- Constrain what operations are allowed
- May reveal bugs where the current code violates these rules

All your implementations and fixes must comply with these requirements.

## Design Reference

For designs, see the [Figma file](https://www.figma.com/design/fe5MUTn4Tqi4QIn61bKiyw/Coding-Challenge?node-id=0-1&p=f&t=l64vdcuOSSxtEsAD-0).

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm ci
```

### Running the Application

Start the mock API server:
```bash
npm run server
```

In a separate terminal, start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Running Tests

Unit tests:
```bash
npm test
```

E2E tests (requires both servers running):
```bash
npm run cypress
```

---

## Your Tasks

### 1. Bug Hunting and Fixes

The codebase contains bugs of varying difficulty. For each bug you find:
1. Identify the issue
2. Explain why it's a problem
3. Fix it
4. Add a comment explaining the fix

### 2. Feature Implementation

There are **3 partially implemented features** that need to be completed. Each feature has a placeholder component.

**Important:** All features must comply with the business rules in `PRODUCT_REQUIREMENTS.md`.

#### Feature 1: Task Due Dates (`src/TaskDueDate.tsx`)
- Display task due dates in a human-readable format
- Visually indicate when a task is overdue (past due date and not completed)
- Show "No due date" for tasks without a due date
- The data structure already includes `dueDate` field on tasks
- **Must follow the Due Date Display Rules in PRODUCT_REQUIREMENTS.md** (styling, relative time, completed task handling)

#### Feature 2: Task Comments (`src/TaskComments.tsx`)
- Fetch and display comments for each task
- Allow users to add new comments
- Display commenter's name and timestamp
- Handle loading and error states
- Discover API patterns by examining existing code (`api.ts`, `taskSaga.ts`)

#### Feature 3: Bulk Actions (`src/BulkActions.tsx`)
- Add selection checkboxes to task cards
- Display count of selected tasks
- Implement bulk delete functionality
- Implement bulk status change functionality
- **Must follow the Bulk Action Rules in PRODUCT_REQUIREMENTS.md** (high-priority restrictions, status transition constraints)

### 3. Code Organization

The `src/` directory currently has a flat structure with all files at the root level. Reorganize the code into a logical folder structure that demonstrates best practices for React applications.

Consider organizing by:
- Feature/domain
- Component type (components, hooks, state, etc.)
- Or a combination approach

### 4. Testing Requirements

#### Fix Existing Tests
- There is at least one failing test that needs to be fixed
- There are skipped tests that need to be enabled and completed

#### Add New Tests

**React Testing Library (at least 5 new tests):**
- Test TaskForm submission and validation
- Test TaskFilter functionality
- Test TaskStats calculations
- Test error handling states
- Test the features you implement (Due Dates, Comments, Bulk Actions)

**Cypress E2E (at least 3 complete test scenarios):**
You must implement at least 3 E2E tests. Choose from:
- Complete task creation flow
- Task filtering by status/search/assignee
- Task editing or deletion flow
- Due dates feature tests
- Comments feature tests
- Bulk actions feature tests

### 5. Documentation

Update the README.md to include:
- A summary of bugs found and how you fixed them
- Your rationale for the folder organization
- A description of your testing approach
- Any additional improvements you made

---

## Evaluation Criteria

Your submission will be evaluated on:

1. **Bug Detection** - How many bugs did you find and fix?
2. **Feature Implementation** - Are the features complete and working correctly?
3. **Testing** - Are your tests comprehensive and well-structured?
4. **Code Quality** - Are your fixes and implementations clean and well-explained?
5. **Organization** - Is your folder structure logical and maintainable?
6. **Documentation** - Is your README clear and thorough?

---

## Technical Notes

- The project uses **Redux Toolkit with Redux Saga** for state management. If you prefer a different state management solution, feel free to refactor - we're interested in seeing your approach.
- Styling uses **CSS Modules with SCSS**
- The mock server simulates network delays to mimic real-world conditions
- TypeScript is used throughout - maintain type safety in your implementations

## Bonus Points

While not required, you'll earn extra consideration for:
- Additional features or enhancements beyond the requirements
- Performance optimizations beyond bug fixes
- Accessibility improvements
- Additional test coverage beyond requirements
- Clean, maintainable code architecture

---

## Submission

Please include:
1. The complete codebase with your changes
2. Updated README.md with your documentation

Good luck!

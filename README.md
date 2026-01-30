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

### Candidate Section
### Bugs Found and Fixed
### Bug #1: Circular Dependency Crash

Location: store.ts and taskReducer.ts

Issue: The RootState type was being exported from the store and imported into selectors within the reducer file, while the store simultaneously imported the reducer. This created a circular loop that caused the application to fail during initialization.

Fix: Decoupled the architecture by moving RootState and AppDispatch definitions into a central hooks.ts file and created typed versions of useDispatch and useSelector (useAppDispatch, useAppSelector).

### Bug #2: Priority UI Mismatch

Location: styles.module.scss

Issue: The CSS classes for task priority borders did not align with standard urgency visual cues (e.g., High priority was rendered in Yellow/Warning instead of Red/Danger).

Fix: Updated the SCSS variables and class logic to map High priority to $danger-color (Red), Medium to $warning-color (Orange), and Low to $success-color (Green) for intuitive UX.

Features Implemented
Due Dates
Approach: Implemented a "Date-Aware" UI. I added a dueDate field to the Task interface and created a utility function to compare the current date with the task date.

UX: Added a conditional .overdue CSS class that triggers a red warning state if the task remains incomplete past its deadline.

Task Comments
Approach: Created a nested data structure within each task object to store an array of comment objects.

Implementation: Developed a dedicated CommentsSection component that allows users to append timestamped notes to tasks without reloading the main task list, leveraging Redux to maintain the local state update.

Bulk Actions
Approach: Implemented a "Selection State" in the Redux store.

Logic: Created a BulkActions component that renders conditionally when selectedTaskIds.length > 0. I integrated "Safety Guards" within the Saga middleware to filter out high-priority tasks from bulk deletion and prevent illegal status transitions (e.g., preventing a 'Todo' task from being set to 'Done' without an intermediate 'In Progress' step).

Code Organization
I followed a Feature-Based Module structure to ensure scalability:

/store: Centralized Redux configuration and Saga root.

/hooks: Typed Redux wrappers to prevent circular dependencies.

/components: Atomic components (TaskCard, TaskFilter) for high reusability.

/styles: SCSS modules to prevent global namespace pollution and ensure style encapsulation.

Testing Approach
Strategy: Focused on State Integrity and User Flow Validation. I prioritized testing the Redux-Saga logic as it handles the application's most critical business rules.

Unit Tests Added:

taskReducer.test.ts: Validates that bulk actions correctly update multiple task statuses in one state change.

validation.test.ts: Ensures the "Safety Guard" logic correctly blocks high-priority deletions.

E2E Tests Added:

Bulk Selection Flow: Validates that clicking multiple checkboxes toggles the visibility of the Bulk Actions bar.

Form Submission: Ensures the TaskForm correctly creates a task and adds it to the top of the list.

Additional Improvements
Sticky UI: Made the Header and Bulk Actions bar "Sticky" to ensure controls remain accessible even when navigating long task lists.

Empty State Management: Added a dedicated "No Tasks Found" view with a call-to-action button to improve the onboarding experience for new users.

Saga Effect Optimization: Used takeLatest for search and filter actions to prevent race conditions during rapid user input.


### Additional Improvements

Sticky UI: Made the Header and Bulk Actions bar "Sticky" to ensure controls remain accessible even when navigating long task lists.

Empty State Management: Added a dedicated "No Tasks Found" view with a call-to-action button to improve the onboarding experience for new users.

Saga Effect Optimization: Used takeLatest for search and filter actions to prevent race conditions during rapid user input.

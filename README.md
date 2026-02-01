TaskFlow
A professional-grade task management dashboard built with React, TypeScript, Redux, and Redux Saga. This project focuses on complex state management, data integrity through business rules, and a clean, scalable architecture.

📸 Screenshots
Dashboard Overview
<img width="1920" height="876" alt="Screenshot (20)" src="https://github.com/user-attachments/assets/938444c8-0f15-4230-a898-6bc4be7c6211" />
<img width="1920" height="885" alt="Screenshot (21)" src="https://github.com/user-attachments/assets/2da60371-daa1-4e62-9cef-7446fb379594" />

Task Management

🚀 Features
Dynamic Task Tracking: View and manage tasks in different states (Todo, In Progress, Done).

Advanced Filtering: Filter tasks by status, search queries, and specific team members.

Task Statistics: Real-time calculation of completion rates and priority distribution.

Safety-First Operations: Critical business rules enforced via Redux-Saga (e.g., status transition constraints).

Responsive Dashboard: Sidebar-driven layout with sticky headers for efficient navigation.

🛠 Tech Stack
Frontend: React 18, TypeScript

State Management: Redux Toolkit, Redux Saga (Side-effect management)

Styling: CSS Modules with SCSS

Build Tool: Vite

Testing: Vitest, React Testing Library, Cypress (E2E)

📁 Project Structure
Plaintext
src/
├── components/          # Atomic components (TaskCard, TaskFilter, etc.)
├── hooks/               # Custom typed hooks (useAppSelector, useAppDispatch)
├── store/               # Redux store configuration and Sagas
├── types/               # Global TypeScript interfaces and types
├── styles/              # SCSS Modules and global variables
├── App.tsx              # Application shell
└── main.tsx             # Entry point
👨‍💻 Candidate Report & Contributions
🐛 Bugs Found and Fixed
1. Circular Dependency Crash
Location: store.ts & taskReducer.ts

Issue: Exporting RootState from the store and importing it back into selectors created a runtime initialization loop.

Fix: Moved RootState and AppDispatch definitions to hooks.ts. Implemented typed wrappers useAppDispatch and useAppSelector to decouple the store from the slice logic.

2. Priority UI Mismatch
Location: styles.module.scss

Issue: Priority borders used non-standard coloring (High priority appeared Yellow).

Fix: Realigned variables to map High to $danger-color (Red), Medium to $warning-color (Orange), and Low to $success-color (Green).

✨ Features Implemented
Due Dates (Logic & UI)
Approach: Added dueDate support to the task interface and created utility functions for real-time date comparison.

UX: Implemented an .overdue class that highlights tasks in Red if the current date exceeds the deadline while the status is not 'Done'.

Task Comments
Approach: Extended the task data model to support nested timestamped comment objects.

Implementation: Created a CommentsSection component that allows for seamless entry and viewing of notes without interrupting the main dashboard flow.

Bulk Actions
Approach: Centralized a selectionState in Redux to track IDs.

Logic: Integrated "Safety Guards" in the Saga middleware. This prevents bulk actions on high-priority tasks and blocks illegal status transitions (e.g., skipping the 'In Progress' phase) during batch updates.

🧪 Testing Approach
Strategy: Focused on state integrity for business-critical operations.

Unit Testing: Verified that the taskReducer handles multiple status updates accurately.

E2E Testing: Validated the full "Selection-to-Action" user flow using Cypress to ensure UI components sync with the Redux state.

🛠 Installation & Setup
Install Dependencies

Bash
npm ci
Run Mock Server (Backend)

Bash
npm run server
Run Development Server (Frontend)

Bash
npm run dev
Run Tests

Bash
npm test             # Unit Tests
npm run cypress      # E2E Tests

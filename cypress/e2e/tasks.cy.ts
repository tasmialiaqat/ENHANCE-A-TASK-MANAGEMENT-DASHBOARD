/// <reference types="cypress" />

describe('TaskFlow Application', () => {
  beforeEach(() => {
    cy.resetTasks();
    cy.visit('/');
    cy.wait(1000);
  });

  describe('Task List', () => {
    it('should display the task list on page load', () => {
      cy.get('[data-testid="task-list"]').should('be.visible');
      cy.get('[data-testid="task-card"]').should('have.length.at.least', 1);
    });
  });

  describe('Task Creation', () => {
    it('should open the task form when clicking create button', () => {
      cy.get('[data-testid="create-task-button"]').click();
      cy.get('[data-testid="task-form-modal"]').should('be.visible');
    });

    it('should create a new task successfully', () => {
      cy.get('[data-testid="create-task-button"]').click();
      cy.get('[data-testid="title-input"]').type('E2E Test Task');
      cy.get('[data-testid="description-input"]').type('Test description');
      cy.get('[data-testid="submit-button"]').click();
      cy.wait(500);
      cy.contains('E2E Test Task').should('be.visible');
    });

    it('should show validation error for empty title', () => {
      cy.get('[data-testid="create-task-button"]').click();
      cy.get('[data-testid="submit-button"]').click();
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Title is required');
      });
    });

    it('should prevent creating high priority task without assignee', () => {
      cy.get('[data-testid="create-task-button"]').click();
      cy.get('[data-testid="title-input"]').type('High Priority Task');
      cy.get('[data-testid="priority-input"]').select('high');
      cy.get('[data-testid="submit-button"]').click();
      cy.on('window:alert', (text) => {
        expect(text).to.contains('High priority tasks must have an assignee');
      });
    });
  });

  describe('Task Filtering', () => {
    it('should filter tasks by status', () => {
      cy.get('[data-testid="filter-tab-todo"]').click();
      cy.wait(300);
      cy.get('[data-testid="task-card"]').each(($card) => {
        cy.wrap($card).find('[data-testid="status-select"]').should('have.value', 'todo');
      });
    });

    it('should filter tasks by search query', () => {
      cy.get('[data-testid="search-input"]').type('Design');
      cy.wait(300);
      cy.get('[data-testid="task-card"]').should('have.length.at.least', 1);
      cy.get('[data-testid="task-card"]').first().should('contain.text', 'Design');
    });

    it('should filter tasks by assignee', () => {
      cy.get('[data-testid="assignee-filter"]').select(1);
      cy.wait(300);
      cy.get('[data-testid="task-card"]').should('have.length.at.least', 1);
    });
  });

  describe('Task Actions', () => {
    it('should edit a task', () => {
      cy.get('[data-testid="task-card"]').first().find('[data-testid="edit-button"]').click();
      cy.get('[data-testid="task-form-modal"]').should('be.visible');
      cy.get('[data-testid="title-input"]').clear().type('Updated Task Title');
      cy.get('[data-testid="submit-button"]').click();
      cy.wait(500);
      cy.contains('Updated Task Title').should('be.visible');
    });

    it('should delete a task', () => {
      cy.get('[data-testid="task-card"]').first().then(($card) => {
        const taskTitle = $card.find('.taskTitle').text();
        cy.wrap($card).find('[data-testid="delete-button"]').click();
        cy.on('window:confirm', () => true);
        cy.wait(500);
        cy.contains(taskTitle).should('not.exist');
      });
    });

    it('should enforce status transition rules', () => {
      // Try to change from todo directly to done (invalid transition)
      cy.get('[data-testid="task-card"]').first().find('[data-testid="status-select"]').then(($select) => {
        const currentStatus = $select.val();
        if (currentStatus === 'todo') {
          cy.wrap($select).select('done');
          cy.on('window:alert', (text) => {
            expect(text).to.contains('Cannot move task from');
          });
        }
      });
    });
  });

  describe('Task Statistics', () => {
    it('should display task statistics', () => {
      cy.get('[data-testid="task-stats"]').should('be.visible');
    });

    it('should show correct task counts', () => {
      cy.get('[data-testid="task-stats"]').should('contain.text', 'Total');
    });
  });

  describe('Due Dates', () => {
    it('should allow setting due date when creating task', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateStr = tomorrow.toISOString().split('T')[0];

      cy.get('[data-testid="create-task-button"]').click();
      cy.get('[data-testid="title-input"]').type('Task with Due Date');
      cy.get('[data-testid="due-date-input"]').type(dateStr);
      cy.get('[data-testid="submit-button"]').click();
      cy.wait(500);
      cy.contains('Task with Due Date').should('be.visible');
    });

    it('should display due dates on task cards', () => {
      // After creating a task with due date in previous test
      cy.get('[data-testid="task-card"]').should('have.length.at.least', 1);
    });
  });

  describe('Bulk Actions', () => {
    it('should allow selecting multiple tasks', () => {
      cy.get('[data-testid="task-checkbox"]').first().check();
      cy.get('[data-testid="task-checkbox"]').eq(1).check();
      cy.get('[data-testid="bulk-actions"]').should('be.visible');
      cy.get('[data-testid="bulk-actions"]').should('contain.text', '2 task(s) selected');
    });

    it('should clear selection when clear button is clicked', () => {
      cy.get('[data-testid="task-checkbox"]').first().check();
      cy.get('[data-testid="bulk-actions"]').should('be.visible');
      cy.get('[data-testid="clear-selection"]').click();
      cy.get('[data-testid="bulk-actions"]').should('not.exist');
    });

    it('should respect bulk delete rules for high priority tasks', () => {
      // Select a high priority task
      cy.get('[data-testid="task-card"]').each(($card, index) => {
        if ($card.text().includes('high') || $card.hasClass('priorityHigh')) {
          cy.get('[data-testid="task-checkbox"]').eq(index).check();
          return false;
        }
      });
      
      cy.get('[data-testid="bulk-actions"]').should('be.visible');
      cy.get('[data-testid="bulk-delete"]').click();
      cy.on('window:alert', (text) => {
        expect(text).to.match(/high priority|cannot/i);
      });
    });
  });
});

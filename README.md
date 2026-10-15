# Angular 22 — To-Do List Application

A simple, responsive, and beginner-friendly **To-Do List application built using Angular 22, TypeScript, HTML, and CSS**.

This project demonstrates the fundamental concepts of Angular, including standalone components, signals, computed signals, data binding, event handling, control flow, and reactive state management.

The application allows users to create, manage, complete, and delete daily tasks through a clean and easy-to-use interface.

## Project Overview

The main objective of this project is to understand how Angular works by building a practical application.

Instead of focusing on complex features, this project covers the essential concepts required to get started with Angular development.

Users can add tasks, mark them as completed, delete individual tasks, and view the number of remaining tasks.

**Technology Stack**

| Technology | Purpose |
|---|---|
| Angular 22 | Frontend framework |
| TypeScript | Application logic |
| HTML5 | Application structure |
| CSS3 | Styling and responsive layout |
| Angular Signals | Reactive state management |
| Angular FormsModule | Two-way data binding |
| Angular CLI | Project creation and development |

## Features

- Add new tasks
- Display all tasks
- Mark tasks as completed or incomplete
- Delete individual tasks
- Clear all completed tasks
- Display the number of remaining tasks
- Prevent empty tasks from being added
- Add tasks using the Enter key
- Responsive layout for desktop and mobile devices
- Automatic UI updates using Angular Signals

## Getting Started

### Prerequisites

Before running the project, make sure you have the following installed:

- Node.js (a version supported by Angular 22)
- npm
- Angular CLI 22
- Visual Studio Code or another code editor

### Install Angular CLI

```bash
npm install -g @angular/cli@22
```

Verify the installation:

```bash
ng version
```

### Create the Project

```bash
ng new todo-app --standalone --routing=false --style=css --skip-tests
```

Navigate to the project directory:

```bash
cd todo-app
```

### Install Dependencies

If you have cloned the project from GitHub, run:

```bash
npm install
```

### Run the Application

```bash
ng serve -o
```

The application will open in your browser at:

http://localhost:4200/

Angular automatically reloads the application when you modify and save the source files.

## Project Structure

```text
todo-app/
│
├── src/
│   ├── app/
│   │   ├── app.ts
│   │   ├── app.html
│   │   └── app.css
│   │
│   ├── main.ts
│   ├── index.html
│   └── styles.css
│
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

### Important Files

| File | Description |
|---|---|
| `app.ts` | Contains component logic and task management methods |
| `app.html` | Contains the user interface |
| `app.css` | Contains component-specific styles |
| `styles.css` | Contains global application styles |
| `main.ts` | Bootstraps the Angular application |
| `angular.json` | Contains Angular workspace configuration |
| `package.json` | Contains dependencies and npm scripts |
| `tsconfig.json` | Contains TypeScript configuration |

## Angular Concepts Used

This project covers several important Angular concepts.

### 1. Standalone Components

Angular applications are built using components.

A component controls a particular part of the user interface and typically contains a TypeScript class, an HTML template, and CSS styles.

This project uses a standalone component, which does not require an NgModule.

```typescript
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
```

### 2. TypeScript Interfaces

Interfaces define the structure of objects.

The `Todo` interface ensures that every task contains an ID, title, and completion status.

```typescript
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
```

### 3. Angular Signals

Signals are used to store reactive application state.

```typescript
tasks = signal<Todo[]>([]);
```

When the signal value changes, Angular automatically updates the relevant parts of the user interface.

For example:

```typescript
this.tasks.update(tasks => [...tasks, task]);
```

This adds a new task without directly modifying the existing array.

### 4. Computed Signals

Computed signals calculate values based on other signals.

In this project, a computed signal counts the number of incomplete tasks.

```typescript
remainingTasks = computed(() =>
  this.tasks().filter(task => !task.completed).length
);
```

The remaining task count updates automatically whenever the task list changes.

### 5. Interpolation

Interpolation displays TypeScript values inside HTML.

```html
<p>{{ task.title }}</p>
```

Angular replaces the expression with the current task title.

### 6. Event Binding

Event binding allows the application to respond to user interactions.

```html
<button (click)="addTask()">Add Task</button>
```

Clicking the button executes the `addTask()` method.

### 7. Two-Way Data Binding

Two-way data binding synchronizes values between HTML inputs and TypeScript properties.

```html
<input [(ngModel)]="newTask" />
```

When the user types into the input field, the `newTask` property is updated.

The application imports `FormsModule` to use `ngModel`.

### 8. Property Binding

Property binding dynamically sets HTML element properties.

```html
<input
  type="checkbox"
  [checked]="task.completed"
/>
```

The checkbox reflects the task's completion status.

### 9. Class Binding

Class binding applies CSS classes conditionally.

```html
<span [class.completed]="task.completed">
  {{ task.title }}
</span>
```

Completed tasks are displayed with a line-through style.

### 10. Angular Control Flow

Angular provides built-in control flow syntax for displaying lists and conditional content.

**Using `@for`:**

```html
@for (task of tasks(); track task.id) {
  <p>{{ task.title }}</p>
}
```

This displays all tasks.

**Using `@if`:**

```html
@if (tasks().length > 0) {
  <p>Tasks available</p>
}
```

This displays content only when the condition is true.

**Using `@empty`:**

```html
@for (task of tasks(); track task.id) {
  <p>{{ task.title }}</p>
} @empty {
  <p>No tasks available.</p>
}
```

This displays a message when there are no tasks.

## Application Functionality

### Add a Task

The user enters a task title and clicks the Add Task button.

The application validates the input, creates a task object, and adds it to the task list.

```typescript
addTask() {
  const title = this.newTask.trim();

  if (!title) {
    return;
  }

  const task: Todo = {
    id: Date.now(),
    title: title,
    completed: false
  };

  this.tasks.update(tasks => [...tasks, task]);

  this.newTask = '';
}
```

### Complete a Task

Users can mark tasks as completed or incomplete by clicking a checkbox.

```typescript
toggleTask(id: number) {
  this.tasks.update(tasks =>
    tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    )
  );
}
```

### Delete a Task

Users can remove individual tasks by clicking the Delete button.

```typescript
deleteTask(id: number) {
  this.tasks.update(tasks =>
    tasks.filter(task => task.id !== id)
  );
}
```

### Clear Completed Tasks

Users can remove all completed tasks with a single click.

```typescript
clearCompleted() {
  this.tasks.update(tasks =>
    tasks.filter(task => !task.completed)
  );
}
```

### Count Remaining Tasks

The application automatically calculates how many tasks are incomplete.

```typescript
remainingTasks = computed(() =>
  this.tasks().filter(task => !task.completed).length
);
```

## How the Application Works

The application follows a simple workflow:

1. The user enters a task.
2. Angular synchronizes the input value using `ngModel`.
3. The user clicks Add Task or presses Enter.
4. Event binding calls the `addTask()` method.
5. TypeScript creates a new task object.
6. The Angular signal updates the task array.
7. Angular automatically updates the user interface.
8. The new task appears in the list.
9. The remaining task count updates automatically.

**Application Flow:**

```text
User Input
    |
    v
HTML Template
    |
    v
Event Binding
    |
    v
TypeScript Method
    |
    v
Angular Signal Update
    |
    v
Automatic UI Update
```

## TypeScript Concepts Used

| Concept | Purpose |
|---|---|
| Classes | Organize application logic |
| Interfaces | Define task structure |
| Methods | Perform task operations |
| Arrays | Store multiple tasks |
| Arrow Functions | Provide concise callback functions |
| `map()` | Update selected tasks |
| `filter()` | Remove or select tasks |
| Spread Operator | Create new arrays and objects |
| `if` Statement | Validate task input |
| `trim()` | Remove unwanted whitespace |
| `const` | Declare values that are not reassigned |
| Generics | Define type-safe reactive data |

## Styling and Responsive Design

The application uses plain CSS to provide a clean and responsive user interface.

CSS Flexbox is used to align input fields, buttons, and task items.

Media queries help the application adapt to smaller screens.

```css
@media (max-width: 480px) {
  .input-section {
    flex-direction: column;
  }
}
```

No external CSS framework is required.

## Current Limitations

This is a beginner-level application designed for learning Angular fundamentals.

The application currently stores tasks in memory using Angular Signals.

Tasks will be lost when the browser is refreshed.

The project does not currently include a backend API, database, user authentication, or permanent data storage.

## Future Improvements

The application can be enhanced with additional features such as:

- LocalStorage integration to preserve tasks
- Edit existing tasks
- Search and filter tasks
- Task priority levels
- Task due dates
- Separate active and completed task views
- Reusable Angular components
- Angular services for task management
- Backend API integration
- Database storage
- User authentication
- Unit testing

## Learning Outcomes

By completing this project, you will understand how to:

- Create an Angular application using Angular CLI
- Work with standalone components
- Write application logic using TypeScript
- Build templates using Angular HTML syntax
- Handle events and user interactions
- Use interpolation and data binding
- Manage reactive state with Angular Signals
- Use computed signals for derived values
- Display dynamic lists using `@for`
- Display conditional content using `@if`
- Work with TypeScript interfaces and arrays
- Create responsive interfaces using CSS

## Build for Production

To generate a production build, run:

```bash
ng build
```

Angular creates optimized build files in the configured output directory under `dist/`.

These files can be deployed to a static web hosting service.

## Conclusion

The Angular 22 To-Do List application is a simple project for learning modern Angular development.

It demonstrates how Angular components, TypeScript, HTML templates, signals, and data binding work together to build an interactive user interface.

The project provides a foundation for developing more advanced Angular applications.

---

**Project:** Angular 22 To-Do List

**Framework:** Angular 22

**Language:** TypeScript

**Styling:** CSS3

**Level:** Beginner

**Purpose:** Learning Angular fundamentals through practical implementation

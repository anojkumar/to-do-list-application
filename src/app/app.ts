
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  // Store the text entered by the user
  newTask = '';

  // Store all tasks using an Angular signal
  tasks = signal<Todo[]>([]);

  // Automatically calculate remaining tasks
  remainingTasks = computed(() =>
    this.tasks().filter(task => !task.completed).length
  );

  // Add a new task
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

  // Mark task completed or incomplete
  toggleTask(id: number) {
    this.tasks.update(tasks =>
      tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  // Delete a task
  deleteTask(id: number) {
    this.tasks.update(tasks =>
      tasks.filter(task => task.id !== id)
    );
  }

  // Remove all completed tasks
  clearCompleted() {
    this.tasks.update(tasks =>
      tasks.filter(task => !task.completed)
    );
  }
}

import { Component } from '@angular/core';

interface Task {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent {
  newTaskTitle: string = '';
  newTaskDescription: string = '';
  editingTask: Task | undefined;
  tasks: Task[] = [];
  nextId: number = 1; // For generating unique IDs

  addTask(): void {
    if (this.newTaskTitle.trim() && this.newTaskDescription.trim()) {
      this.tasks.push({
        id: this.nextId++,
        title: this.newTaskTitle,
        description: this.newTaskDescription
      });
      this.newTaskTitle = '';
      this.newTaskDescription = '';
    }
  }

  editTask(task: Task): void {
    this.editingTask = { ...task };
  }

  saveTask(): void {
    if (this.editingTask) {
      const index = this.tasks.findIndex(t => t.id === this.editingTask!.id);
      if (index !== -1) {
        this.tasks[index] = this.editingTask;
        this.editingTask = undefined;
      }
    }
  }

  cancelEdit(): void {
    this.editingTask = undefined;
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}

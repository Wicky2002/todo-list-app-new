import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskService, Task} from './task.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
selector: 'app-root',
standalone: true,
imports: [CommonModule, FormsModule, DragDropModule, HttpClientModule],
providers: [TaskService],
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent {
title = 'My Tasks';
darkMode = false;

newTask = '';
newCategory = 'General';
newTime = '';
newPriority: 'Low' | 'Moderate' | 'High' = 'Moderate';
newStatus: 'Not Started' | 'In Progress' | 'Completed' = 'Not Started';

tasks: (Task & { editing?: boolean })[] = [];

constructor(private taskService: TaskService) {}

ngOnInit() {
this.loadTasks();
}

loadTasks() {
  this.taskService.getTasks().subscribe({
    next: tasks => {
      console.log('Tasks loaded:', tasks);
      this.tasks = tasks.map(t => ({ ...t, editing: false }));
    },
    error: err => {
      console.error('Failed to load tasks:', err);
    }
  });
}


toggleDarkMode() {
this.darkMode = !this.darkMode;
document.body.classList.toggle('dark', this.darkMode);
}

addTask() {
    if (this.newTask.trim()) {
      const newTask: Task = {
        title: this.newTask,
        category: this.newCategory,
        priority: this.newPriority,
        status: this.newStatus,
        time: this.newTime,
        completed: this.newStatus === 'Completed',
      };
      this.taskService.addTask(newTask).subscribe(added => {
        this.tasks.push({ ...added, title: added.title, editing: false });
        this.resetForm();
      });
    }
  }

 resetForm() {
    this.newTask = '';
    this.newTime = '';
    this.newCategory = 'General';
    this.newPriority = 'Moderate';
    this.newStatus = 'Not Started';
  }

editTask(index: number) {
this.tasks[index].editing = true;
}

saveTask(index: number) {
    const task = this.tasks[index];
    const updatedTask: Task = {
      title: task.title,
      category: task.category,
      priority: task.priority,
      status: task.status,
      time: task.time,
      completed: task.status === 'Completed',
    };
    if (task.id != null) {
      this.taskService.updateTask(task.id, updatedTask).subscribe(updated => {
        this.tasks[index] = { ...updated, title: updated.title, editing: false };
      });
    }
  }

  deleteTask(index: number) {
    const task = this.tasks[index];
    if (task.id != null) {
      this.taskService.deleteTask(task.id).subscribe(() => {
        this.tasks.splice(index, 1);
      });
    }
  }

drop(event: { previousIndex: number; currentIndex: number }) {
    const prevIndex = event.previousIndex;
    const currIndex = event.currentIndex;
    const moved = this.tasks.splice(prevIndex, 1)[0];
    this.tasks.splice(currIndex, 0, moved);
  }
}
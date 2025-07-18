import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
selector: 'app-root',
standalone: true,
imports: [CommonModule, FormsModule, DragDropModule],
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

tasks: {
text: string;
editing: boolean;
category: string;
time: string;
status: 'Not Started' | 'In Progress' | 'Completed';
priority: 'Low' | 'Moderate' | 'High';
}[] = [];

toggleDarkMode() {
this.darkMode = !this.darkMode;
document.body.classList.toggle('dark', this.darkMode);
}

addTask() {
if (this.newTask.trim()) {
this.tasks.push({
text: this.newTask,
editing: false,
category: this.newCategory || 'General',
time: this.newTime || 'Anytime',
status: this.newStatus,
priority: this.newPriority
});
this.newTask = '';
this.newTime = '';
this.newCategory = 'General';
this.newPriority = 'Moderate';
this.newStatus = 'Not Started';
}
}

editTask(index: number) {
this.tasks[index].editing = true;
}

saveTask(index: number) {
this.tasks[index].editing = false;
}

deleteTask(index: number) {
this.tasks.splice(index, 1);
}

drop(event: { previousIndex: number; currentIndex: number }) {
const prevIndex = event.previousIndex;
const currIndex = event.currentIndex;
const moved = this.tasks.splice(prevIndex, 1)[0];
this.tasks.splice(currIndex, 0, moved);
}
}
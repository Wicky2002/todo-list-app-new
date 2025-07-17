import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
selector: 'app-root',
standalone: true,
imports: [FormsModule, NgFor, NgIf],
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent {
title = 'todo';
newTask = '';
tasks: { text: string; editing: boolean }[] = [];

addTask() {
if (this.newTask.trim()) {
this.tasks.push({ text: this.newTask, editing: false });
this.newTask = '';
}
}

deleteTask(index: number) {
this.tasks.splice(index, 1);
}

editTask(index: number) {
this.tasks[index].editing = true;
}

saveTask(index: number) {
this.tasks[index].editing = false;
}
}
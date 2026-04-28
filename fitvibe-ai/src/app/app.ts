import { Component, signal } from '@angular/core';
import { HomeComponent } from "./components/home/home";

@Component({
  selector: 'app-root',
  imports: [ HomeComponent ],
  template: `<app-home></app-home>`,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('fitvibe-ai');
}

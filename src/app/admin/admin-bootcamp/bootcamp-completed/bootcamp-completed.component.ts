import { Component, EventEmitter, Input, Output } from '@angular/core';
import { bootcampClasses } from '../bootcamp.model';

@Component({
  selector: 'tr[app-bootcamp-completed]',
  standalone: true,
  imports: [],
  templateUrl: './bootcamp-completed.component.html',
  styleUrl: './bootcamp-completed.component.css'
})
export class BootcampCompletedComponent {
  @Input({required : true}) bootcampCompleted!: bootcampClasses
  @Output() loadData = new EventEmitter<void>();
}

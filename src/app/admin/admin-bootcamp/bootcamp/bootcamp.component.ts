import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { bootcampClasses } from '../bootcamp.model';

@Component({
  selector: 'app-bootcamp',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './bootcamp.component.html',
  styleUrl: './bootcamp.component.css'
})
export class BootcampComponent {
  @Input({required: true}) bootcampclasses!: bootcampClasses;
  @Output() deleted = new EventEmitter<void>();
  onDelete() {

  }
}

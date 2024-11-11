import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BootcampPlaned } from '../bootcamp.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'tr[app-bootcamp-planed]',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './bootcamp-planed.component.html',
  styleUrl: './bootcamp-planed.component.css'
})
export class BootcampPlanedComponent {
  @Input({required: true}) bootcampPlanned!: BootcampPlaned;
  @Output() deleted = new EventEmitter<void>();
}

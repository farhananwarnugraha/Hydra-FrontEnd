import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BootcampActive } from '../bootcamp.model';

@Component({
  selector: 'tr[app-bootcamp-active]',
  standalone: true,
  imports: [],
  templateUrl: './bootcamp-active.component.html',
  styleUrl: './bootcamp-active.component.css'
})
export class BootcampActiveComponent {
  @Input({required: true}) bootcampActivesData!: BootcampActive
  @Output() deleted = new EventEmitter<void>();
}

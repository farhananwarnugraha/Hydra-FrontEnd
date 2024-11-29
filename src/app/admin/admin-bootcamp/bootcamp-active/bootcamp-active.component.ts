import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BootcampActive } from '../bootcamp.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'tr[app-bootcamp-active]',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './bootcamp-active.component.html',
  styleUrl: './bootcamp-active.component.css'
})
export class BootcampActiveComponent {
  @Input({required: true}) bootcampActivesData!: BootcampActive
  @Output() deleted = new EventEmitter<void>();
}

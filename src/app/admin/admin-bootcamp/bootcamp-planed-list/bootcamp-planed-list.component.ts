import { Component, inject } from '@angular/core';
import { BootcampPlaned } from '../bootcamp.model';
import { BootcampService } from '../bootcamp.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bootcamp-planed-list',
  standalone: true,
  imports: [],
  templateUrl: './bootcamp-planed-list.component.html',
  styleUrl: './bootcamp-planed-list.component.css'
})
export class BootcampPlanedListComponent {
  bootcampPlaneds!: BootcampPlaned;
  bootcampPlanedsData!: BootcampPlaned[];
  totalPages!: number;

  private _bootcampService = inject(BootcampService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
}

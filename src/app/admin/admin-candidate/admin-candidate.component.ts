import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-candidate',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './admin-candidate.component.html',
  styleUrl: './admin-candidate.component.css'
})
export class AdminCandidateComponent {

}

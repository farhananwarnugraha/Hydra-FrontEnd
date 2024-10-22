import { Component } from '@angular/core';
import { DashboardGuestComponent } from "./dashboard-guest/dashboard-guest.component";

@Component({
  selector: 'app-guest',
  standalone: true,
  imports: [DashboardGuestComponent],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.css'
})
export class GuestComponent {

}

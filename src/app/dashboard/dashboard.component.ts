import { Component } from '@angular/core';
import { NavigationComponent } from "../admin/navigation/navigation.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavigationComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}

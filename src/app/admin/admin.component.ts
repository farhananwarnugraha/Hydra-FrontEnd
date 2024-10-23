import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { HeaderAdminComponent } from "./header-admin/header-admin.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HeaderComponent, HeaderAdminComponent, NavigationComponent, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}

import { Component } from '@angular/core';
import { JumbotronComponent } from "../jumbotron/jumbotron.component";
import { CardClassComponent } from "../card-class/card-class.component";
import { TestimonialSliderComponent } from "../testimonial-slider/testimonial-slider.component";
import { DownBannerComponent } from "../down-banner/down-banner.component";
import { FooterGuestComponent } from "../footer-guest/footer-guest.component";
import { AllClassesComponent } from "../all-classes/all-classes.component";
import { HeaderComponent } from "../../header/header.component";
import { NavigationComponent } from "../../navigation/navigation.component";

@Component({
  selector: 'app-dashboard-guest',
  standalone: true,
  imports: [JumbotronComponent, CardClassComponent, TestimonialSliderComponent, DownBannerComponent, FooterGuestComponent, AllClassesComponent, HeaderComponent],
  templateUrl: './dashboard-guest.component.html',
  styleUrl: './dashboard-guest.component.css'
})
export class DashboardGuestComponent {

}

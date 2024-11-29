import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { SubNavigationComponent } from "./sub-navigation/sub-navigation.component";
import { BootcampService } from '../bootcamp.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { BootcampActiveScheduleListComponent } from "./bootcamp-active-schedule-list/bootcamp-active-schedule-list.component";

@Component({
  selector: 'app-sub-bootcamp-active',
  standalone: true,
  imports: [BootcampActiveScheduleListComponent, RouterOutlet, RouterLink, SubNavigationComponent],
  templateUrl: './sub-bootcamp-active.component.html',
  styleUrl: './sub-bootcamp-active.component.css'
})
export class SubBootcampActiveComponent implements OnInit {
 @Input({required : true}) bootcampId!: number
//  @Output() batchBootcamp = new EventEmitter<number>();

 constructor(private bootcampService: BootcampService, private route: ActivatedRoute){
 }
  ngOnInit(): void {
    // this.bootcampId = this.route.snapshot.paramMap.get('bootcampId')!
    console.log(this.bootcampId);
    this.bootcampService.setBatch(this.bootcampId)
    // console.log(this.route.snapshot.paramMap.get('bootcampId'));

  }


}

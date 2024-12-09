import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sub-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sub-navigation.component.html',
  styleUrl: './sub-navigation.component.css'
})
export class SubNavigationComponent implements OnInit {
  ngOnInit(): void {
    // this.batchBootcamp = this._route.snapshot.parent?.paramMap.get('bootcampId')!
    console.log(this._route.snapshot.children)
  }
  private _route = inject(ActivatedRoute)


}

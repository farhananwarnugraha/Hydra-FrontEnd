import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { InfoUser } from '../../users/users.model';
import { AuthService } from '../../users/auth.service';
import { AdminBootcampButtonComponent } from "./admin-bootcamp-button/admin-bootcamp-button.component";
import { BootcampService } from './bootcamp.service';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-bootcamp',
  standalone: true,
  imports: [RouterLink, RouterOutlet, AdminBootcampButtonComponent],
  templateUrl: './admin-bootcamp.component.html',
  styleUrl: './admin-bootcamp.component.css'
})
export class AdminBootcampComponent implements OnInit, OnDestroy {
  user: InfoUser | null = null;

  // batch : number | null = null;
  batchBootcamp: number | null = null;
  private routerSubscription: Subscription = new Subscription;
  private _authSevice = inject(AuthService);
  private _bootcampService = inject(BootcampService);
  private _route = inject(ActivatedRoute)
  private _router = inject(Router)
  private _crd = inject(ChangeDetectorRef)

  ngOnInit(): void {
    this._authSevice.currentUser$.subscribe((user) => this.user = user);
    // this.batchBootcamp = this._route.snapshot.parent?.paramMap.get('bootcampId')!
    // console.log(this._route.snapshot.parent?.routeConfig?.loadChildren)
    this._bootcampService.currentBatch$.subscribe((batch) => {
      this.batchBootcamp = batch;
      console.log(this.batchBootcamp);
      this._crd.detectChanges();
    })

    // this.batchBootcamp = this._bootcampService.currentBatch$
    this.routerSubscription = this._router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      if(!event.url.startsWith('/admin/bootcamps/active-bootcamp')){
        this._resetBatch();
      }
    })
  }

  private _resetBatch(){
    this.batchBootcamp = null
  }

  ngOnDestroy(): void {
   if(this.routerSubscription){
    this.routerSubscription.unsubscribe();
   }
  }

}

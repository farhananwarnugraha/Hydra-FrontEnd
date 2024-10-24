import { Component, inject, OnInit } from '@angular/core';
import { BootcampClass } from '../bootcamp.model';
import { FormControl, FormGroup } from '@angular/forms';
import { BootcampService } from '../bootcamp.service';

@Component({
  selector: 'app-bootcamp-list',
  standalone: true,
  imports: [],
  templateUrl: './bootcamp-list.component.html',
  styleUrl: './bootcamp-list.component.css'
})
export class BootcampListComponent implements OnInit{
  bootcamps!: BootcampClass;


  formFilter = new FormGroup({
    descriptionBootcamp: new FormControl(''),
    batchBootcamp: new FormControl(0),
  });

  private _bootcampService = inject(BootcampService);

  ngOnInit(): void {

    this.loadBootcampData();
  }

  private loadBootcampData(){
    this._bootcampService.getAllBootcampClass({
      descriptionBootcamp: this.formFilter.get('descriptionBootcamp')?.value,
      batchBootcamp: this.formFilter.get('batchBootcamp')?.value
    }).subscribe((result) => {
      this.bootcamps = result.data;
    })
  }
}

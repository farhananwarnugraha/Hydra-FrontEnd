import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'table[app-table-layout]',
  standalone: true,
  imports: [],
  templateUrl: './table-layout.component.html',
  styleUrl: './table-layout.component.css',
  encapsulation: ViewEncapsulation.None
})
export class TableLayoutComponent {
  @Input({ required: true }) headers!: string[];
}

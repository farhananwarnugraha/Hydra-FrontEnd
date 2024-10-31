import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-candidate-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './candidate-form.component.html',
  styleUrl: './candidate-form.component.css'
})
export class CandidateFormComponent implements OnInit {
  candidateForm = new FormGroup({

  });
  onSubmit() {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}

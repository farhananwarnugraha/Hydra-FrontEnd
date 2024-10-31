import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-candidate-form',
  standalone: true,
  imports: [ReactiveFormsModule],
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

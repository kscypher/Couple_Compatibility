import { Component } from '@angular/core';
import { CompatibilityService } from '../compatibility.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  name1: string = '';
  answers1: number[] = [];
  name2: string = '';
  answers2: number[] = [];
  compatibilityResult: any;

  questions = [
    "How do you prefer to spend your weekends?",
    "Which of these is most important to you in a relationship?"
    // Add more questions as needed
  ];

  constructor(private compatibilityService: CompatibilityService) { }

  submitForm() {
    // Check if names and answers are filled in
    if (this.name1 && this.name2 && this.answers1.length && this.answers2.length) {
      this.compatibilityService.calculateCompatibility(this.name1, this.answers1, this.name2, this.answers2)
        .subscribe(result => {
          this.compatibilityResult = result;
        }, error => {
          console.error('Error calculating compatibility', error);
        });
    } else {
      console.error('Names and answers must be filled in');
    }
  }
}

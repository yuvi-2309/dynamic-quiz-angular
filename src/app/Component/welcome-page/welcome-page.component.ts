import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../Services/quiz.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryOptions } from 'src/app/Interfaces/interface';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
})
export class WelcomePageComponent implements OnInit {
  questions: [] = [];
  categoryOptions: CategoryOptions[] = [];
  reactiveForm!: FormGroup;
  constructor(private quizService: QuizService, private router: Router) {}

  // ngOnInit function to initiate the form values and make the api call for the quiz categories
  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      category: new FormControl('', Validators.required),
      difficulty: new FormControl('', Validators.required),
    });
    this.quizService.getQuizCategories().then((quizCategories) => {
      this.categoryOptions = quizCategories.trivia_categories;
    });
  }

  // Function to make dynamic api call based on the user selection, then navigate to questions page and for validation
  submitForm() {
    if (this.reactiveForm.valid) {
      const categoryId = this.reactiveForm.value.category;
      const difficulty = this.reactiveForm.value.difficulty;

      this.quizService.getQuizzes(categoryId, difficulty).then((quizzes) => {
        this.questions = quizzes;
        this.router.navigate(['/questions'], {
          state: { data: this.questions, name: this.reactiveForm.value.name },
        });
        localStorage.setItem('auth', 'true');
      });
    } else {
      Object.keys(this.reactiveForm.controls).forEach((controlName) => {
        this.reactiveForm.controls[controlName].markAsTouched();
      });
    }
  }
}

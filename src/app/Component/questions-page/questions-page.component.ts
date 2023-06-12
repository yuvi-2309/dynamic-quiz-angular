import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShuffledAnswer } from 'src/app/Interfaces/interface';
import { Question } from 'src/app/Interfaces/interface';

@Component({
  selector: 'app-questions-page',
  templateUrl: './questions-page.component.html',
  styleUrls: ['./questions-page.component.css'],
})

export class QuestionsPageComponent implements OnInit, OnDestroy {
  questions: Question[] = [];
  shuffledAnswers: ShuffledAnswer[] = [];
  selectedAnswer: string = '';
  name: string = '';
  allSelectedAnswers: string[] = [];
  wrongAnswer: string = '';
  currentQuestionIndex: number = 0;
  timer: any;
  timeRemaining: number = 10;

  constructor(private router: Router) {}

  // ngOnInit function gets the name, questions from the previous route, starts the timer and shuffles the answers.
  ngOnInit(): void {
    this.name = history.state.name;
    this.questions = history.state.data.results;
    this.startTimer();
    this.shuffleAnswers();
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
      } else {
        this.nextQuestion();
      }
    }, 1000);
  }

  //  Based on the current question index number it either moves to next question or calculates the score and nagivates to the result page
  nextQuestion() {
    clearInterval(this.timer);
    this.timeRemaining = 10;
    this.allSelectedAnswers.push(this.selectedAnswer);
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.shuffleAnswers();
      this.startTimer();
      this.selectedAnswer = '';
      this.wrongAnswer = '';
      this.shuffledAnswers = this.shuffledAnswers.map((option) => {
        option.isSelected = false;
        return option;
      });
    } else {
      const score = this.calculateScore();
      localStorage.removeItem("auth")
      this.router.navigate(['/result'], {
        state: { score: score, name: this.name },
      });
    }
  }

  // Function to calculate the score
  calculateScore(): number {
    let score = 0;
    for (let i = 0; i < this.allSelectedAnswers.length; i++) {
      const question = this.questions[i];
      const selectedAnswer = this.allSelectedAnswers[i];
      if (selectedAnswer === question.correct_answer) {
        score++;
      }
    }
    return score;
  }

  // Function to shuffle answers
  shuffleAnswers() {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    const { correct_answer, incorrect_answers } = currentQuestion;

    const answers = [
      { answer: correct_answer, isCorrect: true, isSelected: false },
      ...incorrect_answers.map((answer: any) => ({
        answer,
        isCorrect: false,
        isSelected: false,
      })),
    ];
    answers.sort(() => Math.random() - 0.5);
    this.shuffledAnswers = answers;
  }

  // Function to return the correct answer based on the user selection
  selectAnswer(answer: string) {
    if (this.selectedAnswer === '') {
      this.selectedAnswer = answer;

      if (!this.isAnswerCorrect(answer)) {
        this.wrongAnswer = this.getCorrectAnswer();
      }

      this.shuffledAnswers = this.shuffledAnswers.map((option) => {
        if (option.answer === answer) {
          option.isSelected = true;
        } else {
          option.isSelected = false;
        }
        return option;
      });
    }
  }

  // Function to check whether the select answer is correct or not
  isAnswerCorrect(answer: string): boolean {
    const selectedOption = this.shuffledAnswers.find(
      (option) => option.answer === answer
    );
    return selectedOption ? selectedOption.isCorrect : false;
  }

  // Function to get the correct answer
  getCorrectAnswer(): string {
    const correctOption = this.shuffledAnswers.find(
      (option) => option.isCorrect
    );
    return correctOption ? correctOption.answer : '';
  }

  isNextButtonDisabled(): boolean {
    return this.selectedAnswer === '';
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}


import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { QuestionsPageComponent } from './questions-page.component';
import { DecodeUriPipe } from 'src/app/Pipes/decode-uri.pipe';

describe('QuestionsPageComponent', () => {
  let component: QuestionsPageComponent;
  let fixture: ComponentFixture<QuestionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionsPageComponent, DecodeUriPipe],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsPageComponent);
    component = fixture.componentInstance;

    const dummyState = {
      name: '',
      data: {
        response_code: 0,
        results: [
          {
            category: 'Geography',
            correct_answer: 'Ohio',
            difficulty: 'easy',
            incorrect_answers: ['Florida', 'Idaho', 'New Mexico'],
            question:
              'What is the only state in the United States that does not have a flag in a shape with 4 edges?',
            type: 'multiple',
          },
          {
            category: 'Geography',
            correct_answer: '2',
            difficulty: 'easy',
            incorrect_answers: ['1', '3', '4'],
            question:
              'How many countries does the United States share a land border with?',
            type: 'multiple',
          },
          {
            category: 'Geography',
            correct_answer: 'Wales',
            difficulty: 'easy',
            incorrect_answers: ['England', 'North Ireland', 'Scotland'],
            question: 'Which UK country features a dragon on their flag?',
            type: 'multiple',
          },
          {
            category: 'Geography',
            correct_answer: 'Cambridge',
            difficulty: 'easy',
            incorrect_answers: ['Providence', 'New York', 'Washington D.C.'],
            question: 'Harvard University is located in which city?',
            type: 'multiple',
          },
          {
            category: 'Geography',
            correct_answer: 'Brazil',
            difficulty: 'easy',
            incorrect_answers: ['China', 'Russia', 'The United States'],
            question:
              'Which country is the home of the largest Japanese population outside of Japan?',
            type: 'multiple',
          },
          {
            category: 'Geography',
            correct_answer: 'Honshu',
            difficulty: 'easy',
            incorrect_answers: ['Hokkaido', 'Shikoku', 'Kyushu'],
            question: 'Which of the following Japanese islands is the biggest?',
            type: 'multiple',
          },
        ],
      },
    };
    history.pushState(dummyState, '');
    component.questions = dummyState.data.results;

    fixture.detectChanges();
  });

  afterEach(() => {
    clearInterval(component.timer);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component properties', () => {
    expect(component.selectedAnswer).toEqual('');
    expect(component.name).toEqual('');
    expect(component.allSelectedAnswers).toEqual([]);
    expect(component.wrongAnswer).toEqual('');
    expect(component.currentQuestionIndex).toEqual(0);
    expect(component.timeRemaining).toEqual(10);
  });

  it('should start the timer on component initialization', () => {
    spyOn(component, 'startTimer');
    component.ngOnInit();
    expect(component.startTimer).toHaveBeenCalled();
  });

  it('should start the timer and decrement timeRemaining', fakeAsync(() => {
    component.startTimer();
    expect(component.timeRemaining).toEqual(10);
    tick(1000);
    expect(component.timeRemaining).toEqual(9);
    clearInterval(component.timer);
  }));

  it('should call the nextQuestion function', () => {
    component.nextQuestion();
    expect(component.timeRemaining).toEqual(10);
  });

  it('should update selectedAnswer, shuffledAnswers, and wrongAnswer correctly for incorrect answer', () => {
    component.selectedAnswer = '';
    component.shuffledAnswers = [
      { answer: 'A', isCorrect: false, isSelected: false },
      { answer: 'B', isCorrect: true, isSelected: false },
      { answer: 'C', isCorrect: false, isSelected: false },
    ];

    component.wrongAnswer = '';
    component.selectAnswer('A');
    expect(component.selectedAnswer).toEqual('A');

    const expectedShuffledAnswers = [
      { answer: 'A', isCorrect: false, isSelected: true },
      { answer: 'B', isCorrect: true, isSelected: false },
      { answer: 'C', isCorrect: false, isSelected: false },
    ];
    expect(component.shuffledAnswers).toEqual(expectedShuffledAnswers);
    expect(component.wrongAnswer).toEqual('B');
  });

  it('should calculate the score correctly based on selected answers', () => {
    component.questions = [
      {
        category: 'Science: Mathematics',
        correct_answer: '7',
        difficulty: 'easy',
        incorrect_answers: ['4', '12', '9'],
        question: "What's the square root of 49?",
        type: 'multiple',
      },
      {
        category: 'Science: Mathematics',
        correct_answer: '9',
        difficulty: 'easy',
        incorrect_answers: ['4', '12', '9'],
        question: "What's the square root of 49?",
        type: 'multiple',
      },
    ];
    component.allSelectedAnswers = ['7', '12'];

    const score = component.calculateScore();

    expect(score).toEqual(1);
  });

  it('should return an empty string if no correct answer is found', () => {
    component.shuffledAnswers = [
      { answer: 'A', isCorrect: false, isSelected: true },
      { answer: 'B', isCorrect: false, isSelected: false },
      { answer: 'C', isCorrect: false, isSelected: false },
    ];

    const correctAnswer = component.getCorrectAnswer();

    expect(correctAnswer).toBe('');
  });

  it('should return false if the selected answer is incorrect', () => {
    const selectedAnswer = 'Option C';
    component.shuffledAnswers = [
      { answer: 'A', isCorrect: false, isSelected: true },
      { answer: 'B', isCorrect: true, isSelected: false },
      { answer: 'C', isCorrect: false, isSelected: false },
    ];

    const isCorrect = component.isAnswerCorrect(selectedAnswer);

    expect(isCorrect).toBe(false);
  });
});

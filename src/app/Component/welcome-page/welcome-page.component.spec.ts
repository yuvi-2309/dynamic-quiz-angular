import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { WelcomePageComponent } from './welcome-page.component';
import { QuizService } from '../../Services/quiz.service';

describe('WelcomePageComponent', () => {
  let component: WelcomePageComponent;
  let fixture: ComponentFixture<WelcomePageComponent>;
  let quizService: QuizService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomePageComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [QuizService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomePageComponent);
    component = fixture.componentInstance;
    quizService = TestBed.inject(QuizService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the reactive form', () => {
    expect(component.reactiveForm).toBeTruthy();
    expect(component.reactiveForm.get('name')).toBeTruthy();
    expect(component.reactiveForm.get('category')).toBeTruthy();
    expect(component.reactiveForm.get('difficulty')).toBeTruthy();
  });

  it('should load quiz categories', async () => {
    const quizCategories = {
      trivia_categories: [{ id: 1, name: 'Category 1' }],
    };
    spyOn(quizService, 'getQuizCategories').and.returnValue(
      Promise.resolve(quizCategories)
    );

    await component.ngOnInit();

    expect(component.categoryOptions).toEqual(quizCategories.trivia_categories);
  });

  it('should submit the form and navigate to questions page when form is valid', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    const quizzes: [] = [];
    const mockFormValue = {
      name: 'John',
      category: 1,
      difficulty: 'easy',
    };

    spyOn(quizService, 'getQuizzes').and.returnValue(Promise.resolve(quizzes));
    spyOn(component['router'], 'navigate');

    component.reactiveForm.patchValue(mockFormValue);
    component.submitForm();
    await fixture.whenStable();

    expect(quizService.getQuizzes).toHaveBeenCalledWith(
      mockFormValue.category,
      mockFormValue.difficulty
    );
    expect(component.questions).toEqual(quizzes);
    expect(component['router'].navigate).toHaveBeenCalledWith(['/questions'], {
      state: { data: quizzes, name: mockFormValue.name },
    });
  });

  it('should mark form controls as touched and not navigate when form is invalid', () => {
    spyOn(component['router'], 'navigate');

    component.submitForm();

    expect(component['router'].navigate).not.toHaveBeenCalled();
    expect(component.reactiveForm.controls.name.touched).toBeTrue();
    expect(component.reactiveForm.controls.category.touched).toBeTrue();
    expect(component.reactiveForm.controls.difficulty.touched).toBeTrue();
  });

  it('should submit the form with valid input and navigate to questions page', async () => {
    const quizzes: any = [];
    const mockFormValue = {
      name: 'John',
      category: 1,
      difficulty: 'easy',
    };

    spyOn(quizService, 'getQuizzes').and.returnValue(Promise.resolve(quizzes));
    spyOn(component['router'], 'navigate');

    component.reactiveForm.patchValue(mockFormValue);

    component.submitForm();
    await fixture.whenStable();

    expect(quizService.getQuizzes).toHaveBeenCalledWith(
      mockFormValue.category,
      mockFormValue.difficulty
    );
    expect(component.questions).toEqual(quizzes);
    expect(component['router'].navigate).toHaveBeenCalledWith(['/questions'], {
      state: { data: quizzes, name: mockFormValue.name },
    });
  });
});

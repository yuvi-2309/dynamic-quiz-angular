import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ResultPageComponent } from './result-page.component';

describe('ResultPageComponent', () => {
  let component: ResultPageComponent;
  let fixture: ComponentFixture<ResultPageComponent>;
  let name = '';
  let score = 0;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ResultPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultPageComponent);
    component = fixture.componentInstance;
    history.pushState(score, name);
    fixture.detectChanges();
  });

  it('should return the correct image URL for high score', () => {
    const score = 9;
    const expectedUrl = '../../../assets/high-marks.png';

    const imageUrl = component.getImageUrl(score);

    expect(imageUrl).toBe(expectedUrl);
  });

  it('should return the correct image URL for medium score', () => {
    const score = 5;
    const expectedUrl = '../../../assets/medium-marks.jpg';

    const imageUrl = component.getImageUrl(score);

    expect(imageUrl).toBe(expectedUrl);
  });

  it('should return the correct image URL for low score', () => {
    const score = 2;
    const expectedUrl = '../../../assets/low-marks.jpeg';

    const imageUrl = component.getImageUrl(score);

    expect(imageUrl).toBe(expectedUrl);
  });
});

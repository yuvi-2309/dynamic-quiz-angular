import axios from 'axios';
import { QuizService } from './quiz.service';

describe('QuizService', () => {
  let quizService: QuizService;
  let axiosGetSpy: jasmine.Spy;

  beforeEach(() => {
    quizService = new QuizService();
    axiosGetSpy = spyOn(axios, 'get').and.returnValue(
      Promise.resolve({
        data: {
          results: [
            { question: 'Question 1', answer: 'Answer 1' },
            { question: 'Question 2', answer: 'Answer 2' },
            { question: 'Question 3', answer: 'Answer 3' },
          ],
        },
      })
    );
  });

  it('should call the correct endpoint with the provided category and difficulty', async () => {
    const categoryId = 1;
    const difficulty = 'easy';
    await quizService.getQuizzes(categoryId, difficulty);
    expect(axiosGetSpy).toHaveBeenCalledWith(
      `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}`
    );
  });

  it('should return the response data', async () => {
    const mockResponse = {};
    axiosGetSpy.and.returnValue(Promise.resolve({ data: mockResponse }));
    const response = await quizService.getQuizzes(1, 'easy');
    expect(response).toEqual(mockResponse);
  });

  it('should throw an error when the axios request fails for getQuizzes method', async () => {
    const mockError = new Error('Mock error');
    axiosGetSpy.and.returnValue(Promise.reject(mockError));
    await expectAsync(quizService.getQuizzes(1, 'easy')).toBeRejectedWith(
      mockError
    );
  });

  it('should throw an error when the axios request fails for getQuizCategories method', async () => {
    const mockError = new Error('Mock error');
    axiosGetSpy.and.returnValue(Promise.reject(mockError));
    await expectAsync(quizService.getQuizCategories()).toBeRejectedWith(
      mockError
    );
  });
});

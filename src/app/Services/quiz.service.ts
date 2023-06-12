import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  // Function to get the questions from the server based on category id and difficulty level which is passed as params
  async getQuizzes(categoryId: number, difficulty: string): Promise<any> {
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Function to get all the quiz categories from the server and display them in the dropdown list
  async getQuizCategories(): Promise<any> {
    try {
      const response = await axios.get('https://opentdb.com/api_category.php');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

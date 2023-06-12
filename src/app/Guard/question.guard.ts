import { CanDeactivateFn } from '@angular/router';
import { QuestionsPageComponent } from '../Component/questions-page/questions-page.component';

export const QuestionGuard: CanDeactivateFn<QuestionsPageComponent> = () => {
  if (localStorage.getItem('auth')) {
    const confirmLeave = confirm(
      'Are you sure you want to leave this page? Your progress will be lost.'
    );
    return confirmLeave;
  }
  return true;
};

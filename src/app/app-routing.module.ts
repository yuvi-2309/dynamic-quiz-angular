import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './Component/welcome-page/welcome-page.component';
import { QuestionGuard } from './Guard/question.guard';

const routes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {
    path: 'questions',
    loadChildren: () =>
      import('./Component/questions-page/questions-page.module').then(
        (module) => module.QuestionsPageModule
      ),
    canDeactivate: [QuestionGuard],
  },
  {
    path: 'result',
    loadChildren: () =>
      import('./Component/result-page/result-page.module').then(
        (m) => m.ResultPageModule
      ),
  },
  { path: '**', redirectTo: 'welcome' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

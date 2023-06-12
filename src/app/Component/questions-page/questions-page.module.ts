import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsPageComponent } from './questions-page.component';
import { RouterModule } from '@angular/router';
import { DecodeUriPipe } from 'src/app/Pipes/decode-uri.pipe';

@NgModule({
  declarations: [QuestionsPageComponent, DecodeUriPipe],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: QuestionsPageComponent }]),
  ],
})
export class QuestionsPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultPageComponent } from './result-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ResultPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ResultPageComponent }]),
  ],
})
export class ResultPageModule {}

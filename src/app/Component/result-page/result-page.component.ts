import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css'],
})
export class ResultPageComponent implements OnInit {
  score: number = 0;
  name: string = '';

  // ngOnInit function to get the name and score from the previous route
  ngOnInit(): void {
    this.name = history.state.name;
    this.score = history.state.score;
  }

  getImageUrl(score: number): string {
    if (score >= 8) {
      return '../../../assets/high-marks.png';
    } else if (score >= 5) {
      return '../../../assets/medium-marks.jpg';
    } else {
      return '../../../assets/low-marks.jpeg';
    }
  }
}

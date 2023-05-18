import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-daily-song-flip-card',
  templateUrl: './daily-song-flip-card.component.html',
  styleUrls: ['./daily-song-flip-card.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DailySongFlipCardComponent {
  @Input() isFlipped!: boolean;
}

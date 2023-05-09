import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Song } from 'src/models/audio.model';

@Component({
  selector: 'app-daily-song-detail-answer',
  templateUrl: './daily-song-detail-answer.component.html',
  imports: [NgIf],
  standalone: true
})
export class DailySongDetailAnswerComponent {

  @Input() correctOptionSelected: boolean | undefined = false;
  @Input() songInfo!: Song | undefined;

}

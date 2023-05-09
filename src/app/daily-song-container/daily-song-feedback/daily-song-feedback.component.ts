import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SongOption } from 'src/models/audio.model';

@Component({
  selector: 'app-daily-song-feedback',
  imports: [NgIf],
  templateUrl: './daily-song-feedback.component.html',
  standalone: true
})
export class DailySongFeedbackComponent {

  NUM_TRIES: number = 3;

  @Input() dailySongOptions!: SongOption[] | undefined;
  @Input() correctOptionSelected: boolean | undefined = false;

}

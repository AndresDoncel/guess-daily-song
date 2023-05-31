import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SongOption } from 'src/models/audio.model';

@Component({
  selector: 'app-daily-song-feedback',
  imports: [NgIf, TranslateModule],
  templateUrl: './daily-song-feedback.component.html',
  standalone: true
})
export class DailySongFeedbackComponent {

  NUM_TRIES: number = 3;

  @Input() finalPoints!: number;
  @Input() dailySongOptions!: SongOption[] | undefined;
  @Input() correctOptionSelected: boolean | undefined = false;

}

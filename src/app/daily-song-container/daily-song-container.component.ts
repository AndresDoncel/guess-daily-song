import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { DailySongService } from './daily-song.service';
import { NgIf } from '@angular/common';
import { DailySongTitleComponent } from './daily-song-title/daily-song-title.component';
import { AudioPlayerComponent } from './audio-player/audi-player.component';
import { DailySongDescriptionComponent } from './daily-song-description/daily-song-description.component';
import { DailySongFormComponent } from './daily-song-form/daily-song-form.component';
import { DailySongFeedbackComponent } from './daily-song-feedback/daily-song-feedback.component';
import { DailySongDetailAnswerComponent } from './daily-song-detail-answer/daily-song-detail-answer.component';

@Component({
  selector: 'app-daily-song-container',
  standalone: true,
  template: `
    <div *ngIf="dailySong()" class="max-w-sm rounded overflow-hidden shadow-lg p-1">
      <app-daily-song-title></app-daily-song-title>
      <app-audio-player [audioSource]="currentOption().audio || dailySong()?.options?.[0]?.audio"></app-audio-player>
      <app-daily-song-description></app-daily-song-description>
      <app-daily-song-form
        [correctOptionSelected]="currentOption().correctOptionSelected"
        [dailySongTries]="dailySong()?.options?.length"
        (formSubmitted)="handleFormSubmitted($event)">
      </app-daily-song-form>
      <app-daily-song-feedback
      [correctOptionSelected]="currentOption().correctOptionSelected"
      [dailySongOptions]="dailySong()?.options">
    </app-daily-song-feedback>
    <app-daily-song-detail-answer [songInfo]="dailySong()?.song" [correctOptionSelected]="currentOption().correctOptionSelected"></app-daily-song-detail-answer>
    </div>
  `,
  imports: [
    NgIf,
    DailySongTitleComponent,
    AudioPlayerComponent,
    DailySongDescriptionComponent,
    DailySongFormComponent,
    DailySongFeedbackComponent,
    DailySongDetailAnswerComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DailySongContainerComponent {

  dailySongService: DailySongService = inject(DailySongService);

  // Component signals
  dailySong = this.dailySongService.dailySong;
  currentOption = this.dailySongService.currentOption;

  handleFormSubmitted(song: string) {
    return this.dailySongService.onSongSubmitted(song)
  }

}

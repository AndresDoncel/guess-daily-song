import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { DailySongService } from './daily-song.service';
import { NgIf } from '@angular/common';
import { DailySongTitleComponent } from './daily-song-title/daily-song-title.component';
import { AudioPlayerComponent } from './audio-player/audi-player.component';
import { DailySongDescriptionComponent } from './daily-song-description/daily-song-description.component';
import { DailySongFormComponent } from './daily-song-form/daily-song-form.component';
import { DailySongFeedbackComponent } from './daily-song-feedback/daily-song-feedback.component';
import { DailySongDetailAnswerComponent } from './daily-song-detail-answer/daily-song-detail-answer.component';
import { DailySongFooterComponent } from './daily-song-footer/daily-song-footer.component';

@Component({
  selector: 'app-daily-song-container',
  standalone: true,
  template: `
    <div
      [style.height]="dailySong()?.options?.length === 0 || currentOption().correctOptionSelected ? '100%': '100vh' "
      *ngIf="dailySong()"
      class="pb-20 h-100 flex items-center justify-center">
      <div class="max-w-sm rounded overflow-hidden shadow-lg p-1">
        <app-daily-song-title></app-daily-song-title>

        <app-audio-player
         [startDaily]="startDaily"
         [audioSource]="currentOption().audio || dailySong()?.options?.[0]?.audio">
        </app-audio-player>

        <app-daily-song-description (evStartDaily)="startDaily = $event"></app-daily-song-description>

        <app-daily-song-form
          [startDaily]="startDaily"
          [correctOptionSelected]="currentOption().correctOptionSelected"
          [dailySongTries]="dailySong()?.options?.length"
          (formSubmitted)="handleFormSubmitted($event)">
        </app-daily-song-form>

        <app-daily-song-feedback
        [finalPoints]="finalPoints()"
        [correctOptionSelected]="currentOption().correctOptionSelected"
        [dailySongOptions]="dailySong()?.options">
      </app-daily-song-feedback>

      <app-daily-song-detail-answer
        [finalPoints]="finalPoints()"
        [dailySongOptions]="dailySong()?.options"
        [songInfo]="dailySong()?.song"
        [correctOptionSelected]="currentOption().correctOptionSelected">
      </app-daily-song-detail-answer>

      <app-daily-song-footer></app-daily-song-footer>
    </div>
  </div>
  `,
  imports: [
    NgIf,
    DailySongTitleComponent,
    AudioPlayerComponent,
    DailySongDescriptionComponent,
    DailySongFormComponent,
    DailySongFeedbackComponent,
    DailySongDetailAnswerComponent,
    DailySongFooterComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DailySongContainerComponent {

  dailySongService: DailySongService = inject(DailySongService);

  // Component signals
  dailySong = this.dailySongService.dailySong;
  currentOption = this.dailySongService.currentOption;
  finalPoints = this.dailySongService.dailyPoints;
  startDaily: boolean = false;

  handleFormSubmitted(song: string) {
    return this.dailySongService.onSongSubmitted(song.trim())
  }

}

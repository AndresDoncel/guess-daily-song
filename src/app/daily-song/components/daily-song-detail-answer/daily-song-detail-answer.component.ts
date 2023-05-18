import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Song, SongOption } from 'src/models/audio.model';
import { DailySongFlipCardComponent } from '../daily-song-flip-card/daily-song-flip-card.component';
import { DailySongFunFactComponent } from '../daily-song-fun-fack/daily-song-fun-fact.component';
import { DailySongAlbumInfoComponent } from '../daily-song-album-info/daily-song-album-info.component';

@Component({
  selector: 'app-daily-song-detail-answer',
  templateUrl: './daily-song-detail-answer.component.html',
  standalone: true,
  imports: [
    NgIf,
    DailySongFlipCardComponent,
    DailySongFunFactComponent,
    DailySongAlbumInfoComponent
  ],
})
export class DailySongDetailAnswerComponent {

  @Input() dailySongOptions!: SongOption[] | undefined;
  @Input() correctOptionSelected: boolean | undefined = false;
  @Input() songInfo!: Song | undefined;
  @Input() finalPoints!: number;

  isFlipped = false;

  flipCard(value: boolean) {
    this.isFlipped = value;
  }

}

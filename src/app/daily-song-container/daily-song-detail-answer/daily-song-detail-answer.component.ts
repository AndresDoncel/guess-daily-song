import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Song, SongOption } from 'src/models/audio.model';

@Component({
  selector: 'app-daily-song-detail-answer',
  templateUrl: './daily-song-detail-answer.component.html',
  imports: [NgIf],
  standalone: true
})
export class DailySongDetailAnswerComponent {

  @Input() dailySongOptions!: SongOption[] | undefined;
  @Input() correctOptionSelected: boolean | undefined = false;
  @Input() songInfo!: Song | undefined;

  onGoAction(action: string, url: string | undefined = undefined): void {
    switch (action) {
      case 'youtube':
      case 'spotify':
        window.open(url)
        break;

      case 'share':
        this.onShare()
    }
  }

  onShare() {
    if (navigator) {
      this.share();
    } else {
      console.log('Web Share API is not supported.');
    }
  }

  share() {
    navigator.share({
      title: 'Guess the song Daily',
      text: 'Te reto a que logres adivinar la canción',
      url: 'https://daily-song.web.app/'
    })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing:', error));
  }

}

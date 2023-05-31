import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Song } from 'src/models/audio.model';

@Component({
  selector: 'app-daily-song-album-info',
  templateUrl: './daily-song-album-info.component.html',
  standalone: true,
  imports: [TranslateModule]
})
export class DailySongAlbumInfoComponent {
  @Input() finalPoints!: number;
  @Input() songInfo!: Song | undefined;

  @Output() evFlipCardInfo: EventEmitter<boolean> = new EventEmitter();

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
      text: `Te reto a que logres adivinar la canción, mi puntaje fue ${this.finalPoints}`,
      url: 'https://daily-song.web.app/'
    })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing:', error));
  }

}

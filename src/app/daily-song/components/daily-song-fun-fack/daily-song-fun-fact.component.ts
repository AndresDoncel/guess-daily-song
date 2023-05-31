import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-daily-song-fun-fact',
  templateUrl: './daily-song-fun-fact.component.html',
  standalone: true,
  imports: [TranslateModule]
})
export class DailySongFunFactComponent {

  @Output() evFlipCardFunFact: EventEmitter<boolean> = new EventEmitter();
  @Input() funFact!: string | undefined;

}

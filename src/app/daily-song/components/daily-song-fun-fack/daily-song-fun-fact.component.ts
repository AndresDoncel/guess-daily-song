import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-daily-song-fun-fact',
  templateUrl: './daily-song-fun-fact.component.html',
  standalone: true
})
export class DailySongFunFactComponent {

  @Output() evFlipCardFunFact: EventEmitter<boolean> = new EventEmitter();
  @Input() funFact!: string | undefined;

}

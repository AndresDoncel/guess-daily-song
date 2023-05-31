import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-daily-song-description',
  imports: [NgIf, TranslateModule],
  template: `
    <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">{{ 'dailySongDescription.title' | translate }}</div>
    <p class="text-gray-700 text-base mb-2">{{ 'dailySongDescription.description' | translate }}</p>
    <p *ngIf="!startDaily" class="text-base font-extrabold text-gray-900"><span
    class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{{ 'dailySongDescription.question' | translate }}</span>
    </p>
    <button
      class="mt-4 mb-2 px-6 py-2 text-gray-100 rounded bg-gradient-to-r from-cyan-500 to-blue-500"
      (click)="evStartDaily.emit(startDaily = !startDaily)"
      *ngIf="!startDaily">
      {{ 'dailySongDescription.start' | translate }}
    </button>
  `,
  standalone: true
})
export class DailySongDescriptionComponent {

  @Output() evStartDaily: EventEmitter<boolean> = new EventEmitter();
  startDaily: boolean = false;

}

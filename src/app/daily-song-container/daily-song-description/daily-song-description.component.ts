import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-daily-song-description',
  imports: [NgIf],
  template: `
    <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">Adivina la canción</div>
    <p class="text-gray-700 text-base mb-2">
    Tienes la oportunidad de adivinar el título de una canción, ¡pero tienes solo tres intentos! Con cada intento,
    el tiempo de la canción aumentará unos segundos, pero ganarás menos puntos.
   </p>
    <p class="text-base font-extrabold text-gray-900 dark:text-white"><span
    class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">¿Estás listo para el desafío musical?</span>
    </p>
    <button
      class="mt-4 mb-2 px-6 py-2 text-gray-100 rounded bg-gradient-to-r from-cyan-500 to-blue-500"
      (click)="evStartDaily.emit(startDaily = !startDaily)"
      *ngIf="!startDaily">
      Comenzar
    </button>
  `,
  standalone: true
})
export class DailySongDescriptionComponent {

  @Output() evStartDaily: EventEmitter<boolean> = new EventEmitter();
  startDaily: boolean = false;

}

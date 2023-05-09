import { Component } from '@angular/core';

@Component({
  selector: 'app-daily-song-description',
  template: `
    <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">Adivina la cancion</div>
    <p class="text-gray-700 text-base mb-2">
    Tienes la oportunidad de adivinar el título de una canción, ¡pero tienes solo tres intentos! Con cada intento,
    el tiempo de la canción aumentará unos segundos, pero ganarás menos puntos.
   </p>
    <p class="text-base font-extrabold text-gray-900 dark:text-white"><span
    class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">¿Estás listo para el desafío musical?"</span>
    </p>
  `,
  standalone: true
})
export class DailySongDescriptionComponent {

}

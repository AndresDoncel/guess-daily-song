import { Component } from '@angular/core';

@Component({
  selector: 'app-daily-song-title',
  template: `
    <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span
    class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Guess the song</span> Daily.
    </h1>
  `,
  standalone: true
})
export class DailySongTitleComponent {

}

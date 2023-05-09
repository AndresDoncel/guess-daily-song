import { Component } from '@angular/core';

@Component({
  selector: 'app-daily-song-footer',
  template: `
  <footer class="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-center md:p-6 dark:bg-gray-800 dark:border-gray-600">
    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">Made with Love ❤️ Andres Doncel</a>
    </span>
  </footer>
`,
  standalone: true
})
export class DailySongFooterComponent {

}

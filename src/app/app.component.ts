import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'guest-daily-song';

  constructor(private translateService: TranslateService) {
    const defaultSpanish = 'es';
    const userLocale =
      navigator.languages && navigator.languages.length
        ? navigator.languages[0]
        : navigator.language;
    const finalUserLocale = userLocale === 'en' ? userLocale : defaultSpanish;
    this.translateService.setDefaultLang(finalUserLocale);
  }

}

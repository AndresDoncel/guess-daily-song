import { Component, OnInit, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  translateService: TranslateService = inject(TranslateService);
  auth: AngularFireAuth = inject(AngularFireAuth);

  constructor() {
    const defaultSpanish = 'es';
    const userLocale =
      navigator.languages && navigator.languages.length
        ? navigator.languages[0]
        : navigator.language;
    const finalUserLocale = userLocale === 'en' ? userLocale : defaultSpanish;
    this.translateService.setDefaultLang(finalUserLocale);
  }

  ngOnInit() {
    this.loginAnonymously()
  }

  loginAnonymously() {
    this.auth.signInAnonymously()
      .then(userCredential => {
        const user = userCredential.user;
        sessionStorage.setItem('anonymousUser', JSON.stringify(user))
      })
      .catch(error => {
        console.error('Anonymous authentication failed:', error);
      });
  }
}

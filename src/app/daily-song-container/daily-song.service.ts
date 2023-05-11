import { Injectable, inject, signal } from "@angular/core";
import { DailySong, SongOption } from "src/models/audio.model";
import { Observable, filter, map, of, switchMap } from "rxjs";
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { DOCUMENT } from "@angular/common";


@Injectable({
  providedIn: 'root'
})
export class DailySongService {

  WIN_AUDIO_FEEDBACK: string = 'assets/audio/correct_answer.mp3'
  FAIL_AUDIO_FEEDBACK: string = 'assets/audio/incorrect_answer.mp3'
  SCROLL_CONTAINER: string = '#detailContainerScroll'

  db: AngularFireDatabase = inject(AngularFireDatabase);
  document: Document = inject(DOCUMENT)

  //signals
  songSubmitted = signal<string>('');
  dailyPoints = signal<number>(0);

  //observables
  private dailySong$: Observable<DailySong | undefined> = this.getDailySong();
  private currentOption$: Observable<SongOption> = toObservable(this.songSubmitted).pipe(
    filter(Boolean),
    switchMap((song: string) => {
      const correctAnswer = this.dailySong()?.correctAnswer?.toLocaleLowerCase() ?? '';
      if (song.toLocaleLowerCase() === correctAnswer) {
        this.shoot();
        this.calculatePoint();
        return of({ correctOptionSelected: true } as SongOption);
      } else {
        this.dailySong()?.options.shift();
        const nextOption = this.dailySong()?.options[0]
        if (!nextOption) {
          this.scrollToElement(this.SCROLL_CONTAINER);
          this.playAudioFeedback(this.FAIL_AUDIO_FEEDBACK);
        }
        return nextOption ? of(nextOption as SongOption) : of({} as SongOption);
      }
    })
  );

  // Expose signals from this service
  dailySong = toSignal<DailySong | undefined, DailySong>(this.dailySong$, { initialValue: {} as DailySong });
  currentOption = toSignal<SongOption, SongOption>(this.currentOption$, { initialValue: [] as unknown as SongOption });

  getDailySong(): Observable<DailySong | undefined> {
    return this.getSongByDate();
  }

  getSongByDate(date: number = new Date().getDate()): Observable<DailySong> {
    return this.db.list<DailySong>('/songs', ref => ref.orderByChild('date').equalTo(date)).valueChanges().pipe(
      map(songs => songs[0])
    );
  }

  onSongSubmitted(song: string) {
    this.songSubmitted.set(song);
  }

  calculatePoint() {
    const optionsLength = this.dailySong()?.options.length;
    if (optionsLength === 3) {
      this.dailyPoints.set(100);
    } else if (optionsLength === 2) {
      this.dailyPoints.set(70);
    } else if (optionsLength === 1) {
      this.dailyPoints.set(30);
    }
  }

  random(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  shoot() {
    try {
      this.confetti({
        angle: this.random(60, 120),
        spread: this.random(10, 50),
        particleCount: this.random(40, 50),
        origin: {
          y: 0.6
        }
      })
      this.playAudioFeedback(this.WIN_AUDIO_FEEDBACK);
      this.scrollToElement(this.SCROLL_CONTAINER);
    } catch (e) {
      console.log('error creating confetti', e)
    }
  }

  scrollToElement(selector: string) {
    setTimeout(() => {
      const element = this.document.querySelector(selector);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 800);
  }

  playAudioFeedback(audioUrl: string) {
    fetch(audioUrl)
      .then(response => response.blob())
      .then(blob => {
        const audioObjectUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioObjectUrl);
        audio.play();
      });
  }

  confetti(values: { angle: number; spread: number; particleCount: number; origin: { y: number; }; }) {
    return (window as any)['confetti'].apply(this, values);
  }
}

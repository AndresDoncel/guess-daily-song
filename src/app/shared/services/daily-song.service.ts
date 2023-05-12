import { Injectable, inject, signal } from "@angular/core";
import { DailySong, SongOption } from "src/models/audio.model";
import { Observable, filter, map, of, switchMap } from "rxjs";
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { UtilsService } from "./utils.service";
import { FAIL_AUDIO_FEEDBACK, SCROLL_CONTAINER } from "src/constants/constants";

@Injectable({
  providedIn: 'root'
})
export class DailySongService {

  db: AngularFireDatabase = inject(AngularFireDatabase);
  ut: UtilsService = inject(UtilsService);

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
        this.ut.shoot();
        this.calculatePoint();
        return of({ correctOptionSelected: true } as SongOption);
      } else {
        this.dailySong()?.options.shift();
        const nextOption = this.dailySong()?.options[0]
        if (!nextOption) {
          this.ut.scrollToElement(SCROLL_CONTAINER);
          this.ut.playAudioFeedback(FAIL_AUDIO_FEEDBACK);
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
}

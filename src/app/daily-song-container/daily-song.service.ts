import { Injectable, Signal, signal } from "@angular/core";
import { DailySong, SongOption } from "src/models/audio.model";
import { Observable, filter, map, of, switchMap, tap } from "rxjs";
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { AngularFireDatabase } from '@angular/fire/compat/database';


@Injectable({
  providedIn: 'root'
})
export class DailySongService {

  constructor(private db: AngularFireDatabase) {
  }

  private dailySong$: Observable<DailySong | undefined> = this.getDailySong();

  songSubmitted = signal<string>('');

  // Expose signals from this service
  dailySong = toSignal<DailySong | undefined, DailySong>(this.dailySong$, { initialValue: {} as DailySong });

  private currentOption$: Observable<SongOption> = toObservable(this.songSubmitted).pipe(
    filter(Boolean),
    switchMap((song: string) => {
      if (song.toLocaleLowerCase() === this.dailySong()?.correctAnswer.toLocaleLowerCase()) {
        this.shoot();
        return of({ correctOptionSelected: true } as SongOption)
      } else {
        this.dailySong()?.options.shift();
        const nextOption = this.dailySong()?.options[0]
        return nextOption ? of(nextOption as SongOption) : of({} as SongOption);
      }
    })
  );

  currentOption = toSignal<SongOption, SongOption>(this.currentOption$, { initialValue: [] as unknown as SongOption });

  getDailySong(): Observable<DailySong | undefined> {
    return this.dailySong$ = this.getAllSongs().pipe(
      map(songs => songs[0]),
    )
  }

  getAllSongs(): Observable<DailySong[]> {
    const date = new Date().getDate();
    return this.db.list<DailySong>('/songs', ref => ref.orderByChild('date').equalTo(date)).valueChanges()
  }

  onSongSubmitted(song: string) {
    this.songSubmitted.set(song);
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
      });
    } catch (e) {
    }
  }

  confetti(args: any) {
    return (window as any)['confetti'].apply(this, arguments);
  }
}

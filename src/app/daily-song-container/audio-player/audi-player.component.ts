import { NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [NgIf],
  template: `
    <ng-container *ngIf="startDaily">
      <div class="flex justify-center align-middle">
        <audio autoplay #audio style="width: 100%;" controls>
        <source [src]="audioSrc" type="audio/mpeg" />
      </audio>
    </div>
    </ng-container>
  `,
})
export class AudioPlayerComponent {

  constructor(private cdr: ChangeDetectorRef) { }

  @Input() startDaily: boolean = false;

  @ViewChild('audio') audioRef!: ElementRef;

  audioSrc!: string | undefined;

  @Input()
  set audioSource(audioSource: string | undefined) {
    this.audioSrc = audioSource;
    const audioElement = this.audioRef?.nativeElement as HTMLAudioElement;
    audioElement?.load();
    audioElement?.play();
    this.cdr.detectChanges();
  };

}

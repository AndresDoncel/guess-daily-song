import { NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [NgIf],
  styles: [`
    #waveform-container {
    width: 100%;
    height: 115px;
    background-color: #f0f0f0;
    position: relative;
    overflow: hidden;
  }
  `],
  template: `
    <ng-container *ngIf="startDaily">
      <div *ngIf="audioSrc" class="flex justify-center align-middle px-6">
        <div id="waveform-container"></div>
        <!-- <audio autoplay #audio style="width: 100%;" controls>
        <source [src]="audioSrc" type="audio/mpeg" />
      </audio> -->
    </div>
    </ng-container>
  `,
})
export class AudioPlayerComponent implements AfterViewInit, OnChanges {

  constructor(private cdr: ChangeDetectorRef) { }

  private waveform!: WaveSurfer;

  @Input() startDaily: boolean = false;

  @ViewChild('audio') audioRef!: ElementRef;

  audioSrc!: string | undefined;

  @Input()
  set audioSource(audioSource: string | undefined) {
    this.audioSrc = audioSource;
    // const audioElement = this.audioRef?.nativeElement as HTMLAudioElement;
    // audioElement?.load();
    // audioElement?.play();
    // this.cdr.detectChanges();
  };

  ngAfterViewInit() {
    this.createWave()
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes here', changes)
    if (!changes['audioSource'].firstChange) {
      this.waveform.destroy();
      this.createWave()
    }
  }

  createWave() {
    if (this.audioSrc) {
      this.waveform = WaveSurfer.create({
        container: '#waveform-container',
        waveColor: '#059669',
        progressColor: '#38bdf8',
      });
      this.waveform.load(this.audioSrc as string);
      this.waveform.on('ready', () => {
        this.waveform.play();
        this.cdr.detectChanges();
      });
    }
  }
}



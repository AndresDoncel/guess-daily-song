import { NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-daily-song-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <div *ngIf="startDaily" class="px-6 pt-4 pb-2">
    <form [formGroup]="songForm" (ngSubmit)="sendForm(songForm)" class="w-full max-w-sm">
      <div class="flex items-center border-b border-teal-500 py-2">
        <input formControlName="song"
          class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text" placeholder="Adivina la cancion 🎵 🎸" aria-label="Full name">
        <button #submitBtn *ngIf="dailySongTries! !== 0" type="submit"
          class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">
          Enviar
        </button>
      </div>
    </form>
  </div>
  `,
})
export class DailySongFormComponent {

  @ViewChild('submitBtn') submitBtn!: ElementRef;

  NUM_TRIES: number = 3;

  @Input() startDaily: boolean = false;
  @Output() formSubmitted: EventEmitter<string> = new EventEmitter();
  @Input() dailySongTries: number | undefined;

  @Input()
  set correctOptionSelected(correctOptionSelected: boolean | undefined) {
    const btn = this.submitBtn?.nativeElement as HTMLAudioElement;
    btn?.remove();
  };

  songForm = new FormGroup({
    song: new FormControl('', [Validators.required]),
  });

  sendForm({ value, valid }: { value: any; valid: boolean }) {
    if (valid) {
      this.songForm.reset();
      return this.formSubmitted.emit(value.song)
    }
  }
}

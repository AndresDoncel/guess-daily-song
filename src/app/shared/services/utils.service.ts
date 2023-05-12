import { Injectable, inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { SCROLL_CONTAINER, WIN_AUDIO_FEEDBACK } from "src/constants/constants";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  document: Document = inject(DOCUMENT)

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
      this.playAudioFeedback(WIN_AUDIO_FEEDBACK);
      this.scrollToElement(SCROLL_CONTAINER);
    } catch (e) {
      console.log('error creating confetti', e)
    }
  }

  random(min: number, max: number) {
    return Math.random() * (max - min) + min;
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

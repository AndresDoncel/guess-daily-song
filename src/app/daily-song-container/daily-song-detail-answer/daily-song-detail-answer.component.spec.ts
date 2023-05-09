import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailySongDetailAnswerComponent } from './daily-song-detail-answer.component';

describe('DailySongDetailAnswerComponent', () => {
  let component: DailySongDetailAnswerComponent;
  let fixture: ComponentFixture<DailySongDetailAnswerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailySongDetailAnswerComponent]
    });
    fixture = TestBed.createComponent(DailySongDetailAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

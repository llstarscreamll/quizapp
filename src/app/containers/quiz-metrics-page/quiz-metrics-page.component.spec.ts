import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizMetricsPageComponent } from './quiz-metrics-page.component';

describe('QuizMetricsPageComponent', () => {
  let component: QuizMetricsPageComponent;
  let fixture: ComponentFixture<QuizMetricsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizMetricsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizMetricsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

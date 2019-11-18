import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { QuizzesPageComponent } from "./quizzes.component";

describe("QuizzesComponent", () => {
  let component: QuizzesPageComponent;
  let fixture: ComponentFixture<QuizzesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizzesPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

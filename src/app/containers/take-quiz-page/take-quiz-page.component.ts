import { Subject } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { tap, filter, takeUntil, withLatestFrom } from "rxjs/operators";
import { Component, OnInit, OnDestroy } from "@angular/core";

import { AuthFacade } from "src/app/+state/auth.facade";
import { QuizFacade } from "src/app/+state/quiz.facade";

@Component({
  selector: "app-take-quiz-page",
  templateUrl: "./take-quiz-page.component.html",
  styleUrls: ["./take-quiz-page.component.sass"]
})
export class TakeQuizPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  public quiz$ = this.quizFacade.selected$;
  public user$ = this.authFacade.user$
    .pipe(
      withLatestFrom(this.quiz$),
      filter(([user, quiz]) => !!user && !!quiz),
      tap(([user, quiz]) => (this.user = user)),
      tap(([user, quiz]) => (this.quiz = quiz)),
      tap(([user, quiz]) => this.quizFacade.takenByUser(quiz.uid, user)),
      tap(([user, quiz]) =>
        this.quizFacade.getQuizAnswersFromUser(quiz.uid, user.uid)
      ),
      takeUntil(this.destroy$)
    )
    .subscribe();

  private quiz;
  private user;

  public constructor(
    private authFacade: AuthFacade,
    private quizFacade: QuizFacade,
    private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(
        tap(params => this.quizFacade.get(params.get("id"))),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

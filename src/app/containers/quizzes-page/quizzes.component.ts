import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthFacade } from "src/app/+state/auth.facade";
import { Papa } from "ngx-papaparse";
import { QuizFacade } from "src/app/+state/quiz.facade";
import { User } from "src/app/models/user";
import { tap, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: "app-quizzes",
  templateUrl: "./quizzes.component.html",
  styleUrls: ["./quizzes.component.scss"]
})
export class QuizzesPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  public isAdmin$ = this.authFacade.isAdmin$;
  public quizzes$ = this.quizFacade.all$;
  public user$ = this.authFacade.user$
    .pipe(
      tap(user => (this.user = user)),
      takeUntil(this.destroy$)
    )
    .subscribe();

  private user: User;

  public constructor(
    private authFacade: AuthFacade,
    private quizFacade: QuizFacade
  ) {}

  public ngOnInit() {
    this.quizFacade.getAll();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public processCsv(event) {
    this.quizFacade.importFromCsvFile(event.srcElement.files[0], this.user);
  }
}

import { Component, OnInit, OnDestroy } from "@angular/core";
import { QuizFacade } from "src/app/+state/quiz.facade";
import {
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from "@angular/router";
import { tap, distinctUntilChanged, takeUntil, filter } from "rxjs/operators";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { RadialChartOptions } from "chart.js";

@Component({
  selector: "app-quiz-metrics-page",
  templateUrl: "./quiz-metrics-page.component.html",
  styleUrls: ["./quiz-metrics-page.component.scss"]
})
export class QuizMetricsPageComponent implements OnInit, OnDestroy {
  public destroy$ = new Subject();
  public quiz$ = this.quizFacade.selected$.pipe(
    tap(quiz => (this.quiz = quiz))
  );
  public usersAnswersScoreMetric$ = this.quizFacade
    .selectedQuizUsersAnswersScoreMetric$;
  public answeredQuestionsMetric$ = this.quizFacade
    .selectedQuizAnsweredQuestionsMetric$;
  public wrongAnswersMetric$ = this.quizFacade.selectedQuizWrongAnswersMetric$;

  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = false;
  public showXAxisLabel = true;
  public xAxisLabel = "Score";
  public showYAxisLabel = true;
  public yAxisLabel = "User";
  public colorScheme = {
    domain: ["#010038", "#293a80", "#537ec5", "#f39422"]
  };

  public radarChartOptions: RadialChartOptions = {
    responsive: true
  };

  public quiz;
  public seniorityMetricsByUser;
  public skillsMetricsByUser;
  public userForm: FormGroup;
  public userSelectLabel = "Select user";

  public constructor(
    private quizFacade: QuizFacade,
    private formBuilder: FormBuilder,
    private activatedRouteSnapshot: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.buildUserForm();

    this.activatedRouteSnapshot.paramMap
      .pipe(tap(params => this.quizFacade.getWithMetrics(params.get("id"))))
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public get selectedUser(): string {
    return this.userForm
      ? this.userForm.get("selectedUser").value !== this.userSelectLabel
        ? this.userForm.get("selectedUser").value
        : ""
      : "";
  }

  private buildUserForm() {
    this.userForm = this.formBuilder.group({
      selectedUser: [this.userSelectLabel, []]
    });

    this.userForm
      .get("selectedUser")
      .valueChanges.pipe(
        filter(value => !!value),
        tap(value => {
          const cleanValues = value.filter(
            value => value !== this.userSelectLabel
          );
          if (!cleanValues.length) {
            this.seniorityMetricsByUser = null;
            this.skillsMetricsByUser = null;
            return;
          }

          this.seniorityMetricsByUser = this.quiz.seniorityMetricsByUserEmails(
            cleanValues
          );

          this.skillsMetricsByUser = this.quiz.skillsMetricsByUserEmails(
            cleanValues
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}

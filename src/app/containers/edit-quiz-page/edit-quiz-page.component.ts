import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { QuizFacade } from "src/app/+state/quiz.facade";
import { tap, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Question } from "src/app/models/question";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Quiz } from "src/app/models/quiz";

@Component({
  selector: "app-edit-quiz-page",
  templateUrl: "./edit-quiz-page.component.html",
  styleUrls: ["./edit-quiz-page.component.scss"]
})
export class EditQuizPageComponent implements OnInit, OnDestroy {
  public destroy$ = new Subject();

  public quiz$ = this.quizFacade.selected$.pipe(
    tap(quiz => (this.quiz = quiz))
  );
  public status$ = this.quizFacade.selectedStatus$;

  public quiz: Quiz;
  public itemsPerPage = 10;
  public searchForm: FormGroup;
  public activeQuestionForm: FormGroup;
  public mode = "preview";

  public constructor(
    private quizFacade: QuizFacade,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(
        tap(params => this.quizFacade.get(params.get("id"))),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.buildSearchForm();
    this.buildQuestionForm();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.quizFacade.cleanSelected();
  }

  public buildQuestionForm() {
    this.activeQuestionForm = this.formBuilder.group({
      uid: [null, Validators.required],
      question: [null, Validators.required],
      wrong_answer_1: [null, Validators.required],
      right_answer: [null, Validators.required],
      wrong_answer_2: [null, Validators.required],
      wrong_answer_3: [null, Validators.required],
      wrong_answer_4: [null, Validators.required],

      skill: [null, Validators.required],
      seniority: [null, Validators.required],
      time: [null, Validators.required],
      score: [null, Validators.required]
    });
  }

  public pathActiveQuestionForm(data: Question, index: number) {
    this.activeQuestionForm.patchValue({ ...data, index });
  }

  public buildSearchForm() {
    this.searchForm = this.formBuilder.group({ search: [""] });
  }

  public get searchValue(): string {
    return this.searchForm ? this.searchForm.get("search").value : "";
  }

  public get questions(): Question[] {
    return this.quiz ? this.quiz.questions : [];
  }

  public get filteredQuestions(): Question[] {
    return this.questions
      .filter(
        question =>
          (question.question &&
            question.question
              .toLowerCase()
              .includes(this.searchValue.toLowerCase())) ||
          (question.author &&
            question.author
              .toLowerCase()
              .includes(this.searchValue.toLowerCase()))
      )
      .slice(0, this.itemsPerPage);
  }

  public updateQuestion() {
    const { uid, ...questionUpdated } = this.activeQuestionForm.value;

    this.activeQuestionForm.reset();
    this.quizFacade.updateQuestion(this.quiz.uid, uid, questionUpdated);
  }

  public deleteQuestion(questionId: string) {
    this.quizFacade.deleteQuestion(this.quiz.uid, questionId);
  }

  private updateQuiz(updatedQuiz) {
    this.quizFacade.update(this.quiz.uid, updatedQuiz);
  }
}

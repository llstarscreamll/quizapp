import { Subject } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { tap, filter, takeUntil, withLatestFrom } from "rxjs/operators";

import { Quiz } from "src/app/models/quiz";
import { User } from "src/app/models/user";
import { Question } from "src/app/models/question";
import { AuthFacade } from "src/app/+state/auth.facade";
import { QuizFacade } from "src/app/+state/quiz.facade";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

class UserQuestionAnswers {
  lastEntry: string;
  current: { uid: string; startedAt: string };
  answers: {
    [key: string]: {
      question: string;
      answerId: string;
      answerText: string;
      points: number;
      startedAt: string;
      finishedAt: string;
    };
  };
}

@Component({
  selector: "app-take-quiz-page",
  templateUrl: "./take-quiz-page.component.html",
  styleUrls: ["./take-quiz-page.component.scss"]
})
export class TakeQuizPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  public userAnswers$ = this.quizFacade.userQuizAnswers$
    .pipe(
      tap(userAnswers => (this.userAnswers = userAnswers)),
      filter(_ => !!this.user),
      tap(_ => this.checkForCurrentQuestion()),
      takeUntil(this.destroy$)
    )
    .subscribe();

  public quiz$ = this.quizFacade.selected$;
  public user$ = this.authFacade.user$
    .pipe(
      withLatestFrom(this.quiz$),
      filter(([user, quiz]) => !!user && !!quiz),
      tap(([user, quiz]) =>
        this.quizFacade.setLastUserQuizEntry(user.uid, quiz.uid)
      ),
      tap(([user, quiz]) => {
        this.quizFacade.getUserQuizAnswers(user.uid, quiz.uid);
        this.quizFacade.setQuizApplicant(quiz.uid, user);

        this.user = user;
        this.quiz = quiz;
      }),
      takeUntil(this.destroy$)
    )
    .subscribe();

  private user: User;
  public quiz: Quiz;
  public form: FormGroup;
  public userAnswers: UserQuestionAnswers;
  public currentAnswerOptions: any[] = [];
  public currentQuestion: Question;

  public constructor(
    private authFacade: AuthFacade,
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

    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      selectedAnswer: ["", [Validators.required]]
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public get newRandomQuestion(): Question {
    return this.availableQuestions[
      this.getRandomNumber(this.availableQuestions.length)
    ];
  }

  public get answeredQuestionIds(): string[] {
    return this.userAnswers ? Object.keys(this.userAnswers.answers || {}) : [];
  }

  public get availableQuestions() {
    return this.quiz.questions.filter(
      aq => !this.answeredQuestionIds.includes(aq.uid)
    );
  }

  public get answeredQuestionsCount(): number {
    return Object.keys(this.userAnswers.answers || {}).length;
  }

  private getQuestionFromId(questionUid: string) {
    return this.quiz.questions.find(q => q.uid === questionUid);
  }

  private getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max);
  }

  public checkForCurrentQuestion() {
    if (this.userAnswers && this.userAnswers.current) {
      this.currentQuestion = this.getQuestionFromId(
        this.userAnswers.current.uid
      );
      this.currentAnswerOptions = this.currentQuestion.randomAnswerOptions();
    }

    if (!this.currentQuestion) {
      this.quizFacade.setCurrentUserQuizQuestion(
        this.user.uid,
        this.quiz.uid,
        this.newRandomQuestion.uid
      );
    }
  }

  public setAnswer() {
    const selectedAnswer = this.form.get("selectedAnswer").value;
    const answer = {
      questionId: this.currentQuestion.uid,
      question: this.currentQuestion.question,
      answerId: selectedAnswer.code,
      answerText: selectedAnswer.name,
      points:
        selectedAnswer.code === "right_answer" ? this.currentQuestion.score : 0,
      startedAt: this.userAnswers.current.startedAt,
      finishedAt: new Date()
    };

    this.form.reset();

    this.quizFacade.setQuestionAnswer(
      this.user.uid,
      this.quiz.uid,
      this.currentQuestion.uid,
      answer
    );

    this.currentAnswerOptions = null;
    this.currentQuestion = null;
  }
}

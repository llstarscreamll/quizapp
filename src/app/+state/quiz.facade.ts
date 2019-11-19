import { Store } from "@ngrx/store";
import { Injectable } from "@angular/core";

import {
  getSelected,
  getSelectedStatus,
  getAll,
  getLoadedStatus,
  getError,
  getActiveQuizzes,
  getUserQuizAnswers
} from "./quiz-selectors";
import {
  GetAll,
  ImportFromCsv,
  Get,
  Update,
  DeleteQuestion,
  UpdateQuestion,
  GetSuccess,
  TakenByUser,
  GetQuizAnswersFromUser,
  SetLastUserQuizEntry,
  SetCurrentUserQuizQuestion,
  SetQuestionAnswer
} from "./quizzes.actions";
import { User } from "../models/user";
import { Quiz } from "../models/quiz";
import { Question } from "../models/question";

@Injectable({ providedIn: "root" })
export class QuizFacade {
  public all$ = this.store.select(getAll);
  public error$ = this.store.select(getError);
  public selected$ = this.store.select(getSelected);
  public loadedStatus$ = this.store.select(getLoadedStatus);
  public activeQuizzes$ = this.store.select(getActiveQuizzes);
  public selectedStatus$ = this.store.select(getSelectedStatus);
  public userQuizAnswers$ = this.store.select(getUserQuizAnswers);

  public constructor(private store: Store<any>) {}

  public importFromCsvFile(file, creator: User) {
    this.store.dispatch(new ImportFromCsv({ file, creator }));
  }

  public getAll() {
    this.store.dispatch(new GetAll());
  }

  public get(quizId: string) {
    this.store.dispatch(new Get(quizId));
  }

  public setQuizApplicant(quizUid, user) {
    this.store.dispatch(new TakenByUser({ quizUid, user }));
  }

  public update(quizUid: string, quizData: Quiz) {
    this.store.dispatch(new Update({ quizUid, quizData }));
  }

  public cleanSelected() {
    this.store.dispatch(new GetSuccess(null));
  }

  public updateQuestion(quizUid: string, questionUid: string, data: Question) {
    this.store.dispatch(new UpdateQuestion({ quizUid, questionUid, data }));
  }

  public deleteQuestion(quizUid: string, questionUid: string) {
    this.store.dispatch(new DeleteQuestion({ quizUid, questionUid }));
  }

  public getUserQuizAnswers(userUid: string, quizId: string) {
    this.store.dispatch(new GetQuizAnswersFromUser({ userUid, quizId }));
  }

  public setLastUserQuizEntry(userUid: string, quizUid: string) {
    this.store.dispatch(new SetLastUserQuizEntry({ userUid, quizUid }));
  }

  public setQuestionAnswer(
    userUid: string,
    quizUid: string,
    questionUid: string,
    answer: any
  ) {
    this.store.dispatch(
      new SetQuestionAnswer({ userUid, quizUid, questionUid, answer })
    );
  }

  public setCurrentUserQuizQuestion(
    userUid: string,
    quizUid: string,
    questionUid: string
  ) {
    this.store.dispatch(
      new SetCurrentUserQuizQuestion({ userUid, quizUid, questionUid })
    );
  }
}

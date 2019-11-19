import { Injectable } from "@angular/core";
import { switchMap, map, tap, take } from "rxjs/operators";
import { Actions, Effect, ofType } from "@ngrx/effects";

import { QuizService } from "../services/quiz.service";
import {
  GetAllSuccess,
  QuizActionTypes,
  ImportFromCsv,
  Get,
  GetSuccess,
  Update,
  UpdateSuccess,
  GetAll,
  DeleteQuestion,
  DeleteQuestionSuccess,
  UpdateQuestion,
  UpdateQuestionSuccess,
  TakenByUser,
  TakenByUserSuccess,
  GetQuizAnswersFromUser,
  GetQuizAnswersFromUserSuccess,
  SetLastUserQuizEntry,
  SetLastUserQuizEntrySuccess,
  SetCurrentUserQuizQuestion,
  SetCurrentUserQuizQuestionSuccess,
  SetQuestionAnswer,
  SetQuestionAnswerSuccess
} from "./quizzes.actions";

@Injectable()
export class QuizEffects {
  @Effect()
  public getAll$ = this.actions$.pipe(
    ofType(QuizActionTypes.GetAll),
    switchMap(_ =>
      this.quizService.getAll().pipe(map(quizzes => new GetAllSuccess(quizzes)))
    )
  );

  @Effect()
  public get$ = this.actions$.pipe(
    ofType(QuizActionTypes.Get),
    switchMap((action: Get) =>
      this.quizService
        .get(action.payload)
        .pipe(map(quiz => new GetSuccess(quiz)))
    )
  );

  @Effect()
  public getQuizAnswersFromUser$ = this.actions$.pipe(
    ofType(QuizActionTypes.GetUserQuizAnswers),
    switchMap((action: GetQuizAnswersFromUser) =>
      this.quizService
        .getUserQuizAnswers(action.payload.userUid, action.payload.quizId)
        .pipe(map(quiz => new GetQuizAnswersFromUserSuccess(quiz)))
    )
  );

  @Effect()
  public takenByUser$ = this.actions$.pipe(
    ofType(QuizActionTypes.TakenByUser),
    switchMap((action: TakenByUser) =>
      this.quizService
        .setQuizApplicant(action.payload.quizUid, action.payload.user)
        .pipe(map(_ => new TakenByUserSuccess()))
    )
  );

  @Effect()
  public update$ = this.actions$.pipe(
    ofType(QuizActionTypes.Update),
    switchMap((action: Update) =>
      this.quizService
        .update(action.payload.quizUid, action.payload.quizData)
        .pipe(map(quiz => new UpdateSuccess(action.payload.quizUid)))
    )
  );

  @Effect()
  public setLastUserQuizEntry$ = this.actions$.pipe(
    ofType(QuizActionTypes.SetLastUserQuizEntry),
    switchMap((action: SetLastUserQuizEntry) =>
      this.quizService
        .setLastUserQuizEntryDate(
          action.payload.userUid,
          action.payload.quizUid
        )
        .pipe(map(quiz => new SetLastUserQuizEntrySuccess()))
    )
  );

  @Effect()
  public setCurrentUserQuizQuestion$ = this.actions$.pipe(
    ofType(QuizActionTypes.SetCurrentUserQuizQuestion),
    switchMap((action: SetCurrentUserQuizQuestion) =>
      this.quizService
        .setCurrentUserQuizQuestion(
          action.payload.userUid,
          action.payload.quizUid,
          action.payload.questionUid
        )
        .pipe(map(quiz => new SetCurrentUserQuizQuestionSuccess()))
    )
  );

  @Effect()
  public setQuestionAnswer$ = this.actions$.pipe(
    ofType(QuizActionTypes.SetQuestionAnswer),
    switchMap((action: SetQuestionAnswer) =>
      this.quizService
        .setQuestionAnswer(
          action.payload.userUid,
          action.payload.quizUid,
          action.payload.questionUid,
          action.payload.answer
        )
        .pipe(map(quiz => new SetQuestionAnswerSuccess()))
    )
  );

  @Effect()
  public updateSuccess$ = this.actions$.pipe(
    ofType(QuizActionTypes.UpdateSuccess),
    map((action: UpdateSuccess) => new Get(action.payload))
  );

  @Effect()
  public updateQuestionSuccess$ = this.actions$.pipe(
    ofType(QuizActionTypes.UpdateQuestion),
    switchMap((action: UpdateQuestion) =>
      this.quizService
        .updateQuestion(
          action.payload.quizUid,
          action.payload.questionUid,
          action.payload.data
        )
        .pipe(map(quiz => new UpdateQuestionSuccess()))
    )
  );

  @Effect()
  public deleteQuestion$ = this.actions$.pipe(
    ofType(QuizActionTypes.DeleteQuestion),
    switchMap((action: DeleteQuestion) =>
      this.quizService
        .deleteQuestion(action.payload.quizUid, action.payload.questionUid)
        .pipe(map(_ => new DeleteQuestionSuccess()))
    )
  );

  @Effect({ dispatch: false })
  public importFromCsv$ = this.actions$.pipe(
    ofType(QuizActionTypes.ImportFromCsv),
    tap((action: ImportFromCsv) =>
      this.quizService.importFromCsvFile(action.payload)
    )
  );

  constructor(private actions$: Actions, private quizService: QuizService) {}
}

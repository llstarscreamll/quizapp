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
  GetQuizAnswersFromUserSuccess
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
    ofType(QuizActionTypes.GetQuizAnswersFromUser),
    switchMap((action: GetQuizAnswersFromUser) =>
      this.quizService
        .getQuizAnswersFromUser(action.payload.quizId, action.payload.userUid)
        .pipe(
          take(1),
          map(quiz => new GetQuizAnswersFromUserSuccess(quiz))
        )
    )
  );

  @Effect()
  public takenByUser$ = this.actions$.pipe(
    ofType(QuizActionTypes.TakenByUser),
    switchMap((action: TakenByUser) =>
      this.quizService
        .userHasTakenQuiz(action.payload.quizUid, action.payload.user)
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

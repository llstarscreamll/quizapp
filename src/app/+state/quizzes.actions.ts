import { Action } from "@ngrx/store";

import { Quiz } from "../models/quiz";
import { Error } from "../models/error";
import { User } from "../models/user";
import { Question } from "../models/question";

export enum QuizActionTypes {
  GetAll = "[Quiz] all",
  GetAllSuccess = "[Quiz] all success",
  GetAllError = "[Quiz] all error",

  GetWithMetrics = "[Quiz] get with metrics",
  Get = "[Quiz] get",
  GetSuccess = "[Quiz] get success",
  GetError = "[Quiz] get error",

  GetUserQuizAnswers = "[Quiz] get user quiz answers",
  GetUserQuizAnswersSuccess = "[Quiz] get user quiz answers success",
  GetUserQuizAnswersError = "[Quiz] get user quiz answers error",

  TakenByUser = "[Quiz] taken by user",
  TakenByUserSuccess = "[Quiz] taken by user success",
  TakenByUserError = "[Quiz] taken by user error",

  Update = "[Quiz] update",
  UpdateSuccess = "[Quiz] update success",
  UpdateError = "[Quiz] update error",

  UpdateQuestion = "[Quiz] update question",
  UpdateQuestionSuccess = "[Quiz] update question success",
  UpdateQuestionError = "[Quiz] update question error",

  SetLastUserQuizEntry = "[Quiz] set last user ques entry",
  SetLastUserQuizEntrySuccess = "[Quiz] set last user ques entry success",

  SetQuestionAnswer = "[Quiz] set question answer",
  SetQuestionAnswerSuccess = "[Quiz] set question answer success",

  SetCurrentUserQuizQuestion = "[Quiz] set current user quiz question",
  SetCurrentUserQuizQuestionSuccess = "[Quiz] set current user quiz question success",

  DeleteQuestion = "[Quiz] delete question",
  DeleteQuestionSuccess = "[Quiz] delete question success",
  DeleteQuestionError = "[Quiz] delete question error",

  ImportFromCsv = "[Quiz] import from csv",
  ImportFromCsvSuccess = "[Quiz] import from csv success",
  ImportFromCsvError = "[Quiz] import from csv error",

  CleanErrors = "[Quiz] clean errors"
}

export class GetAll implements Action {
  public readonly type = QuizActionTypes.GetAll;
  public constructor() {}
}

export class GetAllSuccess implements Action {
  public readonly type = QuizActionTypes.GetAllSuccess;
  public constructor(public payload: Quiz[]) {}
}

export class GetAllError implements Action {
  public readonly type = QuizActionTypes.GetAllError;
  public constructor(public payload: Error) {}
}

export class Get implements Action {
  public readonly type = QuizActionTypes.Get;
  public constructor(public payload: string) {}
}

export class GetWithMetrics implements Action {
  public readonly type = QuizActionTypes.GetWithMetrics;
  public constructor(public payload: string) {}
}

export class GetSuccess implements Action {
  public readonly type = QuizActionTypes.GetSuccess;
  public constructor(public payload: Quiz) {}
}

export class GetError implements Action {
  public readonly type = QuizActionTypes.GetError;
  public constructor(public payload: Error) {}
}

export class GetQuizAnswersFromUser implements Action {
  public readonly type = QuizActionTypes.GetUserQuizAnswers;
  public constructor(public payload: { userUid: string; quizId: string }) {}
}

export class GetQuizAnswersFromUserSuccess implements Action {
  public readonly type = QuizActionTypes.GetUserQuizAnswersSuccess;
  public constructor(public payload: any) {}
}

export class GetQuizAnswersFromUserError implements Action {
  public readonly type = QuizActionTypes.GetUserQuizAnswersError;
  public constructor(public payload: Error) {}
}

export class TakenByUser implements Action {
  public readonly type = QuizActionTypes.TakenByUser;
  public constructor(public payload: any) {}
}

export class TakenByUserSuccess implements Action {
  public readonly type = QuizActionTypes.TakenByUserSuccess;
}

export class TakenByUserError implements Action {
  public readonly type = QuizActionTypes.TakenByUserError;
  public constructor(public payload: Error) {}
}

export class Update implements Action {
  public readonly type = QuizActionTypes.Update;
  public constructor(public payload: { quizUid: string; quizData: Quiz }) {}
}

export class UpdateSuccess implements Action {
  public readonly type = QuizActionTypes.UpdateSuccess;
  public constructor(public payload: string) {}
}

export class UpdateError implements Action {
  public readonly type = QuizActionTypes.UpdateError;
  public constructor(public payload: Error) {}
}

export class UpdateQuestion implements Action {
  public readonly type = QuizActionTypes.UpdateQuestion;
  public constructor(
    public payload: { quizUid: string; questionUid: string; data: Question }
  ) {}
}

export class UpdateQuestionSuccess implements Action {
  public readonly type = QuizActionTypes.UpdateQuestionSuccess;
  public constructor() {}
}

export class UpdateQuestionError implements Action {
  public readonly type = QuizActionTypes.UpdateQuestionError;
  public constructor(public payload: Error) {}
}

export class SetLastUserQuizEntry implements Action {
  public readonly type = QuizActionTypes.SetLastUserQuizEntry;
  public constructor(public payload: { userUid: string; quizUid: string }) {}
}

export class SetLastUserQuizEntrySuccess implements Action {
  public readonly type = QuizActionTypes.SetLastUserQuizEntrySuccess;
  public constructor() {}
}

export class SetQuestionAnswer implements Action {
  public readonly type = QuizActionTypes.SetQuestionAnswer;
  public constructor(
    public payload: {
      userUid: string;
      quizUid: string;
      questionUid: string;
      answer: any;
    }
  ) {}
}

export class SetQuestionAnswerSuccess implements Action {
  public readonly type = QuizActionTypes.SetQuestionAnswerSuccess;
  public constructor() {}
}

export class SetCurrentUserQuizQuestion implements Action {
  public readonly type = QuizActionTypes.SetCurrentUserQuizQuestion;
  public constructor(
    public payload: { userUid: string; quizUid: string; questionUid: string }
  ) {}
}

export class SetCurrentUserQuizQuestionSuccess implements Action {
  public readonly type = QuizActionTypes.SetCurrentUserQuizQuestionSuccess;
  public constructor() {}
}

export class DeleteQuestion implements Action {
  public readonly type = QuizActionTypes.DeleteQuestion;
  public constructor(
    public payload: { quizUid: string; questionUid: string }
  ) {}
}

export class DeleteQuestionSuccess implements Action {
  public readonly type = QuizActionTypes.DeleteQuestionSuccess;
  public constructor() {}
}

export class DeleteQuestionError implements Action {
  public readonly type = QuizActionTypes.DeleteQuestionError;
  public constructor(public payload: Error) {}
}

export class ImportFromCsv implements Action {
  public readonly type = QuizActionTypes.ImportFromCsv;
  public constructor(public payload: { file: any; creator: User }) {}
}

export class ImportFromCsvSuccess implements Action {
  public readonly type = QuizActionTypes.ImportFromCsvSuccess;
  public constructor(public payload: any) {}
}

export class ImportFromCsvError implements Action {
  public readonly type = QuizActionTypes.ImportFromCsvError;
  public constructor(public payload: Error) {}
}

export type QuizAction =
  | GetAll
  | GetAllSuccess
  | GetAllError
  | GetWithMetrics
  | Get
  | GetSuccess
  | GetError
  | GetQuizAnswersFromUser
  | GetQuizAnswersFromUserSuccess
  | GetQuizAnswersFromUserError
  | TakenByUser
  | TakenByUserSuccess
  | TakenByUserError
  | Update
  | UpdateSuccess
  | UpdateError
  | SetLastUserQuizEntry
  | SetLastUserQuizEntrySuccess
  | SetQuestionAnswer
  | SetQuestionAnswerSuccess
  | DeleteQuestion
  | DeleteQuestionSuccess
  | DeleteQuestionError
  | ImportFromCsv
  | ImportFromCsvSuccess
  | ImportFromCsvError;

export const fromQuizActions = {
  GetAll,
  GetAllSuccess,
  GetAllError,
  Get,
  GetWithMetrics,
  GetSuccess,
  GetError,
  GetQuizAnswersFromUser,
  GetQuizAnswersFromUserSuccess,
  GetQuizAnswersFromUserError,
  TakenByUser,
  TakenByUserSuccess,
  TakenByUserError,
  Update,
  UpdateSuccess,
  UpdateError,
  SetLastUserQuizEntry,
  SetLastUserQuizEntrySuccess,
  SetQuestionAnswer,
  SetQuestionAnswerSuccess,
  DeleteQuestion,
  DeleteQuestionSuccess,
  DeleteQuestionError,
  ImportFromCsv,
  ImportFromCsvSuccess,
  ImportFromCsvError
};

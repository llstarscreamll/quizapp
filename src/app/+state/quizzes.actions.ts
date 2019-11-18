import { Action } from "@ngrx/store";

import { Quiz } from "../models/quiz";
import { Error } from "../models/error";
import { User } from "../models/user";
import { Question } from "../models/question";

export enum QuizActionTypes {
  GetAll = "[Quiz] all",
  GetAllSuccess = "[Quiz] all success",
  GetAllError = "[Quiz] all error",

  Get = "[Quiz] get",
  GetSuccess = "[Quiz] get success",
  GetError = "[Quiz] get error",

  Update = "[Quiz] update",
  UpdateSuccess = "[Quiz] update success",
  UpdateError = "[Quiz] update error",

  UpdateQuestion = "[Quiz] update question",
  UpdateQuestionSuccess = "[Quiz] update question success",
  UpdateQuestionError = "[Quiz] update question error",

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

export class GetSuccess implements Action {
  public readonly type = QuizActionTypes.GetSuccess;
  public constructor(public payload: Quiz) {}
}

export class GetError implements Action {
  public readonly type = QuizActionTypes.GetError;
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
  | Get
  | GetSuccess
  | GetError
  | Update
  | UpdateSuccess
  | UpdateError
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
  GetSuccess,
  GetError,
  Update,
  UpdateSuccess,
  UpdateError,
  DeleteQuestion,
  DeleteQuestionSuccess,
  DeleteQuestionError,
  ImportFromCsv,
  ImportFromCsvSuccess,
  ImportFromCsvError
};

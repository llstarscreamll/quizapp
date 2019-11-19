import { Quiz } from "../models/quiz";
import { Error } from "../models/error";
import { LoadStatus } from "../enums/load-status";
import { QuizActionTypes, QuizAction } from "./quizzes.actions";

export const QUIZ_FEATURE_KEY = "QUIZ";

export interface QuizState {
  loaded: Quiz[];
  loadedStatus: LoadStatus;
  selected?: Quiz;
  selectedStatus?: LoadStatus;
  userQuizAnswers?: any;
  errors?: Error;
}

export const initialState: QuizState = {
  loaded: [],
  loadedStatus: null
};

export function quizReducer(
  state: QuizState = initialState,
  action: QuizAction
): QuizState {
  switch (action.type) {
    case QuizActionTypes.GetAll: {
      state = {
        ...state,
        loadedStatus: LoadStatus.loading
      };
      break;
    }

    case QuizActionTypes.GetAllSuccess: {
      state = {
        ...state,
        loaded: action.payload,
        loadedStatus: LoadStatus.loaded
      };
      break;
    }

    case QuizActionTypes.GetAllError: {
      state = {
        ...state,
        loadedStatus: LoadStatus.error
      };
      break;
    }

    case QuizActionTypes.Get: {
      state = {
        ...state,
        selectedStatus: LoadStatus.loading
      };
      break;
    }

    case QuizActionTypes.GetSuccess: {
      state = {
        ...state,
        selected: action.payload,
        selectedStatus: LoadStatus.loaded
      };
      break;
    }

    case QuizActionTypes.GetError: {
      state = {
        ...state,
        selectedStatus: LoadStatus.error
      };
      break;
    }

    case QuizActionTypes.GetUserQuizAnswersSuccess: {
      state = {
        ...state,
        userQuizAnswers: action.payload
      };
      break;
    }
  }

  return state;
}

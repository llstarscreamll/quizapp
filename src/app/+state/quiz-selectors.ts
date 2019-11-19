import { createSelector } from "@ngrx/store";

import { QuizState, QUIZ_FEATURE_KEY } from "./quizzes.reducer";

export const selectQuizStatue = (state: QuizState) => state[QUIZ_FEATURE_KEY];
export const getSelected = createSelector(
  selectQuizStatue,
  (state: QuizState) => state.selected
);
export const getSelectedStatus = createSelector(
  selectQuizStatue,
  (state: QuizState) => state.selectedStatus
);
export const getAll = createSelector(
  selectQuizStatue,
  (state: QuizState) => state.loaded
);
export const getActiveQuizzes = createSelector(
  selectQuizStatue,
  (state: QuizState) => state.loaded.filter(quiz => quiz.isAvailable())
);
export const getLoadedStatus = createSelector(
  selectQuizStatue,
  (state: QuizState) => state.loadedStatus
);
export const getUserQuizAnswers = createSelector(
  selectQuizStatue,
  (state: QuizState) => state.userQuizAnswers
);
export const getError = createSelector(
  selectQuizStatue,
  (state: QuizState) => state.errors
);

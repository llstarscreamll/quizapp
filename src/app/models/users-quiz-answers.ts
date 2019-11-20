import { Answer } from "../services/quiz.service";
import { User } from "./user";
export class UserQuizAnswers {
  answers: {
    [key: string]: Answer;
  };
  // answers object mapped to array
  arrAnswers: Answer[];
  current: {
    startedAt: string;
    uid: string;
  };
  lastEntry: string;
  // the following fields are computed on Firestore Query
  uid: string;
  quizUid: string;
  userUid: string;
  user: User;
}

import * as firebase from "firebase/app";
import { Injectable } from "@angular/core";
import { Observable, Subject, of } from "rxjs";
import { map, switchMap, tap, withLatestFrom, filter } from "rxjs/operators";
import { AngularFirestore, DocumentSnapshot } from "@angular/fire/firestore";

import { Quiz } from "../models/quiz";
import { Papa } from "ngx-papaparse";
import { User } from "../models/user";
import { Question } from "../models/question";
import { UserService } from "./user.service";
import { UserQuizAnswers } from "../models/users-quiz-answers";

export class Answer {
  answerId: string;
  answerText: string;
  points: number;
  question: string;
  questionId: string;
  finishedAt: string;
  startedAt: string;
  // the following fields are computed on Firestore Query
  uid: string;
  userUid: string;
  skill: string;
  seniority: string;
}

@Injectable()
export class QuizService {
  private csvHeaderMap = {
    Responsable: "author",
    Habilidad: "skill",
    Seniority: "seniority",
    "Tiempo para respuesta (min)": "time",
    "Puntuación (%)": "score",
    Pregunta: "question",
    "Respuesta 1": "wrong_answer_1",
    "Respuesta 2": "right_answer",
    "Respuesta 3": "wrong_answer_2",
    "Respuesta 4": "wrong_answer_3",
    "Respuesta 5": "wrong_answer_4"
  };

  public constructor(
    private papa: Papa,
    private db: AngularFirestore,
    private userService: UserService
  ) {}

  private userQuizAnswersKey(userUid: string, quizUid: string): string {
    return `user_quiz_answers/${userUid}---${quizUid}`;
  }

  public getAll(): Observable<Quiz[]> {
    return this.db
      .collection<Quiz>(`quizzes`)
      .valueChanges()
      .pipe(map(data => Quiz.fromJsonList(data)));
  }

  public create(quiz) {
    const uid = this.db.createId();
    return this.db.doc(`quizzes/${uid}`).set({ ...quiz, uid });
  }

  public get(uid: string): Observable<Quiz> {
    return this.db
      .doc<Quiz>(`quizzes/${uid}`)
      .valueChanges()
      .pipe(map((rawQuiz: Quiz) => Quiz.fromJson(rawQuiz)));
  }

  public getWithMetrics(quizUid: string): Observable<Quiz> {
    return this.db
      .doc<Quiz>(`quizzes/${quizUid}`)
      .valueChanges()
      .pipe(
        withLatestFrom(
          this.getQuizResponses(quizUid),
          this.userService.getAll()
        ),
        filter(
          ([rawQuiz, arrAnswers, users]: [Quiz, UserQuizAnswers[], User[]]) =>
            !!arrAnswers && !!users
        ),
        tap(console.log),
        map(
          ([rawQuiz, arrAnswers, users]: [Quiz, UserQuizAnswers[], User[]]) => {
            const quiz = Quiz.fromJson(rawQuiz);

            quiz.usersAnswers = arrAnswers
              .map(userAnswer => ({
                ...userAnswer,
                user: users.find(u => u.uid === userAnswer.userUid)
              }))
              .map(userAnswer => {
                userAnswer.arrAnswers = userAnswer.arrAnswers.map(answer => {
                  const question = quiz.questions.find(
                    q => q.uid === answer.questionId
                  );

                  return {
                    ...answer,
                    skill: question.skill,
                    seniority: question.seniority
                  };
                });

                return userAnswer;
              });

            return quiz;
          }
        )
      );
  }

  private getQuizResponses(quizUid: string): Observable<any[]> {
    return this.db
      .collection<UserQuizAnswers>(`user_quiz_answers`)
      .valueChanges({ idField: "uid" })
      .pipe(
        map(data =>
          data
            .filter(row => row.uid.includes(quizUid))
            .map(row => {
              const [userUid] = row.uid.split("---");
              row.userUid = userUid;
              row.quizUid = quizUid;

              row.arrAnswers = Object.keys(row.answers || {}).map(
                questionUid => {
                  return {
                    ...row.answers[questionUid],
                    userUid,
                    quizUid,
                    questionUid
                  };
                },
                []
              );

              return row;
            })
        )
      );
  }

  public getUserQuizAnswers(userUid: string, quizUid: string): Observable<any> {
    return this.db
      .doc<any>(this.userQuizAnswersKey(userUid, quizUid))
      .valueChanges();
  }

  public setQuizApplicant(quizUid: string, user: any) {
    return of(
      this.db.doc(`quizzes/${quizUid}`).update({
        [`applicants.${user.uid}`]: { ...user, takenAt: new Date() }
      })
    );
  }

  public update(uid: string, data: any) {
    return of(this.db.doc(`quizzes/${uid}`).update(data));
  }

  public setLastUserQuizEntryDate(userUid: string, quizUid: string) {
    return of(
      this.db.doc(this.userQuizAnswersKey(userUid, quizUid)).set(
        {
          lastEntry: new Date()
        },
        { merge: true }
      )
    );
  }

  public setCurrentUserQuizQuestion(
    userUid: string,
    quizUid: string,
    questionUid: string
  ) {
    const reference = this.db.doc(this.userQuizAnswersKey(userUid, quizUid));

    return reference.get().pipe(
      switchMap((doc: DocumentSnapshot<any>) => {
        return doc.exists
          ? of(
              reference.update({
                ["current.uid"]: questionUid,
                ["current.startedAt"]: new Date()
              })
            )
          : of(
              reference.set({
                current: { uid: questionUid, startedAt: new Date() }
              })
            );
      })
    );
  }

  public setQuestionAnswer(
    userUid: string,
    quizUid: string,
    questionUid: string,
    answer: any
  ) {
    return of(
      this.db.doc(this.userQuizAnswersKey(userUid, quizUid)).update({
        [`answers.${questionUid}`]: answer,
        current: firebase.firestore.FieldValue.delete()
      })
    );
  }

  public updateQuestion(quizUid: string, questionUid: string, data: Question) {
    return of(
      this.db.doc(`quizzes/${quizUid}`).update({
        [`questions.${questionUid}`]: data
      })
    );
  }

  public deleteQuestion(quizUid: string, questionUid: string) {
    return of(
      this.db.doc(`quizzes/${quizUid}`).update({
        [`questions.${questionUid}`]: firebase.firestore.FieldValue.delete()
      })
    );
  }

  public importFromCsvFile({ file, creator }: { file: any; creator: User }) {
    let response = new Subject();
    let date = Date().replace(/GMT(.+)/i, "");
    let creatorRef = this.db.doc(`users/${creator.uid}`);

    this.papa.parse(file, {
      header: true,
      transformHeader: header => this.csvHeaderMap[header],
      error: error => {
        response.error(error);
        response.complete();
      },
      complete: (questions: any) => {
        this.create({
          name: `${creator.fullName} quiz from ${date}`,
          createdBy: creator,
          questions: questions.data.reduce((acc, row, index) => {
            let { uid, ...questionData } = this.mapRawQuestion(row, index);
            acc[uid] = questionData;

            return acc;
          }, {})
        }).then(_ => {
          response.next();
          response.complete();
        });
      }
    });

    return response;
  }

  private mapRawQuestion(rawQuestion, index) {
    const question: string = `${rawQuestion.question}`;
    let uid = encodeURIComponent(question).replace(
      /%([0-9A-F]{2})/g,
      (match, p) => {
        const charCode = ("0x" + p) as any;
        return String.fromCharCode(charCode);
      }
    );

    uid = `${index}-` + btoa(uid).replace(/[\~\*\/\[\]\-]/gi, "");

    return {
      uid,
      author: (rawQuestion.author || "").trim(),
      skill: (rawQuestion.skill || "").trim(),
      seniority: (rawQuestion.seniority || "").trim(),
      score: Number.parseInt((rawQuestion.score || "5").trim()) * 1,
      time: Number.parseInt((rawQuestion.time || "1").trim()) * 1,
      question: (rawQuestion.question || "").trim(),
      right_answer: (rawQuestion.right_answer || "").trim(),
      wrong_answer_1: (rawQuestion.wrong_answer_1 || "").trim(),
      wrong_answer_2: (rawQuestion.wrong_answer_2 || "").trim(),
      wrong_answer_3: (rawQuestion.wrong_answer_3 || "").trim(),
      wrong_answer_4: (rawQuestion.wrong_answer_4 || "").trim()
    };
  }
}

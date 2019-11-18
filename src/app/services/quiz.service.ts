import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Observable, from, Subject, of } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from "firebase/app";

import { Quiz } from "../models/quiz";
import { Papa } from "ngx-papaparse";
import { User } from "../models/user";
import { Question } from "../models/question";

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

  public constructor(private papa: Papa, private db: AngularFirestore) {}

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

  public update(uid: string, data: any) {
    return of(this.db.doc(`quizzes/${uid}`).update(data));
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

    uid = `${index}-` + btoa(uid);

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

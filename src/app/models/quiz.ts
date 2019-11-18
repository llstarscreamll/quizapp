import { User } from "./user";
import { Question } from "./question";

export class Quiz {
  uid?: string;
  name: string;
  questions: Question[];
  createdBy?: User;
  user?: any;

  public static fromJsonList(data: any[]): Quiz[] {
    return data.map(row => this.fromJson(row));
  }

  public static fromJson(data): Quiz {
    return Object.assign(new Quiz(), {
      ...data,
      questions: Question.fromJsonList(
        Object.keys(data.questions).reduce((acc, key) => {
          acc.push({ uid: key, ...data.questions[key] });

          return acc;
        }, [])
      )
    });
  }

  public get seniorities(): string[] {
    return (this.questions || [])
      .reduce((acc, question) => {
        acc.push(question.seniority);
        return acc;
      }, [])
      .filter(seniority => seniority != "")
      .filter((item, index, items) => items.indexOf(item) === index);
  }

  public get skills(): string[] {
    return (this.questions || [])
      .reduce((acc, question) => {
        acc.push(question.skill);
        return acc;
      }, [])
      .filter(skill => skill != "")
      .filter((item, index, items) => items.indexOf(item) === index);
  }
}

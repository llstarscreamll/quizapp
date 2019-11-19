import { User } from "./user";
import { Question } from "./question";

export class Quiz {
  uid?: string;
  name: string;
  questions: Question[];
  applicants: User[];
  startsAt?: Date;
  endsAt?: Date;
  createdBy?: User;
  user?: any;

  public static fromJsonList(data: any[]): Quiz[] {
    return data.map(row => this.fromJson(row));
  }

  public static fromJson(data): Quiz {
    return Object.assign(new Quiz(), {
      ...data,
      startsAt: new Date(data.startsAt || "1989-06-24: 00:00:00"),
      endsAt: new Date(data.endsAt || "1989-06-24 23:59:59"),
      questions: Question.fromJsonList(
        Object.keys(data.questions).reduce((acc, key) => {
          acc.push({ uid: key, ...data.questions[key] });

          return acc;
        }, [])
      ),
      applicants: Object.keys(data.applicants || {}).reduce((acc, key) => {
        acc.push({ uid: key, ...data.applicants[key] });

        return acc;
      }, [])
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

  public get timeLeftFromNow(): { minutes; seconds } {
    const now: Date = new Date();
    const milliseconds = this.endsAt.getTime() - now.getTime();
    const seconds = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds / 3600000) * 60);
    return { minutes, seconds };
  }

  public isAvailable(): boolean {
    const now = new Date();
    return now > this.startsAt && now < this.endsAt;
  }
}

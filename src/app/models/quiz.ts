import { User } from "./user";
import { Question } from "./question";
import { UserQuizAnswers } from "./users-quiz-answers";
import { ChartDataSets } from "chart.js";

export class Quiz {
  uid?: string;
  name: string;
  questions: Question[];
  applicants: User[];
  usersAnswers: UserQuizAnswers[];
  startsAt?: Date;
  endsAt?: Date;
  createdBy?: User;
  user?: any;

  senioritiesMap = {
    junior: "Junior",
    "junior 2": "Junior",
    "backend developer": "Semisenior",
    semisenior: "Semisenior",
    "semi senior": "Semisenior",
    senior: "Senior",
    "senior 1": "Senior",
    "senior 2": "Senior",
    "tech lead": "Senior"
  };

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
      .map(answer => this.mapAnswerSeniority(answer))
      .reduce((acc, question) => {
        acc.push(question.seniority.toLowerCase());
        return acc;
      }, [])
      .filter(seniority => seniority != "")
      .filter((item, index, items) => items.indexOf(item) === index)
      .sort();
  }

  public get skills(): string[] {
    return (this.questions || [])
      .reduce((acc, question) => {
        acc.push(question.skill.toLowerCase());
        return acc;
      }, [])
      .filter(skill => skill != "")
      .filter((item, index, items) => items.indexOf(item) === index)
      .sort();
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

  public totalScore(): number {
    return this.questions
      .map(question => question.score)
      .reduce((acc, score) => (acc += score), 0);
  }

  public usersAnswersScoreMetric(): any[] {
    return this.usersAnswers.map(userAnswer => ({
      name: userAnswer.user.fullName
        .split(" ")
        .slice(0, 2)
        .join(" "),
      value: userAnswer.arrAnswers
        .filter(answer => answer.answerText !== "" && answer.question !== "")
        .map(answer => answer.points)
        .reduce((acc, score) => (acc += score), 0)
    }));
  }

  public selectedQuizAnsweredQuestionsMetric(): any[] {
    return this.usersAnswers.map(userAnswer => ({
      name: userAnswer.user.fullName
        .split(" ")
        .slice(0, 2)
        .join(" "),
      value: userAnswer.arrAnswers.filter(
        answer => answer.answerText !== "" && answer.question !== ""
      ).length
    }));
  }

  public wrongAnswersByUser(): any[] {
    return this.usersAnswers.map(userAnswer => ({
      name: userAnswer.user.fullName
        .split(" ")
        .slice(0, 2)
        .join(" "),
      value: userAnswer.arrAnswers
        .filter(answer => answer.answerText !== "" && answer.question !== "")
        .filter(answer => answer.points === 0).length
    }));
  }

  public seniorityMetricsByUserEmails(emails: string[]): ChartDataSets[] {
    return emails.map(email => this.seniorityMetricsByUserEmail(email));
  }

  public skillsMetricsByUserEmails(emails: string[]): any[] {
    return emails.map(email => this.skillsMetricsByUserEmail(email));
  }

  public seniorityMetricsByUserEmail(userEmail: string): ChartDataSets {
    const userAnswers = this.usersAnswers.find(
      answer => answer.user.email === userEmail
    );

    let seniorityMetric = userAnswers.arrAnswers
      .filter(answer => answer.answerText !== "" && answer.question !== "")
      .map(answer => this.mapAnswerSeniority(answer))
      .reduce((acc, answer) => {
        const seniority = answer.seniority.toLowerCase();

        if (!acc[seniority]) {
          acc[seniority] = [];
        }

        // points owned by seniority
        acc[seniority].push(answer.points);

        return acc;
      }, {});

    seniorityMetric = Object.keys(seniorityMetric)
      .sort()
      .map(seniorityName =>
        seniorityMetric[seniorityName].reduce(
          (acc, points) => (acc += points),
          0
        )
      );

    return { data: seniorityMetric as number[], label: userEmail };
  }

  public skillsMetricsByUserEmail(userEmail: string): { name; value }[] {
    const userAnswers = this.usersAnswers.find(
      answer => answer.user.email === userEmail
    );

    let metric = userAnswers.arrAnswers
      .filter(answer => answer.answerText !== "" && answer.question !== "")
      .map(answer => this.mapAnswerSeniority(answer))
      .reduce((acc, answer) => {
        const skill = answer.skill.toLowerCase();

        if (!acc[skill]) {
          acc[skill] = [];
        }

        // points owned by skill
        acc[skill].push(answer.points);

        return acc;
      }, {});

    metric = Object.keys(metric)
      .sort()
      .map(skillName => ({
        name: skillName,
        value: metric[skillName].reduce((acc, points) => (acc += points), 0)
      }))
      .sort(i => i.value);

    return metric;
  }

  private mapAnswerSeniority(answer) {
    Object.keys(this.senioritiesMap).forEach(key => {
      if (answer.seniority.toLowerCase() === key.toLowerCase()) {
        answer = { ...answer, seniority: this.senioritiesMap[key] };
      }
    });

    return answer;
  }
}

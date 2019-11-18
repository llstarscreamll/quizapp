export class Question {
  uid?: string;
  author: string;
  skill: string;
  seniority: string;
  time: string;
  score: string;
  question: string;
  right_answer: string;
  wrong_answer_1: string;
  wrong_answer_2: string;
  wrong_answer_3: string;
  wrong_answer_4: string;

  public static fromJsonList(data: any[]): Question[] {
    return data.map(row => this.fromJson(row));
  }

  public static fromJson(data): Question {
    return Object.assign(new Question(), data);
  }

  public answerOptions(): any[] {
    return [
      { code: "wrong_answer_1", name: this.wrong_answer_1 },
      { code: "wrong_answer_2", name: this.wrong_answer_2 },
      { code: "wrong_answer_3", name: this.wrong_answer_3 },
      { code: "wrong_answer_4", name: this.wrong_answer_4 },
      { code: "right_answer", name: this.right_answer }
    ];
  }
}

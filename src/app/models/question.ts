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

  public randomAnswerOptions(): any[] {
    return this.shuffleArr(this.answerOptions());
  }

  /**
   * Taken from:
   * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
   * @param arr
   */
  private shuffleArr(arr: any[]): any[] {
    let currentIndex = arr.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }

    return arr;
  }
}

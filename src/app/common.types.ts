export class User {
  email: string;
  name: string;
  type: string;
  static fromJson(obj): User {
    const rv: User = new User();
    rv.email = obj.email;
    rv.name = obj.name;
    rv.type = obj.type;
    return rv;
  }
}

export class ClassRoster {
  className: string;
  students: User[];
  static fromJson(obj): ClassRoster {
    const rv: ClassRoster = new ClassRoster();
    rv.className = obj.className;
    rv.students = obj.students;
    return rv;
  }
}

export class CaughtError {
  message: string;
  static fromJson(obj): CaughtError {
    const err: CaughtError = new CaughtError();
    err.message = obj.message;
    return err;
  }
}

export class Survey {
      classID: string;
      name: string;
      questions: Question[];
    static fromJson(obj): Survey {
      const survey: Survey = new Survey();
      survey.classID = obj.classID;
      survey.name = obj.name;
      survey.questions = obj.questions;
      return survey;
    }
  }

export class Question {
   question: string;
   type: string;
   answers: Answer[];
   static fromJson(obj): Question {
     const question: Question = new Question();
     question.question = obj.question;
     question.type = obj.type;
     question.answers = obj.answers;
     return question;
   }
}

export class Answer {
   answer: string;
   type: string;
   static fromJson(obj): Answer {
     const answer: Answer = new Answer();
     answer.answer = obj.answer;
     answer.type = obj.type;
     return answer;
   }
}

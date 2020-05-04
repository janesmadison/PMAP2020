export class User {
  email: string;
  name: string;
  group: string;
  type: string;
  static fromJson(obj): User {
    const rv: User = new User();
    rv.email = obj.email;
    rv.name = obj.name;
    rv.group = obj.group;
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
      surveyID: string;
      classID: string;
      name: string;
      questions: Question[];
    static fromJson(obj): Survey {
      const survey: Survey = new Survey();
      survey.surveyID = obj.surveyID;
      survey.classID = obj.classID;
      survey.name = obj.name;
      survey.questions = obj.questions;
      return survey;
    }
  }
  
export class Results {
	question_text: string;
	studentResults: Result[];
     static fromJson(obj): Results {
     	const results: Results = new Results();
     	results.question_text = obj.question_text;
     	results.studentResults = obj.studentResults;
     	return results;
     	}
  }
  
export class Result {
	answer:string;
      static fromJson(obj): Result {
	const result: Result = new Result();
	result.answer = obj.nswer;
   	return result;
   	}
  }

export class Question {
   question: string;
   questionID: string;
   type: string;
   answers: Answer[];
   static fromJson(obj): Question {
     const question: Question = new Question();
     question.question = obj.question;
     question.questionID = obj.questionID;
     question.type = obj.type;
     question.answers = obj.answers;
     return question;
   }
}

export class Answer {
   answer: string;
   answerID: string;
   static fromJson(obj): Answer {
     const answer: Answer = new Answer();
     answer.answer = obj.answer;
     answer.answerID = obj.answer;
     return answer;
   }
}

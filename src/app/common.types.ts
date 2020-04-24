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

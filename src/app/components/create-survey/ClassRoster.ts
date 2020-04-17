import { Student } from './student';

export class ClassRoster {
  constructor(public className: string,
              public students: Student[]) {}
}

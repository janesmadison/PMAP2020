export class Survey {

  export interface surveyType{
      classID:string;
      surveyName:string;
      questionIndex:number;
      questionValue:string;
  }
  
  constructor(){
    public surveyArr:surveyType[] = []

  }

}

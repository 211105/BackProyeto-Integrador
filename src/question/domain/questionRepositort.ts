import { Question } from "./question";

export interface QuestionRepository{

    createQuestion(uuid:string,content:string):Promise<Question | null | string | Error>

    getAllQuestions():Promise<Question[] | null | string | Error>
}
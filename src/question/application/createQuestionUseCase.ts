import { Question } from "../domain/question";
import { QuestionRepository } from "../domain/questionRepositort";
import { v4 as uuid } from "uuid";
import { validate } from "class-validator";
import { ValidatorCreate } from "../domain/validations/question";

export class CreateQuestionUseCase{
    constructor(readonly questionRepository: QuestionRepository){}

    async post(content:string):Promise<Question | null | string | Error>{
        const miuuid: string = uuid()

        //validator-class
        let data = new ValidatorCreate(miuuid,content);
        const validation = await validate(data)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        
        try {
            const createQuestion = await this.questionRepository.createQuestion(miuuid,content);
            return createQuestion;
        } catch (error) {
            return null;
        }
    }
}
import { Question } from "../domain/question";
import { QuestionRepository } from "../domain/questionRepositort";

export class GetAllQuestionUseCase{

    constructor(readonly questionRepository: QuestionRepository){}

    async get():Promise<Question[] | null | string | Error>{
        try {
            const getAllQuestions = await this.questionRepository.getAllQuestions();
            return getAllQuestions;
        } catch (error) {
            return null;
        }
    }
}
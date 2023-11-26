import { query } from "../../database/connection";
import { Question } from "../domain/question";
import { QuestionRepository } from "../domain/questionRepositort";

export class MysqlQuestionRepository implements QuestionRepository{
    async createQuestion(uuid: string, content: string): Promise<string | Error | Question | null> {
        try {
            // const hashPassword = await encrypt(password)
           
            let sql = "INSERT INTO questions(uuid, content) VALUES (?, ?)";
            const params: any[] = [uuid, content];
            const [result]: any = await query(sql, params);
            return new Question(uuid, content);
        } catch (error) {
            console.error("Error adding review:", error);
            return error as Error;
        }
    }
    async getAllQuestions(): Promise<string | Error | Question[] | null> {
        try {
            let sql = "SELECT * FROM questions";
            const [rows, fields]: any = await query(sql);

            // Mapear los resultados a objetos Question
            const questions: Question[] = rows.map((row: any) => {
                return new Question(row.uuid, row.content);
            });

            return questions;
        } catch (error) {
            console.error("Error retrieving questions:", error);
            return error as Error;
        }
    }
} 
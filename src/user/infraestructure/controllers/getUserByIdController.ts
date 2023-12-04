import { LoginUserUseCase } from "../../application/loginUserUseCase";

export class getUserByIdController {
    constructor(readonly loginUserController: LoginUserUseCase) {}

    async run(req:Request,res:Response) {
        
    }
}
import { Request, Response } from "express";
import { ListMarkUseCase } from "../../application/listMarksUseCase";


export class ListMarkController{ 
    constructor(readonly listMarkUseCase: ListMarkUseCase){}

    async  run(req: Request, res: Response) {
        try {

            let {
                userLatitude,
                userLongitude,      
            } = req.query

           
            let createMark = await this.listMarkUseCase.run(Number(userLatitude), Number(userLongitude))
            return res.status(200).send({
                status: "ok",
                message: createMark
            });

        } catch (error) {
            if (error instanceof Error) {
                if (error.message.startsWith('[')) {      
                    const errors = JSON.parse(error.message);
                    const modifiedErrors = errors.map(({ property, children, constraints }) => ({
                        property,
                        children,
                        constraints
                    }));
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: modifiedErrors
                    });
                }
            }
            return res.status(500).send({
                status: "error",
                message: "An unexpected error occurred. Please try again later.",
            });
        }
    }
}


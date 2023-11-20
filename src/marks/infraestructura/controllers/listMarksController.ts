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
            console.log(userLatitude)
            console.log(userLongitude)
            //verificar si llegaron con algo 
            let createMark = await this.listMarkUseCase.run(Number(userLatitude), Number(userLongitude))
            return res.status(200).send({
                status: "ok",
                message: createMark
            });
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "An unexpected error occurred. Please try again later.",
            });
        }
    }
}


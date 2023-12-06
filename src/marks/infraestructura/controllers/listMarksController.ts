import { Request, Response } from "express";
import { ListMarkUseCase } from "../../application/listMarksUseCase";
import { fetchUserOwners } from "./sevices/usersOwners";
import { AddOwnerMarksUseCase } from "../../application/addOwnerMarksUseCase";


export class ListMarkController{ 
    constructor(
        readonly listMarkUseCase: ListMarkUseCase,
        readonly addOwnerMarksUseCase: AddOwnerMarksUseCase
        ){}

    async  run(req: Request, res: Response) {
        try {

            let {
                userLatitude,
                userLongitude,      
            } = req.query

           
            let createMark = await this.listMarkUseCase.run(Number(userLatitude), Number(userLongitude))

            const recibo = await fetchUserOwners(createMark)

            let markAddOwner = await this.addOwnerMarksUseCase.run(createMark,recibo.data.getUser)



            return res.status(200).send({
                status: "ok",
                message: markAddOwner
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


"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOwnerController = void 0;
class UpdateOwnerController {
    constructor(updateOwnerUseCase) {
        this.updateOwnerUseCase = updateOwnerUseCase;
    }
    generateS3Key(filename) {
        const timestamp = new Date().toISOString().replace(/[-:]/g, '');
        return `images/${timestamp}_${filename}`;
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { uuid, name, surname, second_surname, email, phone_number } = req.body;
                console.log("aaa1");
                let img_url;
                console.log(img_url);
                if (name === undefined && email === undefined && surname === undefined && second_surname === undefined && phone_number === undefined && img_url === undefined) {
                    return res.status(200).send({
                        status: "success",
                        data: {
                            update_user: "no hay cambios"
                        }
                    });
                }
                let updateOwner = yield this.updateOwnerUseCase.update(uuid, name, surname, second_surname, email, phone_number, img_url);
                if (updateOwner) {
                    return res.status(200).send({
                        status: "succes",
                        data: {
                            update_owner: updateOwner,
                            message: "Update correct owner"
                        }
                    });
                }
                else {
                    return res.status(404).send({
                        status: "error",
                        message: "Owner not found "
                    });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.message.startsWith('[')) {
                        return res.status(400).send({
                            status: "error",
                            message: "Validation failed",
                            errors: JSON.parse(error.message)
                        });
                    }
                }
                return res.status(500).send({
                    status: "error",
                    message: "An error occurred while update the user."
                });
            }
        });
    }
}
exports.UpdateOwnerController = UpdateOwnerController;
//# sourceMappingURL=updateOwnerController.js.map
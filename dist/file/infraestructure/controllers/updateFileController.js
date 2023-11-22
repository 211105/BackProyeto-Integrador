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
exports.UpdateFileController = void 0;
class UpdateFileController {
    constructor(updateFileUseCase) {
        this.updateFileUseCase = updateFileUseCase;
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { uuid, title } = req.body;
                const updateFileName = yield this.updateFileUseCase.update(uuid, title);
                if (updateFileName) {
                    return res.status(200).send({
                        status: "succes",
                        data: {
                            update_file: updateFileName
                        }
                    });
                }
                else {
                    return res.status(404).send({
                        status: "error",
                        message: "File not found "
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
                    message: "An error occurred while update the File."
                });
            }
        });
    }
}
exports.UpdateFileController = UpdateFileController;
//# sourceMappingURL=updateFileController.js.map
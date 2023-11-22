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
exports.DeleteFileController = void 0;
class DeleteFileController {
    constructor(deleteFileUseCase) {
        this.deleteFileUseCase = deleteFileUseCase;
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { uuid } = req.params;
                const deleteFile = yield this.deleteFileUseCase.delete(uuid);
                if (deleteFile) {
                    return res.status(200).send({
                        status: "succes",
                        data: {
                            delete_file: deleteFile
                        }
                    });
                }
                else {
                    return res.status(404).send({
                        status: "error",
                        message: "User not found "
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
exports.DeleteFileController = DeleteFileController;
//# sourceMappingURL=deleteFileController.js.map
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserByIdController = void 0;
const saveImages_1 = __importDefault(require("../../../helpers/saveImages"));
class UpdateUserByIdController {
    constructor(updateUserByIdUseCase) {
        this.updateUserByIdUseCase = updateUserByIdUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { uuid, name, email, phone_number, } = req.body;
                let img_url;
                if (!req.files || !req.files.img_file) {
                    img_url = undefined;
                }
                else {
                    const imgFile = req.files.img_file;
                    img_url = yield (0, saveImages_1.default)(imgFile);
                }
                if (name === undefined && email === undefined && phone_number === undefined && img_url === undefined) {
                    return res.status(200).send({
                        status: "succes",
                        data: {
                            update_user: "no hay cambios"
                        }
                    });
                }
                let UpdateUserById = yield this.updateUserByIdUseCase.run(uuid, name, email, phone_number, img_url);
                if (UpdateUserById) {
                    return res.status(200).send({
                        status: "succes",
                        data: {
                            update_user: UpdateUserById
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
exports.UpdateUserByIdController = UpdateUserByIdController;
//# sourceMappingURL=updateUseByIdController.js.map
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
exports.RegisterOwnerController = void 0;
const owner_1 = require("../../domain/owner");
const saveImages_1 = __importDefault(require("../../../helpers/saveImages"));
class RegisterOwnerController {
    constructor(registerOwnerUseCase) {
        this.registerOwnerUseCase = registerOwnerUseCase;
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, surname, second_surname, email, password, phone_number } = req.body;
                if (!req.files || !req.files.img_url) {
                    return res.status(400).send({
                        status: 'error',
                        message: 'No image file uploaded (img_url).',
                    });
                }
                console.log("Before uploading to Firebase...");
                const fileVehicle = req.files.img_url;
                const url_img = yield (0, saveImages_1.default)(fileVehicle);
                console.log("After uploading to Firebase. URL:", url_img);
                let registerOwner = yield this.registerOwnerUseCase.post(name, surname, second_surname, email, password, phone_number, url_img, "Owner", false);
                if (registerOwner instanceof owner_1.Owner) {
                    return res.status(201).send({
                        status: 'success',
                        data: {
                            id: registerOwner.uuid,
                            name: registerOwner.name,
                            surname: registerOwner.surname,
                            second_surname: registerOwner.second_surname,
                            email: registerOwner.email,
                            password: registerOwner.password,
                            phone: registerOwner.phone_number,
                            img_url: registerOwner.img_url,
                            type_user: registerOwner.type_user,
                            status: registerOwner.status,
                        },
                    });
                }
                else {
                    return res.status(500).send({
                        status: 'error',
                        message: 'An unexpected error occurred while registering the Owner.',
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
                    message: "An error occurred while adding the Driver."
                });
            }
        });
    }
}
exports.RegisterOwnerController = RegisterOwnerController;
//# sourceMappingURL=registerOwnerController.js.map
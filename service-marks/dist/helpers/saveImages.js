"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.verfyImage = exports.evaluateImage = exports.uploadToFirebase = void 0;
const admin = __importStar(require("firebase-admin"));
const vision_1 = __importDefault(require("@google-cloud/vision"));
const deleteImage_1 = __importDefault(require("./deleteImage"));
const client = new vision_1.default.ImageAnnotatorClient({
    credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL || 'default_project_id',
        private_key: process.env.GOOGLE_PRIVATE_KEY ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n') : 'default_private_key'
    }
});
function uploadToFirebase(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const bucket = admin.storage().bucket();
        return new Promise((resolve, reject) => {
            const uniqueName = `${Date.now()}-${file.name}`;
            const blob = bucket.file(uniqueName);
            const blobStream = blob.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                },
            });
            blobStream.on('error', (error) => {
                reject("Error uploading to Firebase Storage: " + error);
            });
            blobStream.on('finish', () => __awaiter(this, void 0, void 0, function* () {
                const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media`;
                try {
                    resolve(publicUrl);
                }
                catch (error) {
                    yield (0, deleteImage_1.default)(publicUrl);
                    resolve(null);
                }
            }));
            blobStream.end(file.data);
        });
    });
}
exports.uploadToFirebase = uploadToFirebase;
function evaluateImage(imageData) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield client.safeSearchDetection({ image: { content: imageData } });
        console.log(result);
        const detections = result.safeSearchAnnotation;
        console.log(detections === null || detections === void 0 ? void 0 : detections.adult);
        console.log(detections === null || detections === void 0 ? void 0 : detections.violence);
        if (detections) {
            const isAdultContent = detections.adult === 'LIKELY' || detections.adult === 'VERY_LIKELY';
            const isViolentContent = detections.violence === 'LIKELY' || detections.violence === 'VERY_LIKELY';
            if (isAdultContent || isViolentContent) {
                throw new Error('La imagen contiene contenido inapropiado.');
            }
        }
    });
}
exports.evaluateImage = evaluateImage;
function verfyImage(file) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!file) {
            throw new Error('No se ha proporcionado ningún archivo de imagen.');
        }
        yield evaluateImage(file.data);
        const urlImage = yield uploadToFirebase(file);
        if (urlImage === null) {
            throw new Error('Error al subir la imagen a Firebase.');
        }
        return urlImage;
    });
}
exports.verfyImage = verfyImage;
//# sourceMappingURL=saveImages.js.map
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
const admin = __importStar(require("firebase-admin"));
const vision_1 = __importDefault(require("@google-cloud/vision"));
const path_1 = __importDefault(require("path"));
const deleteImage_1 = __importDefault(require("./deleteImage"));
const keyFilename = path_1.default.join(__dirname, 'vision.json');
const googleClientEmail = process.env.GOOGLE_CLIENT_EMAIL;
const googlePrivateKey = process.env.GOOGLE_PRIVATE_KEY;
const client = new vision_1.default.ImageAnnotatorClient({
    credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL || 'default_project_id',
        private_key: process.env.GOOGLE_PRIVATE_KEY || ' default_client_email'
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
                    yield evaluateImage(publicUrl);
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
function evaluateImage(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield client.safeSearchDetection(url);
        console.log(result);
        const detections = result.safeSearchAnnotation;
        if (detections) {
            const isAdultContent = detections.adult !== 'VERY_UNLIKELY';
            const isViolentContent = detections.violence !== 'VERY_UNLIKELY';
            if (isAdultContent || isViolentContent) {
                throw new Error('La imagen contiene contenido inapropiado.');
            }
        }
        else {
            throw new Error('No se pudo obtener la evaluación de la imagen.');
        }
    });
}
exports.default = uploadToFirebase;
//# sourceMappingURL=saveImages.js.map
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFields = exports.detectText = void 0;
const vision = __importStar(require("@google-cloud/vision"));
const credentialsPath = 'src/helpers/sacred-bridge-404705-29cf2d63268d.json';
const client = new vision.ImageAnnotatorClient({ keyFilename: credentialsPath });
function detectText(imageData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [result] = yield client.textDetection({
                image: { content: imageData },
            });
            const detections = (result === null || result === void 0 ? void 0 : result.textAnnotations) || [];
            if (detections.length > 0) {
                const extractedText = detections.map((text) => text.description || '');
                return extractedText;
            }
            else {
                return [];
            }
        }
        catch (error) {
            console.error('Error:', error);
            throw error;
        }
    });
}
exports.detectText = detectText;
function validateFields(extractedText, fields) {
    console.log('Texto extraído:', extractedText);
    for (const fieldName in fields) {
        const expectedValue = fields[fieldName].toUpperCase();
        console.log(`Campo a buscar: '${expectedValue}'`);
        const regex = new RegExp(`\\b${expectedValue}\\b`, 'i');
        const isFieldValid = extractedText.some(line => regex.test(line));
        if (!isFieldValid) {
            console.log(`Campo '${fieldName}' no coincide.`);
            return false;
        }
    }
    return true;
}
exports.validateFields = validateFields;
//# sourceMappingURL=validationIdentity.js.map
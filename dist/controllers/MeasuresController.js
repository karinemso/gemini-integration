var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GeminiService } from '../services/GeminiService.js';
import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();
export default class MeasuresController {
    uploadService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const gemini = new GeminiService();
            try {
                const { image } = req.body;
                if (!image) {
                    return res.status(400).send('No image data provided');
                }
                const fileInfo = yield gemini.fileManagerUpload(image);
                const response = yield gemini.processImage(fileInfo);
                const uploadedMeasure = yield db.uploadedMeasures.create({
                    data: {
                        type: req.body.measure_type, // Exemplo de conversão para número, ajuste conforme necessário
                        value: response, // Ajuste para o valor correto retornado
                    },
                });
                res.send(response + " com controller");
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        });
    }
    confirmMeasure(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return "Confirm";
        });
    }
    listMeasures(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { customerCode } = req.params;
            return `Listing the measures of customer ${customerCode}`;
        });
    }
}
//# sourceMappingURL=MeasuresController.js.map
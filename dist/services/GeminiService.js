var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import fs from 'fs';
import path from 'path';
import os from 'os';
// Classe GeminiService
class GeminiService {
    constructor() {
        var _a;
        const key = (_a = process.env.GEMINI_API_KEY) !== null && _a !== void 0 ? _a : "";
        console.log(key);
        this.genAI = new GoogleGenerativeAI(key);
        this.fileManager = new GoogleAIFileManager(key);
    }
    // Método para acessar o modelo AI
    getGenAiModel() {
        return this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }
    // Método para converter base64 em uma parte generativa
    processImage(uploadResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getGenAiModel().generateContent([
                {
                    fileData: {
                        mimeType: uploadResponse.mimeType,
                        fileUri: uploadResponse.uri
                    }
                },
                { text: "Return just all the numbers on the counter without the left zeros. Just say the value and nothing more." },
            ]);
            console.log("upload", uploadResponse);
            console.log("res", result.response.text());
            return result.response.text();
            // return {
            //     inlineData: {
            //         data: base64Data,
            //         mimeType
            //     },
            // };
        });
    }
    createTemporaryFileFromBase64(base64Data, mimeType) {
        // Criar um Buffer a partir da string Base64
        const buffer = Buffer.from(base64Data, 'base64');
        // Determinar a extensão do arquivo a partir do mimeType
        const extension = mimeType.split('/')[1]; // exemplo: 'image/jpeg' => 'jpeg'
        // Criar um caminho para o arquivo temporário
        const tempDir = os.tmpdir(); // Diretório temporário padrão do sistema
        const tempFileName = `tempfile-${Date.now()}.${extension}`;
        const tempFilePath = path.join(tempDir, tempFileName);
        // Escrever o Buffer no arquivo temporário
        fs.writeFileSync(tempFilePath, buffer);
        // Retornar o caminho do arquivo temporário
        return tempFilePath;
    }
    fileManagerUpload(image) {
        return __awaiter(this, void 0, void 0, function* () {
            const tempFileName = this.createTemporaryFileFromBase64(image, "image/jpeg");
            // Upload the file and specify a display name.
            const uploadResponse = yield this.fileManager.uploadFile(tempFileName, {
                mimeType: "image/jpeg",
                displayName: tempFileName,
            });
            fs.unlinkSync(tempFileName);
            return {
                displayName: uploadResponse.file.displayName,
                mimeType: uploadResponse.file.mimeType,
                uri: uploadResponse.file.uri
            };
        });
    }
}
export { GeminiService };
//# sourceMappingURL=GeminiService.js.map
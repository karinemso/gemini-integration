import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

import fs from 'fs';
import path from 'path';
import os from 'os';



// Classe GeminiService
class GeminiService {
    private genAI: GoogleGenerativeAI;
    private fileManager : GoogleAIFileManager;

    constructor() {
        const key: string = process.env.GEMINI_API_KEY ?? "";
        console.log(key)
        this.genAI = new GoogleGenerativeAI(key);

        this.fileManager = new GoogleAIFileManager(key);
    }

    // Método para acessar o modelo AI
    public getGenAiModel() {
        return this.genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    }

    // Método para converter base64 em uma parte generativa
    public async processImage(uploadResponse: IUploadedFileInfo) {

        const result = await this.getGenAiModel().generateContent([
            {
              fileData: {
                mimeType: uploadResponse.mimeType,
                fileUri: uploadResponse.uri
              }
            },
            { text: "Return just all the numbers on the counter without the left zeros. Just say the value and nothing more." },
          ]);
        
          console.log("upload", uploadResponse)
          console.log("res", result.response.text())
        return result.response.text()
        // return {
        //     inlineData: {
        //         data: base64Data,
        //         mimeType
        //     },
        // };
    }

    public createTemporaryFileFromBase64(base64Data: string, mimeType: string): string {
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

    public async fileManagerUpload(image: string){
        const tempFileName = this.createTemporaryFileFromBase64(image, "image/jpeg")
            
        // Upload the file and specify a display name.
        const uploadResponse = await this.fileManager.uploadFile(tempFileName, {
          mimeType: "image/jpeg",
          displayName: tempFileName,
        });
        

        fs.unlinkSync(tempFileName)

        return {
            displayName: uploadResponse.file.displayName,
            mimeType :uploadResponse.file.mimeType,
            uri: uploadResponse.file.uri
        }
      
    }



}

// Interface para o corpo da requisição de upload


interface IUploadedFileInfo {
    displayName: string | undefined;
    mimeType: string;
    uri: string;
   
}

export { GeminiService };

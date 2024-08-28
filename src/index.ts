import 'dotenv/config';
import express, { Request, Response } from 'express';
import http from 'http';
const app = express()

import { GoogleGenerativeAI } from "@google/generative-ai";


const key : string = process.env.GEMINI_API_KEY ?? ""
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(key);
app.use(express.json()); 
// Função para converter arquivos locais em partes do GoogleGenerativeAI

// Função para converter uma string base64 em um formato esperado
function base64ToGenerativePart(base64Data: string, mimeType: string) {
    return {
      inlineData: {
        data: base64Data,
        mimeType
      },
    };
  }
  
  // Endpoint para processar imagem em base64
  app.post('/upload', async (req: Request, res: Response) => {
    try {
      const { image } = req.body;
  
      if (!image) {
        return res.status(400).send('No image data provided');
      }
  
      // Escolhe um modelo do Gemini
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  
      // Cria o prompt e as partes da imagem
      const prompt = "Return the measure on the hidrometer";
      const imageParts = base64ToGenerativePart(image, "image/jpeg"); // Use o mimeType correto se necessário
  
      // Gera o conteúdo
      const generatedContent = await model.generateContent([prompt, imageParts]);
  
      // Envia a resposta
      console.log(generatedContent.response.text() + " uhuuuuuuuuuu")
      res.send(generatedContent.response.text() + " uhuuuuuuuuu");
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });



const server = http.createServer(app)

server.listen(3000,() => {
    console.log("ouvindo")
})


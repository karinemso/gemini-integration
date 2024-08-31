import { FastifyRequest, FastifyReply } from 'fastify'
import { GeminiService } from '../services/GeminiService.js';


interface IUploadRequestBody {
    image: string;
    customer_code: string;
    measure_datetime: string;
    measure_type: string;
}

export default class MeasuresController {
    public async uploadService(req: FastifyRequest<{ Body: IUploadRequestBody }>, res: FastifyReply) {

        const gemini = new GeminiService()
        try {
            const { image } = req.body;
            if (!image) {
                return res.status(400).send('No image data provided');
            }
            const fileInfo = await gemini.fileManagerUpload(image)
            const response = await gemini.processImage(fileInfo)


            // salvar no banco
            res.send(response + " com controller");
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }

    async confirmMeasure(req: FastifyRequest, res: FastifyReply) {

        return "Confirm"
    }

    async listMeasures(req: FastifyRequest, res: FastifyReply) {
        const { customerCode } = req.params as { customerCode: string };

        return `Listing the measures of customer ${customerCode}`
    }
}
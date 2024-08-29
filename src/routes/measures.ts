import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { GeminiService, IUploadRequestBody } from '../services/GeminiService.js';


export default async function measuresRoutes(fastify: FastifyInstance) {

    fastify.get('/:customerCode/list', (req: FastifyRequest) => {

        const { customerCode } = req.params as { customerCode: string };

        return `Listing the measures of customer ${customerCode}`
    })


    fastify.post('/upload', async (req: FastifyRequest<{ Body: IUploadRequestBody }>, res : FastifyReply) => {
        const gemini = new GeminiService()

    

        try {
            
            
            const { image }  = req.body;
      

            if (!image) {
                return res.status(400).send('No image data provided');
            }

            const fileInfo = await gemini.fileManagerUpload(image)
            const response = await gemini.processImage(fileInfo)

            // salvar no banco
    
            res.send(response);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }


 
    
    })


    fastify.patch('/confirm', () => {

        return "Confirm"
    })

}
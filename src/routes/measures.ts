import { FastifyInstance } from 'fastify'
import MeasuresController from '../controllers/MeasuresController.js';

const Measures = new MeasuresController();
export default async function measuresRoutes(fastify: FastifyInstance) {

    fastify.get('/:customerCode/list', Measures.listMeasures)
    fastify.post('/upload', Measures.uploadService)
    fastify.patch('/confirm', Measures.confirmMeasure)

}
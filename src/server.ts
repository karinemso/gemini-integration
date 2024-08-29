import 'dotenv/config';

import fastify from 'fastify'
import measuresRoutes from './routes/measures.js';

const server = fastify()


server.register(measuresRoutes)
server.get('/testando', (req, res) => {

    return "OLÁ MUNDO"
})


server.listen({ port : 3000 }, () => {
    console.log("tesste")
})
import 'dotenv/config';
import fastify from 'fastify';
import measuresRoutes from './routes/measures.js';
const server = fastify();
server.register(measuresRoutes);
const port = 3000;
try {
    server.listen({ port: port, host: "0.0.0.0" }, () => {
        console.log(`Ouvindo servidor na porta ${port}!`);
    });
}
catch (error) {
    console.log(error);
    console.log("Execução finalizada");
    process.exit();
}
//# sourceMappingURL=server.js.map
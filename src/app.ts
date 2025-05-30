import express from 'express';
import bodyParser from 'body-parser';
import requestRoutes from './routes/request.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use('/requests', requestRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
import express from 'express';
import router from './routes';
import { PrismaClient } from '@prisma/client';
import { swaggerSpec, swaggerUi } from './swagger';

const app = express();
const PORT = 3000;
const prisma = new PrismaClient();

app.use(express.json());

app.get('/health', async (req, res) => {
    try {
        await prisma.$connect();
        res.json({ status: 'OK', db: 'Connected' });
    } catch(err) {
        res.status(500).json({ status: 'Error', db: 'Disconnected' });
    } finally {
        await prisma.$disconnect();
    }
});

app.use('/api', router);

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
    console.log(`API Berjalan di http://localhost:${PORT}`);
});
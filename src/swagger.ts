import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";

const options = {
    definition: {
        openapi: '3.0.0',
        info: { title: 'Base API', version: '1.0.0' },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: [path.join(process.cwd(), 'src', 'routes', '*.ts')],
};

export const swaggerSpec = swaggerJSDoc(options);
export { swaggerUi };
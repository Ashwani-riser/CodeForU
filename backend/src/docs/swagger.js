import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
// console.log("✅ swagger.js loaded");
const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Online Judge API",
            version: "1.0.0",
            description: "REST API documentation for the Online Judge Backend."
        },
        servers: [
            {
                url: "http://localhost:8000/api/v1",
                description: "Local Development"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },

   apis: [
    "src/docs/*.js"
]
};

const swaggerSpec = swaggerJsdoc(options);

// console.log(swaggerSpec.paths); // Temporary debug

export default swaggerSpec;
const swaggerJsDoc = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "gamieMarket API",
            version: "1.0.0",
            description: "gamieMarket - best e-commerce site for gaming",
            contact: {
                name: "Tim Vaulin"
            }
        },
        servers: [
            {
                url: "http://localhost:8080"
            }
        ],
    },
    apis: ["./src/documentation/*.documentation.js"]
}

const specs = swaggerJsDoc(options)

module.exports = specs
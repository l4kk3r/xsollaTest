const swaggerJsDoc = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "iceItems API",
            version: "1.0.0",
            description: "iceItems - best marketplace for gaming",
            contact: {
                name: "Tim Vaulin"
            }
        },
        servers: [
            {
                url: "https://iceitems.herokuapp.com/"
            },
            {
                url: "http://localhost:8080"
            }
        ],
    },
    apis: ["./src/documentation/*.documentation.js"]
}

const specs = swaggerJsDoc(options)

module.exports = specs
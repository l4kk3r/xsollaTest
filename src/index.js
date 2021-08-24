const express = require('express')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
require('module-alias/register')

const PORT = process.env.PORT || 8080

const app = express()

/* APP SETTINGS */
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/* REDIS */
require('@src/connections/Redis')

/* DATABASE */
require('@src/connections/MongoDB')

/* RABBITMQ */
require('@src/connections/RabbitMQ')

/* SESSION */
const expressSession = require('@src/connections/ExpressSession')
app.use(expressSession)

/* SWAGGER */
const swaggerSpecs = require('@src/connections/Swagger')
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))

/* ROUTES */
app.use('/auth', require('@src/routes/auth.routes'))
app.use('/product', require('@src/routes/product.routes'))

/* GRAPHQL */
const graphqlSetup = require('@src/connections/GraphQL')
app.use("/graphql", graphqlSetup)

/* APP STARTUP */
process.once('SIGUSR2', function () {
    gracefulShutdown(function () {
      process.kill(process.pid, 'SIGUSR2');
    });
});
app.listen(PORT, async () => {
    console.log(`App is running on PORT ${PORT}`)
})
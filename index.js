const express = require('express')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')

const PORT = process.env.PORT || 8080

const app = express()

/* APP SETTINGS */
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/* SWAGGER */
const swaggerSpecs = require('./src/documentation/index')
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))

/* ROUTES */
app.use('/product', require('./src/routes/product.routes'))

/* APP STARTUP */
app.listen(PORT, async () => {
    console.log(`App is running on PORT ${PORT}`)
})
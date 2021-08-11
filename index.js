const express = require('express')
const expressGraphql = require('express-graphql').graphqlHTTP
const { GraphQLID, GraphQLString, GraphQLObjectType, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull } = require('graphql')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')

const PORT = process.env.PORT || 8080

const app = express()

/* APP SETTINGS */
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/* DATABASE */
require('./connections/MongoDB')

/* SWAGGER */
const swaggerSpecs = require('./src/documentation/index')
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))

/* ROUTES */
app.use('/product', require('./src/routes/product.routes'))

/* GRAPHQL */
const graphqlSetup = require('./connections/GraphQL')
app.use("/graphql", graphqlSetup)

/* APP STARTUP */
app.listen(PORT, async () => {
    console.log(`App is running on PORT ${PORT}`)
})
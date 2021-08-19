const expressGraphql = require('express-graphql').graphqlHTTP
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull } = require('graphql')
const isNumeric = require('@src/helpers/isNumeric')

const mongoose = require('mongoose')
const Product = mongoose.model('Product')

const productType = require('@src/models/graphql/Product')

const queryRootType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        products: {
            type: GraphQLList(productType),
            resolve: async (parent, args) => {
                const products = await Product.find()
                return products
            }
        },
        product: {
            type: productType,
            args: {
                _id: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: async (parent, args) => {
                const product = await Product.findById(args._id)
                return product
            }
        }
    }
})

const mutationRootType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProduct: {
            type: productType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                type: { type: GraphQLNonNull(GraphQLString) },
                sku: { type: GraphQLNonNull(GraphQLString) },
                price: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: async (parent, args) => {
                const { name, sku, type, price } = args

                const productWithSameSKU = await Product.findOne({ sku })

                if (productWithSameSKU) throw new Error('Продукт с данным SKU уже существует')

                await Product.create({ name, sku, type, price })
            }
        },
        deleteProduct: {
            type: productType,
            args: {
                _id: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: async (parent, args) => {
                const { _id } = args

                if (!isNumeric(_id)) throw new Error('Продукт с таким id не существует ;(')

                const result = await Product.findByIdAndDelete(_id)

                if (!result) throw new Error('Продукт с таким id не существует ;(')
            }
        },
        editProduct: {
            type: productType,
            args: {
                _id: { type: GraphQLNonNull(GraphQLInt) },
                name: { type: GraphQLString },
                type: { type: GraphQLString },
                sku: { type: GraphQLString },
                price: { type: GraphQLInt },
            },
            resolve: async (parent, args) => {
                const { _id, name, sku, type, price } = args
                let newFields = { name, sku, type, price }
                newFields = JSON.parse(JSON.stringify(newFields))

                console.log(newFields)
        
                await Product.updateOne({ _id }, { $set: newFields })
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: queryRootType,
    mutation: mutationRootType
})

module.exports = expressGraphql({
    schema, 
    graphiql: true
})
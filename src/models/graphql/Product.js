const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql')

const productType = new GraphQLObjectType({
  name: 'Product',
  fields: {
      _id: { type: GraphQLInt },
      sku: { type: GraphQLString },
      name: { type: GraphQLString },
      type: { type: GraphQLString },
      price: { type: GraphQLString }
  }
})

module.exports = productType
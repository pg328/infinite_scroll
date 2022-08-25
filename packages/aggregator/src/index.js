const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const fetch = require('node-fetch')
const productData = require("../../api/products.json")

const typeDefs = gql`

  type Product {
  sku: String
  name: String
  description: String
  category:String
  color: String
  price: Float
  inStock: Boolean
  }

  type Query {
    message: String!
    products(offset: Int,  limit: Int): [Product]
    productCount: Int
  }
`

const resolvers = {
  Query: {
    message: async () => {
      const response = await fetch('http://localhost:3000/api')
      const json = await response.json()
      return json.data.message
    },
    products: async (_,{ offset, limit=5 }) => {

      if (offset || offset===0) {
        return productData.slice(offset, offset+limit)
      }
      return undefined
    },
    productCount: async () => {
      return productData.length
    }
  },
}

const middleware = new ApolloServer({ typeDefs, resolvers }).getMiddleware()

const server = express()
  .use(middleware)
  .listen(process.env.PORT, () => {
    console.log('listening', server.address())
  })

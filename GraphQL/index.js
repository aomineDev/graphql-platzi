'use strict'
require('dotenv').config()
const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const cors = require('cors')
const gqlMiddleware = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolves')

const app = express()
const port = process.env.port || 3200
const isDev = process.env.NODE_ENV !== 'production'

// Definimos el Schema
const typeDefs = readFileSync(
  join(__dirname, 'lib', 'schema.graphql'),
  'utf-8'
)
const schema = makeExecutableSchema({ typeDefs, resolvers })

// Ejecutar el query hello
// graphql(schema, '{ saludo }', resolvers)
// .then(res => {
//     console.log(res)
//   }
// )

app.use(cors())

app.use('/api', gqlMiddleware({
  schema,
  rootValue: resolvers,
  graphiql: isDev
}))

app.listen(port, () => {
  console.log(`server is listening at http:localhost:${port}/api`)
})

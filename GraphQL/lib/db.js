'use strict'

const { MongoClient } = require('mongodb')
const {
  DB_HOST,
  DB_PORT,
  DB_NAME
} = process.env

const mongoUrl = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
let conection 

async function conectDB () {
  if(conection) return conection

  let client
  try {
    client = await MongoClient.connect(mongoUrl, {
      userNewUrlParser: true
    })
    conection = client.db(DB_NAME)
  }catch(error) {
     console.error('Could not conect to db', mongoUrl, error)
     process.exit(1)
  }
  return conection
}

module.exports = conectDB
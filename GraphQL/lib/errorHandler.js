'use strict'

function errorHandler(error) {
  console.error(error)
  throw new Error('Fallo en la opeación del servidor')
}

module.exports = errorHandler
const productData =  require("../products.json");

const express = require('express')

const server = express()
  .get('/api', (req, res) => {
    res.json({ data: { message: 'Dunelm' } })
  })
  .get('/api/products', (req, res) => {
    res.json({ data: { productData } })
  })
  .listen(process.env.PORT, () => {
    console.log('api listening', server.address())
  })

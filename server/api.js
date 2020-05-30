// npm i express
const express = require('express')
const app = express()

app.get('/api/courses', (req, res) => {
  setTimeout(() => {
    res.json([{ name: 'web全站', price: 9999 }, { name: 'web高', price: '9999'}])
  }, 1000)
})

app.listen(3000)
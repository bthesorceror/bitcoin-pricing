const fs = require('fs')
const path = require('path')
const express = require('express')
const PrisonMiddleware = require('./middleware/prison')
const ConvertorMiddleware = require('./middleware/convertor')

let port = process.env.PORT || 4000
let app = express()

app.use(PrisonMiddleware(5000))
app.use(ConvertorMiddleware('btc', ['ltc', 'eth', 'dsh']))

app.use(
  '/public',
  express.static(path.join(__dirname, 'public'))
)

app.get('/', (req, res) => {
  let fullPath = path.join(__dirname, 'index.html')

  res.writeHead(200, {
    'Content-Type': 'text/html'
  })

  fs.createReadStream(fullPath).pipe(res)
})

app.get('/conversions', (req, res) => {
  req.conversions().then((results) => {
    res.json(results)
  }).catch((err) => {
    let message = 'Could not complete request'
    console.dir(err)
    res.json({ error: message, m: err })
  })
})

app.listen(port, () => {
  console.info(`Now listening on port ${port}`)
})

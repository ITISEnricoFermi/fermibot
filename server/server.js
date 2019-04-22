const api = require('./utils/api')
const bodyParser = require('body-parser')
const express = require('express')

const { PORT, API, CHANNEL } = process.env

// Middleware
const error = require('./middleware/error')
const asyncMiddleware = require('./middleware/async')
const { bearer } = require('./middleware/authenticate')

const app = express()

const telegram = api(API)

app.use(bodyParser.json())

app.post('/', bearer, asyncMiddleware(async (req, res) => {
  const { id } = req.body

  const requests = [telegram.getPost(id), telegram.getDocumentByPost(id)]
  const [post, document] = await Promise.all(requests)

  if (!document) {
    await telegram.sendPost(CHANNEL, post)
  } else {
    await telegram.sendDocument(CHANNEL, document, post)
  }

  return res.status(200).send()
}))

app.use(error())

app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}.`)
})

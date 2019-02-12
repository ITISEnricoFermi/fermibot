require('./env/env')
const Api = require('./utils/api')
const { parse } = require('node-html-parser')
const parseUrl = require('parse-url')
const bodyParser = require('body-parser')

const Telegraf = require('telegraf')
const express = require('express')

const { PORT, TOKEN, API, CHANNEL } = process.env

// Middleware
const error = require('./middleware/error')
const asyncMiddleware = require('./middleware/async')

const app = express()
const bot = new Telegraf(TOKEN)
const api = new Api(API)

app.use(bodyParser.json())

app.post('/', asyncMiddleware(async (req, res) => {
  const { id } = req.body

  const post = await api.getPost(id)

  if (!post.content.rendered) {
    res.status(200).send()
    return api.sendPost(CHANNEL, post)
  }

  const html = parse(post.content.rendered)
  const iframe = html.querySelector('iframe')

  if (!iframe) {
    res.status(200).send()
    return api.sendPost(CHANNEL, post)
  }

  const { src } = iframe.attributes
  const { query } = parseUrl(src)
  res.status(200).send()
  return api.sendDocument(CHANNEL, query.url, api.formatMessagePost(post))
}))

bot.launch()

app.use(error())

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`)
})

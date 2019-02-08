require('./env/env')
const Api = require('./utils/api')
const { parse } = require('node-html-parser')
const parseUrl = require('parse-url')
const bodyParser = require('body-parser')

const Telegraf = require('telegraf')
const express = require('express')

const { PORT, TOKEN, API, CHANNEL } = process.env
const app = express()
const bot = new Telegraf(TOKEN)
const api = new Api(API)

app.use(bodyParser.json())

app.post('/', (req, res) => {
  const { id } = req.body

  api.getPost(id)
    .then(post => {
      if (!post.content.rendered) {
        return api.sendPost(CHANNEL, post)
      }
      const html = parse(post.content.rendered)
      const { src } = html.querySelector('iframe').attributes
      const { query } = parseUrl(src)
      res.status(200).send()
      return api.sendDocument(CHANNEL, query.url, api.formatMessagePost(post))
    })
    .catch(e => {
      console.log(e.message)
    })
})

bot.launch()

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`)
})

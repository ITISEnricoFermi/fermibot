require('./env/env')
const Api = require('./utils/api')
const { parse } = require('node-html-parser')
const parseUrl = require('parse-url')

const Telegraf = require('telegraf')
const express = require('express')

const { PORT, TOKEN, API, CHANNEL } = process.env
const app = express()
const bot = new Telegraf(TOKEN)
const api = new Api(API)

app.get('/', (req, res) => {
  console.log(req.body)
  res.status(200).send()
})

app.post('/', (req, res) => {
  console.log(req.body)
  res.status(200).send()
})

// api.getPosts(1, 2)
//   .then(posts => {
//     const post = posts[1]
//     const { id } = post
//     return api.getPost(id)
//   })
//   .then(post => {
//     if (!post.content.rendered) {
//       return api.sendPost(CHANNEL, post)
//     }
//     const html = parse(post.content.rendered)
//     const { src } = html.querySelector('iframe').attributes
//     const { query } = parseUrl(src)
//     return api.sendDocument(CHANNEL, query.url, api.formatMessagePost(post))
//   })
//   .catch(e => {
//     console.log(e)
//   })

// bot.startWebhook('/', null, PORT)
// bot.handleUpdate(rawUpdate, [webhookResponse])

bot.launch()

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`)
})

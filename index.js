require('./env/env')
const api = require('./utils/api')

const Telegraf = require('telegraf')
const Telegram = require('telegraf/telegram')
const express = require('express')
const decode = require('ent/decode')

const { PORT, TOKEN, CHANNEL } = process.env
const app = express()
const bot = new Telegraf(TOKEN)
const telegram = new Telegram(TOKEN)

app.get('/', (req, res) => {
  api.get('/posts/', {
    params: {
      page: 1,
      per_page: 1
    }
  })
    .then(posts => {
      const { title, link } = posts.data[0]
      const decoded = decode(title.rendered)
      const message = decoded + ': ' + link
      res.status(200).send()
      return telegram.sendMessage(CHANNEL, message)
    })
    .catch(e => {
      console.log(e)
    })
})

bot.launch()
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`)
})

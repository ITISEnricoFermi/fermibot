const Telegraf = require('telegraf')
const Telegram = require('telegraf/telegram')
const fs = require('fs')
const axios = require('axios')
const decode = require('ent/decode')

const {token} = JSON.parse(fs.readFileSync('token.env.json', 'utf-8'))

const bot = new Telegraf(token)
const telegram = new Telegram(token)

const channel = '@itisfermi'

const api = axios.create({
  baseURL: 'http://profbenigno.it/wp-json/wp/v2/'
})

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

    return telegram.sendMessage(channel, message)
  })
  .catch(e => {
    console.log(e)
  })

bot.command('last', ctx => {
  api.get('/posts/', {
    params: {
      page: 1,
      per_page: 1
    }
  })
    .then(posts => {
      const { title, link } = posts.data[0]
      const decoded = decode(title.rendered)
      console.log(decoded)
      ctx.reply(decoded + ': ' + link)
    })
    .catch(e => {
      console.log(e)
    })
})

// bot.command('modern', ({ reply }) => reply('Yo'))

// bot.help((ctx) => ctx.reply('Send me a sticker'))
// bot.on('sticker', (ctx) => ctx.reply('👍'))
// bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()

require('./env/env')
require('./server/server.js')

const Telegraf = require('telegraf')

const { TOKEN } = process.env

const bot = new Telegraf(TOKEN)

bot.launch()

const axios = require('axios')
const decode = require('ent/decode')
const Telegram = require('telegraf/telegram')

const { TOKEN } = process.env
const telegram = new Telegram(TOKEN)

module.exports = class Api {
  constructor (api) {
    this.instance = axios.create({
      baseURL: api
    })
  }

  async sendMessage (channel, message) {
    return telegram.sendMessage(channel, message, {
      parse_mode: 'HTML'
    })
  }

  sendDocument (channel, document, caption) {
    return telegram.sendDocument(channel, document, {
      caption,
      parse_mode: 'HTML',
      thumb: 'https://vets-now.s3.amazonaws.com/uploads/2017/01/Dog-laboured-breathing-Vets-Now-90x90.jpg'
    })
  }

  async sendPost (channel, post) {
    return this.sendMessage(channel, this.formatMessagePost(post))
  }

  formatMessagePost (post) {
    const { title, link } = post
    const decoded = decode(title.rendered)
    return `<a href="${link}">${decoded}</a>`
  }

  async getPosts (pages, step) {
    const { data } = await this.instance.get('/posts/', {
      params: {
        page: pages,
        per_page: step
      }
    })
    return data
  }

  async getPost (id) {
    const { data } = await this.instance.get(`/posts/${id}`)
    return data
  }
}

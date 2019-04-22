const axios = require('axios')
const decode = require('ent/decode')
const Telegram = require('telegraf/telegram')
const url = require('url')

const { TOKEN } = process.env
const telegram = new Telegram(TOKEN)

class Api {
  constructor (api) {
    this.instance = axios.create({
      baseURL: url.resolve(api, '/wp-json/wp/v2/')
    })
  }

  /**
   * Invia un messaggio contentente del codice HTML.
   * @param  {String}  channel Il canale a cui inviare il messaggio.
   * @param  {String}  message Il messaggio da inviare.
   * @return {Promise}         [description]
   */
  async sendMessage (channel, message) {
    return telegram.sendMessage(channel, message, {
      parse_mode: 'HTML'
    })
  }

  /**
 * Invia un messaggio contentente un documento.
 * @param  {String} channel  Il canale a cui inviare il messaggio.
 * @param  {String} document Il link del documento da inviare.
 * @param  {String} post     Il post da formattare e da inviare.
 * @return {Promise}         Il documento è stato inviato.
 */
  async sendDocument (channel, document, post) {
    return telegram.sendDocument(channel, document, {
      caption: this.formatMessagePost(post),
      parse_mode: 'HTML'
    })
  }

  /**
 * Invia un messaggio contenente il link ad un post.
 * @param  {String}  channel Il canale a cui inviare il messaggio.
 * @param  {Object}  post    Il post da formattare e da inviare.
 * @return {Promise}         Il post è stato inviato.
 */
  async sendPost (channel, post) {
    return this.sendMessage(channel, this.formatMessagePost(post))
  }

  /**
 * Restituisce il codice HTML che punta al post.
 * @param  {Object} post L'oggetto post.
 * @return {String}      Il tag <a> HTML che punta al post.
 */
  formatMessagePost (post) {
    const { title, link } = post
    const decoded = decode(title.rendered)
    return `<a href="${link}">${decoded}</a>`
  }

  /**
 * Restituisce gli ultimi post.
 * @param  {Array}  pages Il numero di pagina da reperire.
 * @param  {Array}  step  Il numero di post per pagina.
 * @return {Promise}      La lista dei post.
 */
  async getPosts (pages, step) {
    try {
      const { data } = await this.instance.get('/posts/', {
        params: {
          page: pages,
          per_page: step
        }
      })

      return data
    } catch (e) {
      throw new Error('Impossibile reperire i post.')
    }
  }

  /**
 * Restituisce le informazioni su un post.
 * @param  {String}  id L'id del post.
 * @return {Promise}    Il post relativo all'ID fornito.
 */
  async getPost (id) {
    try {
      const { data } = await this.instance.get(`/posts/${id}`)

      return data
    } catch (e) {
      throw new Error('Impossibile reperire il post.')
    }
  }

  /**
 * Restituisce il link al documento contenuto nel post.
 * @param  {String}  id L'ID del post.
 * @return {Promise}    L'URL del documento contenuto nel post.
 */
  async getDocumentByPost (id) {
    try {
      const { data } = await this.instance('/media/', {
        params: {
          parent: id
        }
      })

      if (!data.length) {
        return false
      }

      return data[0].source_url
    } catch (e) {
      throw new Error('Impossibile reperire il documento.')
    }
  }
}

module.exports = (api) => new Api(api)

const passport = require('passport')
const BearerStrategy = require('passport-http-bearer')

const { TOKEN } = process.env

passport.use(new BearerStrategy((token, done) => {
  if (token === TOKEN) {
    return done(null, {})
  } else {
    return done(null, false, { messages: ['Il token non è valido.'] })
  }
}))

module.exports = passport

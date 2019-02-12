const passport = require('../utils/passport')

const bearer = passport.authenticate('bearer', { session: false })

module.exports = {
  bearer
}

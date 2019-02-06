const fs = require('fs')
const path = require('path')
const keys = JSON.parse(fs.readFileSync(path.join(__dirname, 'env.json'), 'utf-8'))

for (let key of Object.keys(keys)) {
  process.env[key] = keys[key]
}

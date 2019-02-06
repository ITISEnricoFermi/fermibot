const axios = require('axios')

const { API } = process.env

const api = axios.create({
  baseURL: API
})

module.exports = api

'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //BASE_API: '"http://47.94.103.27:8199"'
  BASE_API: '"http://127.0.0.1:8199"'
})


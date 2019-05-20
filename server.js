const express = require('express'),
  serveStatic = require('serve-static'),
  history = require('connect-history-api-fallback'),
  port = process.env.PORT || 8080,
  path = require('path')

const app = express()
app.use(history())
app.use(serveStatic(path.join(__dirname, '/dist/spa-mat')))
app.listen(port)

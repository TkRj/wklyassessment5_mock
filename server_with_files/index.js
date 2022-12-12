'use strict'

const Koa = require('koa')
const app = new Koa()
const bodyparser = require('koa-bodyparser')
const router = require('./router.js')
const cors = require('koa-cors')
const { connectDB } = require('./model/topics.js')

app.use(cors())
app.use(bodyparser())
app.use(router.routes())

app.listen(3000, () => {
  console.log('Server live on port 3000')
})

connectDB()
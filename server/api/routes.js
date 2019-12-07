const express = require('express')
const router = express.Router()

require('./routes/user.routes')(router)
require('./routes/transaction.routes')(router)

module.exports = router
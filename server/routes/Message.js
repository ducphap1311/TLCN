const express = require('express')
const { createMessage, getMessages, deleteMessage } = require('../controllers/Message')
const router = express.Router()

router.route('/messages').post(createMessage).get(getMessages)
router.route('/messages/:id').delete(deleteMessage)
module.exports = router
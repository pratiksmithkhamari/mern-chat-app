import express from 'express'
import { authMiddleware } from '../config/middleware.js'
import { allMessage, sendMessage } from '../controllers/messageControllers.js'

export const messageRouter = express.Router()

messageRouter.route('/:chatId').get(authMiddleware,allMessage)

messageRouter.route('/').post(authMiddleware,sendMessage)
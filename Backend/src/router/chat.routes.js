import { Router } from 'express';
import { getChats, getMessages, sendMessage, deleteChat } from '../controllers/chat.controller.js';
import { authUserMiddleware } from '../middlewares/user.middleware.js';

const chatRouter = Router();

chatRouter.post("/message", authUserMiddleware, sendMessage)

chatRouter.get("/", authUserMiddleware, getChats)

chatRouter.get("/:chatId/messages", authUserMiddleware, getMessages)

chatRouter.delete("/:chatId", authUserMiddleware, deleteChat)

export default chatRouter;
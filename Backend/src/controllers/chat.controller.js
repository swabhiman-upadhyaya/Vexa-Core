import { generateResponse, generateChatTitle } from "../services/ai.service.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";

export async function sendMessage(req, res) {

  try {

    const { message, chat: chatId } = req.body;

    let title = null;
    let chat = null;

    if (!chatId) {
      title = await generateChatTitle(message);

      chat = await chatModel.create({
        user: req.user.id,
        title
      });
    }
    console.log(title)

    const currentChatId = chatId || chat._id;

    await messageModel.create({
      chat: currentChatId,
      sender: "user",
      role: "user",
      content: message
    });

    const messages = await messageModel.find({
      chat: currentChatId
    });

    const result = await generateResponse(messages);

    const aiMessage = await messageModel.create({
      chat: currentChatId,
      sender: "ai",     // fixed
      role: "ai",
      content: result
    });

    res.status(201).json({
      success: true,
      title,
      chat: chat || chatId,
      aiMessage
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
}

export async function getChats(req, res) {
  try {
    const chats = await chatModel.find({
      user: req.user.id
    })

    res.status(200).json({
      success: true,
      chats
    });

  }

  catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

export async function getMessages(req, res) {

  try {
    const { chatId } = req.params;

    const chat = await chatModel.findOne({
      _id: chatId,
      user: req.user.id
    })

    if (!chat) {
      return res.status(404).json({
        success: false,
        error: "Chat not found"
      });
    }

    const messages = await messageModel.find({
      chat: chatId
    });

    res.status(200).json({
      success: true,
      messages
    });

  }

  catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

export async function deleteChat(req, res) {

  try {
    const { chatId } = req.params;

    const chat = await chatModel.findOneAndDelete({
      _id: chatId,
      user: req.user.id
    });

    await messageModel.deleteMany({
      chat: chatId
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        error: "Chat not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Chat deleted successfully"
    });
  }

  catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
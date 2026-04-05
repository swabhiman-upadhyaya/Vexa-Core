import userModel from "../models/user.model.js";
import { sendEmail } from "../services/mail.services.js";


export async function registerUserController(req, res) {

  const { username, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ email }, { username }]
  })

  if(isUserAlreadyExist) {
    return res.status(400).json({
      message: "User with this email or username already exist",
      success: false,
      err: "User already exists"
    })
  }

  const user = await userModel.create({
    username, email, password
  })

  await sendEmail(
    email,
    "Welcome to VexaCore",
    `<h1>Welcome to VexaCore, ${username}!</h1><p>Thank you for registering with us. We're excited to have you on board!</p>`,
    `Welcome to VexaCore, ${username}! Thank you for registering with us. We're excited to have you on board!`
  )

  return res.status(201).json({
    message: "User registered successfully",
    success: true,
  })
}
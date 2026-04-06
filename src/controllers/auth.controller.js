import userModel from "../models/user.model.js";
import { sendEmail } from "../services/mail.services.js";
import jwt from "jsonwebtoken";


export async function registerUserController(req, res) {

  try {

    const { username, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({
      $or: [{ email }, { username }]
    })

    if (isUserAlreadyExist) {
      return res.status(400).json({
        message: "User with this email or username already exist",
        success: false,
        err: "User already exists"
      })
    }

    const user = await userModel.create({
      username, email, password
    })

    const emailVerificationToken = jwt.sign({
      email: user.email,
      id: user._id,
    }, process.env.JWT_SECRET)


    await sendEmail(
      email,
      "Welcome to VexaCore",
      `<p>Hello ${username},</p>
    <p>Thank you for registering with us. We're excited to have you on board!</p>
    <P>To get started, please verify your email address by clicking the link below:</P>
    <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
    <p>If you didn't create this account, please ignore this email.</p>
    <p>Best regards,<br/>The VexaCore Team</p>`,
    )

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      }
    })

  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
      err: err.message
    })
  }
}

export async function verifyEmailController(req, res) {

  try {

    const { token } = req.query

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel.findOne({
      email: decoded.email
    })

    if (!user) {
      return res.status(404).json({
        message: "Invalid token",
        success: false,
        err: "User not found"
      })
    }

    user.verified = true

    /* why need to do this user.save(): to save the changes to the database */
    await user.save()

    const html = `
  <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; background-color: #f9f9f9; border-radius: 10px; text-align: center;">
    <h2 style="color: #333;">Email Verified Successfully!</h2>
    <p style="color: #555;">Thank you for verifying your email address. Your account is now active.</p>
    <a href="http://localhost:3000/api/auth/login" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px;">Go to Login</a>
  </div>
  `
    res.send(html)
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
      err: err.message
    })
  }
}

export async function loginUserController(req, res) {

  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ email }, { username }]
  })
  if (!user) {
    return res.status(404).json({
      message: "User not found",
      success: false,
      err: "User not found"
    })
  }

  if (!user.verified) {
    return res.status(401).json({
      message: "Please verify your email address to login",
      success: false,
      err: "Email not verified"
    })
  }

  const isPasswordMatch = await user.comparePassword(password)
  if (!isPasswordMatch) {
    return res.status(401).json({
      message: "Invalid credentials",
      success: false,
      err: "Incorrect password"
    })
  }

  const token = jwt.sign({
    email: user.email,
    id: user._id,
  }, process.env.JWT_SECRET, { expiresIn: "7d" })

  res.cookie("token", token)

  res.status(200).json({
    message: "Login successful",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    }
  })

}

export async function getMeController(req, res) {

  const userId = req.user.id;

  const user = await userModel.findById(userId).select("-password")
  if (!user) {
    return res.status(404).json({
      message: "User not found",
      success: false,
      err: "User not found"
    })
  }

  res.status(200).json({
    message: "User fetched successfully",
    success: true,
    user
  })
}
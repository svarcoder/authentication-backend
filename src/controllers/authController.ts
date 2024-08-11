import { Request, Response } from "express";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import { validatePassword } from "../utils/validation";
import { sendResetPasswordEmail } from "../config/mailer";
import bcrypt from "bcryptjs";

export const signup = async (req: Request, res: Response) => {
  const { username, name, password } = req.body;

  if (!validatePassword(password)) {
    return res.status(404).json({
      status: 404,
      message: "Password does not meet criteria",
    });
  }

  try {
    const user = new User({ username, name, password });
    await user.save();

    return res.status(201).json({
      status: 201,
      message: "User registered successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(404).json({
      status: 404,
      messege: error?.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user)
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
   
    const isMatch = await user.comparePassword(password);

    if (!isMatch)
      return res.status(404).json({
        status: 404,
        message: "Invalid credentials",
      });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "1h",
      }
    );

    return res.status(201).json({
      status: 201,
      message: "User login successfully",
      data: {
        user,
        token,
      },
    });
  } catch (error: any) {
    return res.status(404).json({
      status: 404,
      messege: error?.message,
    });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user)
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });

    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "1h",
      }
    );

    await sendResetPasswordEmail(user?.username, resetToken);

    return res.status(201).json({
      status: 201,
      message: "Password reset email sent",
      data: user,
    });
  } catch (error: any) {
    return res.status(404).json({
      status: 404,
      messege: error?.message,
    });
  }
};

// Update Password API
export const updatePassword = async (req: Request, res: Response) => {
  const { username, newPassword } = req.body;

  if (!validatePassword(newPassword)) {
    return res.status(404).json({
      status: 404,
      message: "Password does not meet criteria",
    });
  }

  try {
    const user = await User.findOne({ username });
    if (!user)
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(newPassword, salt);

    const newuser = await User.findByIdAndUpdate(
      user?._id,
      { password },
      { new: true }
    );

    return res.status(201).json({
      status: 201,
      message: "Password updated successfully",
      data: newuser,
    });
  } catch (error: any) {
    return res.status(404).json({
      status: 404,
      messege: error?.message,
    });
  }
};

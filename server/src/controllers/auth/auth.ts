import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwtUtils";
import { UserModel } from "../../models/Users";
import { RecipientModel } from "../../models/Recipients";
import AppError from "../../utils/appError";
import { Roles } from "../../types/applicationRoles";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id, role } = req.body;
  console.log(role)
  
  if (!Object.values(Roles).includes(role)) {
    return next(new AppError("Invalid Role", StatusCodes.FORBIDDEN));
  }

  const accessToken = generateAccessToken({ id, role });
  const refreshToken = generateRefreshToken({ id, role });

  try {
    if (role === Roles.USER) {
      await UserModel.findByIdAndUpdate(id, { refreshToken });
    } else if (role === Roles.RECIPEINT) {
      await RecipientModel.findByIdAndUpdate(id, { refreshToken });
    }

    res
      .status(StatusCodes.OK)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({ accessToken ,role });
  } catch (err: any) {
    next(
      new AppError(
        "Error saving refresh token",
        StatusCodes.INTERNAL_SERVER_ERROR
      )
    );
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return next(
      new AppError("Refresh token is required", StatusCodes.FORBIDDEN)
    );
  }

  try {
    let user;
    user = await UserModel.findOne({ refreshToken });
    if (!user) {
      user = await RecipientModel.findOne({ refreshToken });
    }

    if (!user) {
      return next(new AppError("Invalid refresh token", StatusCodes.FORBIDDEN));
    }

    const payload = verifyRefreshToken(refreshToken);
    const newAccessToken = generateAccessToken({
      id: payload.id,
      role: payload.role,
    });
    res.status(StatusCodes.OK).json({ accessToken: newAccessToken });
  } catch (err: any) {
    next(new AppError("Invalid refresh token", StatusCodes.FORBIDDEN));
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return next(
      new AppError("Refresh token is required", StatusCodes.BAD_REQUEST)
    );
  }

  try {
    let user;
    user = await UserModel.findOneAndUpdate(
      { refreshToken },
      { $unset: { refreshToken: "" } }
    );
    if (!user) {
      user = await RecipientModel.findOneAndUpdate(
        { refreshToken },
        { $unset: { refreshToken: "" } }
      );
    }

    if (!user) {
      return next(
        new AppError("Invalid refresh token", StatusCodes.BAD_REQUEST)
      );
    }

    res
      .status(StatusCodes.OK)
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .json({ message: "Logged out successfully" });
  } catch (err: any) {
    next(new AppError("Error logging out", StatusCodes.INTERNAL_SERVER_ERROR));
  }
};


export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return next(new AppError("User already exists", StatusCodes.CONFLICT));
    }

    const newUser = await UserModel.create({ email, password, name });

    const accessToken = generateAccessToken({
      id: newUser.id,
      role: Roles.USER,
    });
    const refreshToken = generateRefreshToken({
      id: newUser.id,
      role: Roles.USER,
    });

    await UserModel.findByIdAndUpdate(newUser.id, { refreshToken });

    res
      .status(StatusCodes.CREATED)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({ message: "Registration successful", accessToken });
  } catch (err: any) {
    console.log(err.message)
    next(
      new AppError("Error registering user", StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
};

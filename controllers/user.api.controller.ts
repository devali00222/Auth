import { Request, Response } from "express";
import { hashPasswordWithBcrypt, signJwt } from "../helpers";
import { Role, UpdateUserPassword, UserData } from "../interfaces";
import { UserModel } from "../models";
/**
 * Login User
 *
 */
export const loginUser = async (req: Request, res: Response) => {
  const { username, email, id, role, img }: UserData = req.user!;
  const user = {
    id,
    username,
    email,
    role,
    img,
  };
  try {
    const token = await signJwt(id!);
    return res.status(200).json({
      ok: true,
      msg: "Logging Success",
      user,
      img,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Sorry something was wrong, please contact with Admin",
    });
  }
};
/**
 * register User
 *
 */
export const registerUser = async (req: Request, res: Response) => {
  const { password, img, ...userData }: UserData = req.body;
  const hashPassword = hashPasswordWithBcrypt(password);
  const role = Role.NORMAL_USER_ROLE;
  const user = new UserModel({
    ...userData,
    password: hashPassword,
    img,
    role,
    isValidate: false,
    isDeleted: false,
  });
  try {
    user.save();
    const token = await signJwt(user.id!);
    return res.status(201).json({
      ok: true,
      msg: " Has Been Registerd Successfully ",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        img: user.img,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Sorry something was wrong, please contact with Admin",
    });
  }
};
/**
 * update User
 *
 */
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    password,
    newPassword,
    role,
    img,
    isDeleted,
    ...newUserData
  }: UpdateUserPassword = req.body;
  type Update = Omit<UpdateUserPassword, "role">;
  const newUser: Update = newUserData;
  if (newPassword) {
    newUser.password = hashPasswordWithBcrypt(newPassword as string);
  }
  try {
    const user: UserData | null = await UserModel.findByIdAndUpdate<UserData>(
      id,
      { ...newUser },
      { new: true }
    );
    const token = await signJwt(id);
    return res.status(200).json({
      ok: true,
      msg: " Successfully Updated",
      user: {
        id: user?.id,
        username: user?.username,
        email: user?.email,
        role: user?.role,
        img: user?.img,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Sorry something was wrong, please contact with Admin",
    });
  }
};
/**
 * delete User
 *
 */
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await UserModel.findByIdAndUpdate(id, { isDeleted: true });
    return res.status(200).json({
      ok: true,
      msg: " Successfully Deleted ",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Sorry something was wrong, please contact with admin",
    });
  }
};

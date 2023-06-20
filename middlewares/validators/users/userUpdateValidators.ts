import { check } from "express-validator";
import { validateRequest } from "../../validateRequest";
import { isJWTvalidate } from "../custom/jwtCustomValidator";
import { isUserRole } from "../custom/roleCustomValidator";
import { isOwnerAccount } from "./custom/userCustomValidators";
import { isUserDeleted } from "../custom/deleteUserValidator";
import {
  isCorrectPassword,
  isOwnEmailAddress,
  userExistsInDatabase,
} from "./custom/userCustomValidators";

export const userUpdateValidators = [
  check("x_token", "Something was wrong")
    .trim()
    .not()
    .isEmpty()
    .custom(isJWTvalidate)
    .custom(isUserDeleted),
  check("id", "Something was wrong")
    .trim()
    .not()
    .isEmpty()
    .isMongoId()
    .custom(userExistsInDatabase)
    .custom(isOwnerAccount),
  check("role", "Something was wrong")
    .trim()
    .not()
    .isEmpty()
    .custom(isUserRole),
  check("img", "Something was wrong").trim().not().isEmpty().optional(),
  check("email", "Something was wrong")
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 8, max: 254 })
    .normalizeEmail()
    .isEmail()
    .withMessage("Email is invalid")
    .custom(isOwnEmailAddress),
  check("password", "Password is required")
    .trim()
    .not()
    .isEmpty()
    .custom(isCorrectPassword),
  check("newPassword", "Password is required")
    .trim()
    .optional()
    .isLength({ min: 8 })
    .withMessage("Password must be greater than 8")
    .not()
    .custom(isCorrectPassword)
    .withMessage("Please Enter New Password"),
  validateRequest,
];

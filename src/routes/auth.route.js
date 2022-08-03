import { Router } from "express";
import {
  infoUser,
  login,
  register,
  refreshToken,
  logout,
} from "../controllers/auth.controller.js";
import { validatorExpress } from "../middlewares/validatorExpress.js";
import { body } from "express-validator";
import { requireToken } from "../middlewares/requireToken.js";
const router = Router();

router.post(
  "/login",
  [
    body("email", "Formato de email incorrecto!")
      .trim()
      .isEmail()
      .normalizeEmail(),
    body("password", "Password debe ser de 6 o mas caracteres!")
      .trim()
      .isLength({
        min: 6,
      }),
  ],
  validatorExpress,
  login
);

router.post(
  "/register",
  [
    body("email", "Formato de email incorrecto!")
      .trim()
      .isEmail()
      .normalizeEmail(),
    body("password", "Password debe ser de 6 o mas caracteres!")
      .trim()
      .isLength({
        min: 6,
      }),
    body("password", "Fromato de password incorrecto!").custom(
      (value, { req }) => {
        if (value !== req.body.repassword) {
          throw new Error("no coinciden las contraseñas");
        }
        return value;
      }
    ),
  ],
  validatorExpress,
  register
);

router.get("/protected", requireToken, infoUser);
router.get("/refresh", refreshToken);
router.get("/logout", logout);

export default router;

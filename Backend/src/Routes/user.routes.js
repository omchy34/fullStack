import { Router } from "express";
import {
  LoginUser,
  registerUser,
  fetchUsers,
  deleteUser,
  userData,
} from "../Controller/user.controller.js";
import {  verifyUserJWT } from "../Middlerwere/Auth.middlewere.js";
import { AdminLogin } from "../Controller/Admin.controller.js";

const router = Router();

router.route("/Register").post(registerUser);

router.route("/fetchUsers").post(fetchUsers);
router.route("/deleteUser/:id").delete(deleteUser);

router.route("/Login").post(LoginUser);

// secured Routes
router.route("/userData").post(verifyUserJWT, userData);

// Admin Routes

router.route("/AdminLogin").post(AdminLogin)

export default router;

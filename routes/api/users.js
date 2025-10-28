import express from "express";
import { authMiddleware } from "../../middleware/isSignedIn.js";
import {searchUserById } from "../../database.js"
import { validId } from '../../middleware/validId.js'

const router = express.Router();

router.get("/:userId", validId('userId'), (req, res) => {
  // You can now safely access req.user and req.session
  return searchUserById(userId)
});

export default router;

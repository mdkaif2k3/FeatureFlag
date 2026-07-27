import express from "express";
import { updateOrganizationFeature } from "../controllers/organizationfeatureController.js";

const router = express.Router();

router.patch("/:id", updateOrganizationFeature);

export default router;
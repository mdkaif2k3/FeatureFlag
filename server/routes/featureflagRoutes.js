import express from "express";
import { createFeatureFlag, getFeatureFlags, getFeatureFlagById, updateFeatureFlag, deleteFeatureFlag } from "../controllers/featureflagController.js";

const router = express.Router();

router.get("/", getFeatureFlags);
router.get("/:id", getFeatureFlagById);
router.post("/", createFeatureFlag);
router.put("/:id", updateFeatureFlag);
router.delete("/:id", deleteFeatureFlag);

export default router;
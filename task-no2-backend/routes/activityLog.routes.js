import { Router } from "express";

import {
    getAllActivityLogs,
    getActivityLogById
} from "../controllers/activityLog.controller.js";

const router = Router();

/**
 * ACTIVITY LOG ROUTES
 */

// GET all logs
router.get("/get-all-activity-logs", getAllActivityLogs);

// GET single log
router.get("get-single-activity-log/:id", getActivityLogById);

export default router;
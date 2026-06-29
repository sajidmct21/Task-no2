// src/controllers/activityLog.controller.js

import ActivityLog from "../models/activityLog.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

/**
 * GET ALL ACTIVITY LOGS
 * GET /api/activity-logs
 */
export const getAllActivityLogs = asyncHandler(async (req, res) => {
    const logs = await ActivityLog.find()
        .sort({ createdAt: -1 })
        .limit(200); // safety limit for performance

    return res
        .status(200)
        .json(new ApiResponse(200, logs, "Activity logs fetched"));
});

/**
 * GET ACTIVITY LOG BY ID
 * GET /api/activity-logs/:id
 */
export const getActivityLogById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const log = await ActivityLog.findById(id);

    if (!log) {
        throw new ApiError(404, "Activity log not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, log, "Activity log fetched"));
});
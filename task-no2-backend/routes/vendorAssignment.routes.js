// src/routes/vendorAssignment.routes.js

import { Router } from "express";
import veriftToken from '../middleware/verifyToken.js'

import {
    createAssignment,
    getAllAssignments,
    getAssignmentById,
    getAssignmentsByVendor,
    getVendorsByQuotationRequest
} from "../controllers/vendorAssignment.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

/**
 * MAIN ASSIGNMENT ROUTES
 */

// POST + GET ALL

    router.post("/create-assignment", verifyToken, createAssignment)
    router.get("/get-all-assignment",getAllAssignments);

// GET SINGLE ASSIGNMENT
router.get("/:id", getAssignmentById);

/**
 * RELATION ROUTES
 */

// Vendor → Assignments
router.get("/vendors/:vendorId/assignments", getAssignmentsByVendor);

// Quotation Request → Vendors
router.get(
    "/quotation-requests/:requestId/vendors",
    getVendorsByQuotationRequest
);

export default router;
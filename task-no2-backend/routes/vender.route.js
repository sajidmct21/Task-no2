// src/routes/vendor.routes.js

import { Router } from "express";

import {
    createVendor,
    getAllVendors,
    getVendorById,
    updateVendor,
    deleteVendor,
    searchVendors,
    filterVendors
} from "../controllers/vender.controller.js";

const router = Router();

/**
 * Vendor CRUD Routes
 */

// Create + Get All


    router.post("/create-vendor", createVendor)
    router.get("/get-all-vendors", getAllVendors);

/**
 * Search & Filter Routes
 * IMPORTANT: Keep these before /:id to avoid route conflicts
 */
router.get("/search-vendor/search", searchVendors);
router.get("/filter-vendor/filter", filterVendors);

/**
 * Single Vendor Routes (by ID)
 */

    router.get("/get-vendor-by-id/:id", getVendorById)
    router.put("/update-vendor/:id",updateVendor)
    router.delete("/delete-vendor/:id",deleteVendor);

export default router;
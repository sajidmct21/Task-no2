// src/routes/quotation.routes.js

import { Router } from "express";

import {
    createQuotation,
    getAllQuotations,
    getQuotationById,
    updateQuotation,
    deleteQuotation,
    approveQuotation,
    rejectQuotation
} from "../controllers/quotation.controller.js";

const router = Router();

/**
 * MAIN CRUD
 */

    router.post("/create-quatation",createQuotation)
    router.get("/get-all-quatation",getAllQuotations);

/**
 * ACTION ROUTES (IMPORTANT ORDER)
 */
router.patch("/:id/approve", approveQuotation);
router.patch("/:id/reject", rejectQuotation);

/**
 * SINGLE RESOURCE
 */

  
    router.get("/:id",getQuotationById)
    router.put("/:id",updateQuotation)
    router.delete("/:id",deleteQuotation);

export default router;
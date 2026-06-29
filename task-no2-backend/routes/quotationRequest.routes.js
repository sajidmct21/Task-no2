// src/routes/quotationRequest.routes.js

import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";

import {
    createQuotationRequest,
    getAllQuotationRequests,
    getQuotationRequestById,
    updateQuotationRequest,
    deleteQuotationRequest,
    publishQuotationRequest,
    closeQuotationRequest
} from "../controllers/quotationRequest.controller.js";

const router = Router();

/**
 * MAIN CRUD
 */
    router.post("/create-quotation-request",verifyToken,createQuotationRequest)
    router.get("/get-all-quotation-request",verifyToken,getAllQuotationRequests);

/**
 * SPECIAL ACTIONS (must come BEFORE :id)
 */
router.patch("/:id/publish",verifyToken, publishQuotationRequest);
router.patch("/:id/close",verifyToken, closeQuotationRequest);

/**
 * SINGLE RESOURCE
 */
    router.get("/:id",verifyToken, getQuotationRequestById)
    router.put("/:id",verifyToken,updateQuotationRequest)
    router.delete("/:id",verifyToken, deleteQuotationRequest);

export default router;
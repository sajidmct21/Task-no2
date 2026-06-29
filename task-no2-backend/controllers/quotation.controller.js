// src/controllers/quotation.controller.js

import Quotation from "../models/quotation.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

/**
 * CREATE QUOTATION
 * POST /api/quotations
 */
export const createQuotation = asyncHandler(async (req, res) => {
    const {
        quotationRequest,
        vendor,
        quotationAmount,
        remarks
    } = req.body;

    if (!quotationRequest || !vendor || !quotationAmount) {
        throw new ApiError(400, "Required fields are missing");
    }

    const quotation = await Quotation.create({
        quotationRequest,
        vendor,
        quotationAmount,
        remarks
    });

    return res
        .status(201)
        .json(new ApiResponse(201, quotation, "Quotation submitted"));
});

/**
 * GET ALL QUOTATIONS
 * GET /api/quotations
 */
export const getAllQuotations = asyncHandler(async (req, res) => {
    const quotations = await Quotation.find()
        .populate("quotationRequest", "title status requiredDate")
        .populate("vendor", "vendorName companyName email")
        .sort({ createdAt: -1 });

    return res
        .status(200)
        .json(new ApiResponse(200, quotations, "Quotations fetched"));
});

/**
 * GET QUOTATION BY ID
 * GET /api/quotations/:id
 */
export const getQuotationById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const quotation = await Quotation.findById(id)
        .populate("quotationRequest")
        .populate("vendor");

    if (!quotation) {
        throw new ApiError(404, "Quotation not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, quotation, "Quotation fetched"));
});

/**
 * UPDATE QUOTATION
 * PUT /api/quotations/:id
 */
export const updateQuotation = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const quotation = await Quotation.findById(id);

    if (!quotation) {
        throw new ApiError(404, "Quotation not found");
    }

    if (quotation.status === "Approved") {
        throw new ApiError(400, "Approved quotation cannot be updated");
    }

    const updated = await Quotation.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    });

    return res
        .status(200)
        .json(new ApiResponse(200, updated, "Quotation updated"));
});

/**
 * DELETE QUOTATION
 * DELETE /api/quotations/:id
 */
export const deleteQuotation = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const quotation = await Quotation.findById(id);

    if (!quotation) {
        throw new ApiError(404, "Quotation not found");
    }

    if (quotation.status === "Approved") {
        throw new ApiError(400, "Approved quotation cannot be deleted");
    }

    await Quotation.findByIdAndDelete(id);

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Quotation deleted"));
});

/**
 * APPROVE QUOTATION
 * PATCH /api/quotations/:id/approve
 */
export const approveQuotation = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const quotation = await Quotation.findById(id);

    if (!quotation) {
        throw new ApiError(404, "Quotation not found");
    }

    quotation.status = "Approved";
    await quotation.save();

    return res
        .status(200)
        .json(new ApiResponse(200, quotation, "Quotation approved"));
});

/**
 * REJECT QUOTATION
 * PATCH /api/quotations/:id/reject
 */
export const rejectQuotation = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const quotation = await Quotation.findById(id);

    if (!quotation) {
        throw new ApiError(404, "Quotation not found");
    }

    quotation.status = "Rejected";
    await quotation.save();

    return res
        .status(200)
        .json(new ApiResponse(200, quotation, "Quotation rejected"));
});
// src/controllers/quotationRequest.controller.js

import QuotationRequest from "../models/quotationRequest.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

/**
 * CREATE
 * POST /api/quotation-requests
 */
export const createQuotationRequest = asyncHandler(async (req, res) => {
    const { title, description, requiredDate } = req.body;
    // const user = req.user
    // console.log(user||"Not user");

    if (!title || !description) {
        throw new ApiError(400, "Title and description are required");
    }

    const quotation = await QuotationRequest.create({
        title,
        description,
        requiredDate,
        createdBy: req.user.id // assuming auth middleware
    });

    return res
        .status(201)
        .json(new ApiResponse(201, quotation, "Quotation request created"));
});

/**
 * GET ALL
 * GET /api/quotation-requests
 */
export const getAllQuotationRequests = asyncHandler(async (req, res) => {
    const data = await QuotationRequest.find()
        .populate("createdBy", "name email")
        .sort({ createdAt: -1 });

    return res
        .status(200)
        .json(new ApiResponse(200, data, "All quotation requests fetched"));
});

/**
 * GET BY ID
 * GET /api/quotation-requests/:id
 */
export const getQuotationRequestById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const quotation = await QuotationRequest.findById(id).populate(
        "createdBy",
        "name email"
    );

    if (!quotation) {
        throw new ApiError(404, "Quotation request not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, quotation, "Quotation request fetched"));
});

/**
 * UPDATE
 * PUT /api/quotation-requests/:id
 */
export const updateQuotationRequest = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const quotation = await QuotationRequest.findById(id);

    if (!quotation) {
        throw new ApiError(404, "Quotation request not found");
    }

    if (quotation.status !== "Draft") {
        throw new ApiError(400, "Only Draft quotation can be updated");
    }

    const updated = await QuotationRequest.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    });

    return res
        .status(200)
        .json(new ApiResponse(200, updated, "Quotation updated"));
});

/**
 * DELETE
 * DELETE /api/quotation-requests/:id
 */
export const deleteQuotationRequest = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const quotation = await QuotationRequest.findById(id);

    if (!quotation) {
        throw new ApiError(404, "Quotation request not found");
    }

    await QuotationRequest.findByIdAndDelete(id);

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Quotation deleted"));
});

/**
 * PUBLISH
 * PATCH /api/quotation-requests/:id/publish
 */
export const publishQuotationRequest = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const quotation = await QuotationRequest.findById(id);

    if (!quotation) {
        throw new ApiError(404, "Quotation request not found");
    }

    if (quotation.status !== "Draft") {
        throw new ApiError(400, "Only Draft can be published");
    }

    quotation.status = "Published";
    await quotation.save();

    return res
        .status(200)
        .json(new ApiResponse(200, quotation, "Quotation published"));
});

/**
 * CLOSE
 * PATCH /api/quotation-requests/:id/close
 */
export const closeQuotationRequest = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const quotation = await QuotationRequest.findById(id);

    if (!quotation) {
        throw new ApiError(404, "Quotation request not found");
    }

    if (quotation.status !== "Published") {
        throw new ApiError(400, "Only Published quotation can be closed");
    }

    quotation.status = "Closed";
    await quotation.save();

    return res
        .status(200)
        .json(new ApiResponse(200, quotation, "Quotation closed"));
});
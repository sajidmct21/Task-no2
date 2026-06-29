// src/controllers/vendorAssignment.controller.js

import VendorAssignment from "../models/venderAssignment.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

/**
 * CREATE ASSIGNMENT
 * POST /api/assignments
 */
export const createAssignment = asyncHandler(async (req, res) => {
    const { quotationRequest, vendor } = req.body;

    if (!quotationRequest || !vendor) {
        throw new ApiError(400, "Quotation request and vendor are required");
    }

    const assignment = await VendorAssignment.create({
        quotationRequest,
        vendor
    });

    return res
        .status(201)
        .json(new ApiResponse(201, assignment, "Vendor assigned successfully"));
});

/**
 * GET ALL ASSIGNMENTS
 * GET /api/assignments
 */
export const getAllAssignments = asyncHandler(async (req, res) => {
    const assignments = await VendorAssignment.find()
        .populate("quotationRequest", "title status")
        .populate("vendor", "vendorName companyName email")
        .sort({ createdAt: -1 });

    return res
        .status(200)
        .json(new ApiResponse(200, assignments, "Assignments fetched successfully"));
});

/**
 * GET ASSIGNMENT BY ID
 * GET /api/assignments/:id
 */
export const getAssignmentById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const assignment = await VendorAssignment.findById(id)
        .populate("quotationRequest")
        .populate("vendor");

    if (!assignment) {
        throw new ApiError(404, "Assignment not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, assignment, "Assignment fetched successfully"));
});

/**
 * GET VENDOR ASSIGNMENTS
 * GET /api/vendors/:vendorId/assignments
 */
export const getAssignmentsByVendor = asyncHandler(async (req, res) => {
    const { vendorId } = req.params;

    const assignments = await VendorAssignment.find({ vendor: vendorId })
        .populate("quotationRequest", "title status requiredDate")
        .sort({ createdAt: -1 });

    return res
        .status(200)
        .json(new ApiResponse(200, assignments, "Vendor assignments fetched"));
});

/**
 * GET VENDORS FOR A QUOTATION REQUEST
 * GET /api/quotation-requests/:requestId/vendors
 */
export const getVendorsByQuotationRequest = asyncHandler(async (req, res) => {
    const { requestId } = req.params;

    const vendors = await VendorAssignment.find({
        quotationRequest: requestId
    }).populate("vendor", "vendorName companyName email contactNumber");

    return res
        .status(200)
        .json(new ApiResponse(200, vendors, "Vendors fetched for quotation request"));
});
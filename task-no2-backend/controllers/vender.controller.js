// src/controllers/vendor.controller.js

import Vendor from "../models/vendor.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

/**
 * @desc Create Vendor
 * @route POST /api/vendors
 */
export const createVendor = asyncHandler(async (req, res) => {
    const {
        vendorName,
        companyName,
        email,
        contactNumber,
        businessAddress,
        taxNumber,
        category
    } = req.body;

    if (
        !vendorName ||
        !companyName ||
        !email ||
        !contactNumber ||
        !businessAddress
    ) {
        throw new ApiError(400, "All required fields must be provided");
    }

    const existingVendor = await Vendor.findOne({ email });

    if (existingVendor) {
        throw new ApiError(409, "Vendor already exists with this email");
    }

    const vendor = await Vendor.create({
        vendorName,
        companyName,
        email,
        contactNumber,
        businessAddress,
        taxNumber,
        category
    });

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                vendor,
                "Vendor created successfully"
            )
        );
});

/**
 * @desc Get All Vendors
 * @route GET /api/vendors
 */
export const getAllVendors = asyncHandler(async (req, res) => {
    const vendors = await Vendor.find().sort({ createdAt: -1 });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                vendors,
                "Vendors fetched successfully"
            )
        );
});

/**
 * @desc Get Vendor By ID
 * @route GET /api/vendors/:id
 */
export const getVendorById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const vendor = await Vendor.findById(id);
    if (!vendor) {
        throw new ApiError(404, "Vendor not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                vendor,
                "Vendor fetched successfully"
            )
        );
});

/**
 * @desc Update Vendor
 * @route PUT /api/vendors/:id
 */
export const updateVendor = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const vendor = await Vendor.findById(id);

    if (!vendor) {
        throw new ApiError(404, "Vendor not found");
    }

    if (req.body.email) {
        const existingVendor = await Vendor.findOne({
            email: req.body.email,
            _id: { $ne: id }
        });

        if (existingVendor) {
            throw new ApiError(
                409,
                "Another vendor already exists with this email"
            );
        }
    }

    const updatedVendor = await Vendor.findByIdAndUpdate(
        id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedVendor,
                "Vendor updated successfully"
            )
        );
});

/**
 * @desc Delete Vendor
 * @route DELETE /api/vendors/:id
 */
export const deleteVendor = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const vendor = await Vendor.findById(id);

    if (!vendor) {
        throw new ApiError(404, "Vendor not found");
    }

    await Vendor.findByIdAndDelete(id);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                null,
                "Vendor deleted successfully"
            )
        );
});

/**
 * @desc Search Vendors
 * @route GET /api/vendors/search?keyword=abc
 */
export const searchVendors = asyncHandler(async (req, res) => {
    const { keyword } = req.query;

    if (!keyword) {
        throw new ApiError(400, "Search keyword is required");
    }

    const vendors = await Vendor.find({
        $or: [
            {
                vendorName: {
                    $regex: keyword,
                    $options: "i"
                }
            },
            {
                companyName: {
                    $regex: keyword,
                    $options: "i"
                }
            },
            {
                email: {
                    $regex: keyword,
                    $options: "i"
                }
            },
            {
                category: {
                    $regex: keyword,
                    $options: "i"
                }
            }
        ]
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                vendors,
                "Search results fetched successfully"
            )
        );
});

/**
 * @desc Filter Vendors
 * @route GET /api/vendors/filter
 * Example:
 * /api/vendors/filter?category=IT&isActive=true
 */
export const filterVendors = asyncHandler(async (req, res) => {
    const { category, isActive } = req.query;

    const filter = {};

    if (category) {
        filter.category = category;
    }

    if (isActive !== undefined) {
        filter.isActive = isActive === "true";
    }

    const vendors = await Vendor.find(filter).sort({
        createdAt: -1
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                vendors,
                "Filtered vendors fetched successfully"
            )
        );
});
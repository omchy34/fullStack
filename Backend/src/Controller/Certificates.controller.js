import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { CertificateRequest } from "../models/CertificatesReq.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import fs from 'fs';

// Request certificate
const requestCertificate = asyncHandler(async (req, res) => {
    const existingRequest = await CertificateRequest.findOne({ userId: req.user._id, status: { $ne: 'denied' } });
    if (existingRequest) {
        return res.status(400).json({ error: 'A request already exists' });
    }

    const newRequest = new CertificateRequest({ userId: req.user._id });
    await newRequest.save();
    res.status(201).json({ status: 'Request submitted successfully', userId: req.user._id });
});

// Get eligibility and certificate URL
const getEligibility = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const certificateRequest = await CertificateRequest.findOne({ userId });

    if (!certificateRequest) {
        return res.status(200).json({ eligible: false });
    }

    const { status, certificateUrl } = certificateRequest;
    const eligible = status === 'approved' || status === 'uploaded';
    const certificate = status === 'uploaded' ? certificateUrl : null;

    res.status(200).json({ eligible, certificate });
});

// Admin approves certificate request
const approveCertificateRequest = asyncHandler(async (req, res) => {
    const { requestId } = req.params;
    const certificateRequest = await CertificateRequest.findById(requestId);

    if (!certificateRequest) {
        throw new ApiError(404, 'Certificate request not found.');
    }

    certificateRequest.status = 'approved';
    await certificateRequest.save();

    res.status(200).json(new ApiResponse(200, 'Certificate request approved.'));
});

// Admin deletes request 
const deleteRequest = asyncHandler(async (req, res) => {
    const { requestId } = req.params; 
    const certificateRequest = await CertificateRequest.findByIdAndDelete(requestId);

    if (!certificateRequest) {
        throw new ApiError(404, "Certificate request not found.");
    }

    res.status(200).json(new ApiResponse(200, 'Certificate request deleted.'));
});

// Admin uploads certificate
const uploadCertificate = asyncHandler(async (req, res) => {
    const { requestId } = req.params;
    const certificateRequest = await CertificateRequest.findById(requestId);

    if (!certificateRequest) {
        throw new ApiError(404, 'Certificate request not found.');
    }

    const localFilePath = req.file.path;

    if (!fs.existsSync(localFilePath)) {
        throw new ApiError(400, 'File not found.');
    }

    const result = await uploadOnCloudinary(localFilePath);
    if (!result) {
        throw new ApiError(500, 'Error uploading to Cloudinary.');
    }

    certificateRequest.certificateUrl = result.secure_url;
    certificateRequest.status = 'uploaded';
    await certificateRequest.save();

    res.status(200).json(new ApiResponse(200, 'Certificate uploaded successfully.'));
});

export { requestCertificate, getEligibility, approveCertificateRequest, uploadCertificate, deleteRequest };

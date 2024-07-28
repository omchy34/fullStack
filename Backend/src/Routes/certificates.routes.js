import express from "express";
import multer from "multer";
import { asyncHandler } from "../utils/asyncHandler.js";
import { CertificateRequest } from "../models/CertificatesReq.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { verifyUserJWT, verifyAdminJWT } from "../Middlerwere/Auth.middlewere.js";
import {
  requestCertificate,
  getEligibility,
  approveCertificateRequest,
  uploadCertificate,
  deleteRequest
} from "../Controller/Certificates.controller.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Routes for certificate requests and approvals
router.post("/request", verifyUserJWT, requestCertificate);
router.get("/eligible", verifyUserJWT, getEligibility);
router.get(
  "/requests",
  verifyAdminJWT,
  asyncHandler(async (req, res) => {
    const requests = await CertificateRequest.find().populate("userId", "email");
    res.status(200).json({ requests });
  })
);
router.patch("/approve/:requestId", verifyAdminJWT, approveCertificateRequest);
router.patch(
  "/deny/:requestId",
  verifyAdminJWT,
  asyncHandler(async (req, res) => {
    const { requestId } = req.params;
    const certificateRequest = await CertificateRequest.findById(requestId);

    if (!certificateRequest) {
      throw new ApiError(404, "Certificate request not found.");
    }

    certificateRequest.status = "denied";
    await certificateRequest.save();

    res.status(200).json(new ApiResponse(200, "Certificate request denied."));
  })
);
router.post(
  "/upload/:requestId",
  verifyAdminJWT,
  upload.single("certificate"),
  uploadCertificate
);

router.delete("/deleteRequest/:requestId", verifyAdminJWT, deleteRequest);

export default router;

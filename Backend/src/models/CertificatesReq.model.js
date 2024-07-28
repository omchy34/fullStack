import mongoose from 'mongoose';

const CertificateRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'approved', 'denied', 'uploaded'], default: 'pending' },
  requestedAt: { type: Date, default: Date.now },
  certificateUrl: { type: String },
});

export const CertificateRequest = mongoose.model('CertificateRequest', CertificateRequestSchema);

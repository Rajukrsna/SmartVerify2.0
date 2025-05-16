
  const mongoose = require('mongoose');
const { Schema } = mongoose;

const IdentityDocumentSchema = new Schema({
  type: String, // 'Aadhaar', 'PAN', etc.
  documentUrl: String,
  uploadedAt: Date
});

const AdditionalDocSchema = new Schema({
  type: String, // 'Patta', 'EC', etc.
  documentUrl: String
});

const VideoConsentSchema = new Schema({
  videoUrl: String,
  uploadedAt: Date,
  videoHash: String,
  transcript: String,
  ipAddress: String,
  location: {
    lat: Number,
    lng: Number
  }
});

const DigitalSignatureSchema = new Schema({
  signedDocUrl: String,
  signingService: String,
  signatureTimestamp: Date,
  signerIP: String,
  documentHash: String,
  certificateInfo: {
    issuer: String,
    serialNumber: String,
    validFrom: Date,
    validTo: Date
  }
});

const UserMetadataSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // reference to user

  seller: {
    fullName: String,
    aadhaarNumber: String, // hashed if needed
    panNumber: String,
    mobileNumber: String,
    email: String,
    kycVerified: Boolean,
    identityDocuments: [IdentityDocumentSchema]
  },

  property: {
    propertyId: String,
    surveyNumber: String,
    pattaNumber: String,
    district: String,
    taluk: String,
    village: String,
    extentInSqFt: Number,
    landType: String,
    ownershipShare: String,
    additionalDocs: [AdditionalDocSchema]
  },

  videoConsent: VideoConsentSchema,

  digitalSignature: DigitalSignatureSchema,

  verificationStatus: {
    verified: Boolean,
    verifiedAt: Date,
    verifiedBy: String
  },

  consentRecordId: { type: String, unique: true },
  result: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserMetadata', UserMetadataSchema);

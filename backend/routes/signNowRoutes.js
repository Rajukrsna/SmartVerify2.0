const express = require("express");
const axios = require("axios");
require("dotenv").config();
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const router = express.Router();
const SIGNNOW_API_URL = "https://api.signnow.com";
const UserMetadata = require("../models/UserMetaData");
const CLIENT_ID = process.env.SIGNNOW_CLIENT_ID;
const CLIENT_SECRET = process.env.SIGNNOW_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SIGNNOW_REFRESH_TOKEN;
//const DOCUMENT_ID = "25240c7a570e495396f5ca274089d16cc131974f"; // Replace with your actual document ID
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // ✅ Ensure the directory exists
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // ✅ Preserve original filename
  },
});
// Convert a stream to a buffer
function streamToBufferAsync(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}




const upload = multer({ storage: storage });


const s3 = new S3Client({
  region: 'us-east-2',
  credentials: {
    accessKeyId: process.env.ACCESSKEYAWS ,
    secretAccessKey:process.env.SECRETAWS ,
  }
});

// Function to download PDF from SignNow and upload to S3
async function downloadAndUploadSignedPDF(documentId, accessToken, s3Key) {
  try {
    // Step 1: Download PDF as stream
    const pdfResponse = await axios.get(
      `https://api.signnow.com/document/${documentId}/download?type=collapsed`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        responseType: "stream",
      }
    );
    //console.log("PDF Response:", pdfResponse.data); 
    const buffer = await streamToBufferAsync(pdfResponse.data);
    // Step 2: Upload stream to S3
    const uploadParams = {
      Bucket: "mysmartverifybucket",
      Key: s3Key,
      Body: buffer, // this is a stream
      ContentType: "application/pdf",
    };
    // Create getObject command
const getObjectCommand = new GetObjectCommand({
  Bucket: "mysmartverifybucket",
  Key: s3Key
});

    await s3.send(new PutObjectCommand(uploadParams));
    const signedUrl = await getSignedUrl(s3, getObjectCommand, { expiresIn: 3600 });

    // Step 3: Return the S3 URL
    return signedUrl;
  } 
  catch (error) {
    console.log("Error downloading and uploading PDF:", error);
}
}



// 🔹 1️⃣ Get Access Token using Refresh Token
const getAccessToken = async () => {
  try {
    const response = await axios.post(`${SIGNNOW_API_URL}/oauth2/token`, null, {
      params: {
        grant_type: "refresh_token",
        refresh_token: REFRESH_TOKEN,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      },
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    return response.data.access_token;
  } catch (error) {
    console.error("❌ Error getting access token:", error.response?.data || error.message);
    throw new Error("Failed to get SignNow access token");
  }
};

const addSignatureFields = async (documentId) => {
  try {
    const accessToken = await getAccessToken();  // ✅ Get Access Token

    const response = await axios.put(
      `${SIGNNOW_API_URL}/document/${documentId}`,
      {
        fields: [
          {
            type: "text",
            label: "Full Name",
            role: "Signer",
            page_number: 0,  // ✅ Page number where the field should appear
            x: 100,  // ✅ Adjust based on document structure
            y: 190,
            width: 150,
            height: 25,
            required: true,
          },
          {
            type: "text",
            label: "Email",
            role: "Signer",
            page_number: 0,
            x: 150,
            y: 220,
            width: 150,
            height: 25,
            required: true,
          },
          {
            type: "text",
            label: "Phone",
            role: "Signer",
            page_number: 0,
            x: 150,
            y: 250,
            width: 150,
            height: 25,
            required: true,
          },
          {
            type: "text",
            label: "Property ID",
            role: "Signer",
            page_number: 0,
            x: 150,
            y: 300,
            width: 150,
            height: 25,
            required: true,
          },
          {
            type: "text",
            label: "Address",
            role: "Signer",
            page_number: 0,
            x: 150,
            y: 330,
            width: 150,
            height: 25,
            required: true,
          },
          {
            type: "signature",
            role: "Signer",  
            page_number: 0,  // ✅ Place signature on the first page
            x: 100,  
            y: 490,  
            width: 200,  
            height: 50,  
            required: true,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Fields added successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error adding fields:", error.response?.data || error.message);
    throw new Error("Failed to add fields");
  }
};



const FormData = require("form-data");

router.post("/upload-document", upload.single("file"), async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const filePath = path.resolve(req.file.path);
      //.log(req.file.path)


   // console.log("📂 Uploaded File Content:", fs.readFileSync(filePath, "utf8")); // Debugging

    const formData = new FormData();
    formData.append("file", fs.createReadStream(filePath), {
      filename: req.file.originalname, // ✅ Ensure correct filename
      contentType: req.file.mimetype,  // ✅ Set correct MIME type
    });

    //console.log("📤 Uploading to SignNow...");
    const response = await axios.post(`${SIGNNOW_API_URL}/document`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...formData.getHeaders(),
      },
    });
   
    await addSignatureFields(response.data.id);

   // console.log("✅ Upload Response:", response.data);
    res.json({ documentId: response.data.id });

  } catch (error) {
    console.error("❌ Error uploading document:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to upload document" });
  }
});

// 🔹 2️⃣ Create an Embedded Signing Invite
router.post("/send-signature-request", async (req, res) => {
  try {
    const { signerEmail, signerName, documentId } = req.body;
   // console.log("documnetId : ",documentId)     
    const accessToken = await getAccessToken();
//console.log("access token: ", accessToken);
    // Fetch role_id from the document (GET /document/{document_id})
    const docResponse = await axios.get(`${SIGNNOW_API_URL}/document/${documentId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const roleId = docResponse.data.roles[0]?.unique_id; // Get first role ID
//console.log("roleID",roleId)
    if (!roleId) throw new Error("No role ID found in document");

    // Send embedded signing invite
    const inviteResponse = await axios.post(
      `${SIGNNOW_API_URL}/v2/documents/${documentId}/embedded-invites`,
      {
        invites: [
          {
            email: signerEmail,
            role_id: roleId,
            order: 1,
            auth_method: "none",
            first_name: signerName.split(" ")[0],
            last_name: signerName.split(" ")[1] || "",
            redirect_uri: "http://localhost:3000/signing-success", // Change if needed
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
//console.log("inviteResponse",inviteResponse.data)
    const inviteId = inviteResponse.data.data[0]?.id;
    if (!inviteId) throw new Error("Failed to get invite ID");

    res.json({ inviteId, message: "Invite created successfully!" });
  } catch (error) {
    console.error("❌ Error sending signature request:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to send signature request" });
  }
});

// 🔹 3️⃣ Generate Embedded Signing URL
// 🔹 4️⃣ Generate Embedded Signing URL (With Invite Status Check)
router.post("/get-signing-url", async (req, res) => {
  try {
    const { inviteId, documentId } = req.body;
    //console.log("documentId", documentId)
    const accessToken = await getAccessToken();

    // ✅ Fetch the document details
    const docResponse = await axios.get(`${SIGNNOW_API_URL}/v2/documents/${documentId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

   // console.log(docResponse.data);
  
    // ✅ Generate the embedded signing link
    const response = await axios.post(
      `${SIGNNOW_API_URL}/v2/documents/${documentId}/embedded-invites/${inviteId}/link`,
      {
        auth_method: "none", // ✅ Ensure it matches what was used in invite creation
        link_expiration: 30, // ✅ Set link expiration (15-45 min allowed)
        session_expiration: 60, // ✅ Set session expiration (15-1440 min allowed)
      },
      {
        headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
    );

    res.json({ signingUrl: response.data.data.link });
    
  } catch (error) {
    console.error("❌ Error generating signing URL:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate signing URL" });
  }
});

router.post("/save-event", async (req, res) => {
  try {
    const { userId, documentId, nameU} = req.body;
    console.log("my doc id", documentId)  
     const accessToken = await getAccessToken();
   const s3Key = `signed-consent-forms/${documentId}.pdf`;
const signedDocUrl = await downloadAndUploadSignedPDF(documentId, accessToken, s3Key);

// Update UserMetadata with the actual S3 URL
await UserMetadata.updateOne(
  { userId: userId },
  {
    $set: {
     seller:
     {
      fullName: nameU
     },
      digitalSignature: {
        signedDocUrl,
        signingService: "SignNow",
        signatureTimestamp: new Date(),
        signerIP: "192.168.0.1",
        documentHash: "xyz456",
        certificateInfo: {
          issuer: "SignNow Authority",
          serialNumber: "ABC987",
          validFrom: new Date(),
          validTo: new Date("2025-12-31")
        }
      }
    }
  }
);
  } catch (error) {
    console.error("Error saving event:", error);
    res.status(500).json({ message: "Error saving event" });
  }
}); 
module.exports = router;

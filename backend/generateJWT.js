const fs = require("fs");
const jwt = require("jsonwebtoken");

console.log("🔹 Loading private key...");
const privateKey = fs.readFileSync("./config/private.pem", "utf8");

console.log("✅ Private key loaded successfully!");
// Define JWT Payload
const payload = {
  iss: "f023b60c-a9f5-4035-95af-7fd9361edfce", // Replace with DocuSign Integration Key
  sub: "643f0818-2992-493a-954d-da793d0ba120", // Replace with your DocuSign User ID
  aud: "account-d.docusign.com", // API Base URL for Developer Sandbox
  iat: Math.floor(Date.now() / 1000), // Current timestamp
  exp: Math.floor(Date.now() / 1000) + 3600, // Expire in 1 hour
  scope: "signature impersonation",
};

// Generate JWT Token
const jwtToken = jwt.sign(payload, privateKey, { algorithm: "RS256" });

console.log("Generated JWT Token:", jwtToken);

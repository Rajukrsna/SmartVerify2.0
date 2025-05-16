## 🏡 Project Introduction

This project introduces a **secure verification system** for property sellers, allowing them to digitally confirm their consent to sell a property through our platform. The system leverages advanced technologies like **Artificial Intelligence** and **Blockchain** to ensure that the seller's consent is **authentic, verifiable, and tamper-proof**.

Consent is captured through a **video recording and digitally signed**, then securely stored on the blockchain. This provides **immutable proof** that the seller willingly agreed to the transaction. Our AI-powered system also analyzes the video for **signs of coercion or distress**, and if detected, flags the case for **manual verification**.

This transparent process protects both governments and buyers from future **legal disputes**, where sellers might claim they were forced or unaware. All verifications are conducted in **real-time** and **facelessly**, making the process both **secure and efficient**.


## 🚀 Getting Started

Follow these steps to set up and run the SmartVerify application locally:

### 1. Clone the Repository

```bash
git clone https://github.com/Rajukrsna/smartverify.git
 ```
```bash
cd client
```
```bash
npm install
```
```bash
npm start
```
The frontend will run at localhost:3000

```bash
cd backend
```
```bash
npm install
```
```bash
npx nodemon server.js
```
The backend will run at localhost:5000
# 📘 SmartVerify API Documentation

## 🔐 API Gateway

| Route              | Service                          | Description                                           |
|-------------------|----------------------------------|-------------------------------------------------------|
| `/api/auth`       | Identity Service                 | Handles user authentication and token management     |
| `/api/signnow`    | Digital Signature Service        | Manages digital signature workflows                  |
| `/api/video`      | Video & AI Verification Service  | Processes video and runs sentiment analysis          |
| `/api/store`      | Blockchain Service               | Proof uploads and verification via smart contracts   |
| `/api/timeline`   | User Activity Service            | Saves and fetches user activity timelines            |

---

## 🔐 Identity Service

| Method | Endpoint           | Description                  |
|--------|--------------------|------------------------------|
| POST   | `/register`        | Register a new user          |
| POST   | `/login`           | Log in existing user         |
| POST   | `/refresh-token`   | Refresh authentication token |
| POST   | `/logout`          | Log out user                 |

---

## ✍️ Digital Signature Service

| Method | Endpoint                       | Description                                      |
|--------|--------------------------------|--------------------------------------------------|
| POST   | `/upload-document`            | Upload consent document to be signed            |
| POST   | `/send-signature-request`     | Create embedded signature request               |
| GET    | `/get-signing-url`            | Get the embedded signing URL                    |
| GET    | `/signature-status/:inviteId` | Check signing status via invite ID              |

---

## 🎥 Video Recording and AI Verification Service

| Method | Endpoint             | Description                                           |
|--------|----------------------|-------------------------------------------------------|
| POST   | `/upload`            | Upload user video                                     |
| POST   | `/analyze`           | Analyze video using DeepFace for coercion/sentiment  |
| GET    | `/status/:videoId`  | Get analysis result/status by video ID               |

---

## 🔗 Blockchain Service

| Method | Endpoint                        | Description                                                     |
|--------|----------------------------------|-----------------------------------------------------------------|
| POST   | `/store-hash`                   | Interact with smart contract to store IPFS hash (CID)          |
| GET    | `/verify/:userId`               | Verify if stored hash matches input data                       |
| GET    | `/transactions/:txId`           | Fetch transaction metadata for legal/audit purposes            |

---

## 🕒 User Activity Timeline Service

| Method | Endpoint                 | Description                             |
|--------|--------------------------|-----------------------------------------|
| POST   | `/save-event`            | Save consent event to timeline          |
| GET    | `/events/:userId`        | Fetch timeline events for a user        |

This transparent process protects both governments and buyers from future **legal disputes**, where sellers might later claim they were forced or unaware. All verifications are conducted in **real-time** and **facelessly**, making the process both **secure** and **efficient**.



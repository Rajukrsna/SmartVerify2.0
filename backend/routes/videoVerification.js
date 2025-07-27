const express = require('express');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const vision = require('@google-cloud/vision');

   const crypto = require('crypto');
require('dotenv').config();
const UserMetadata = require('../models/UserMetaData'); 
const router = express.Router();
const client = new vision.ImageAnnotatorClient();
const mime = require('mime-types'); 
const { GetObjectCommand } = require("@aws-sdk/client-s3");

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = new S3Client({
  region: 'us-east-2',
  credentials: {
   accessKeyId: process.env.ACCESSKEYAWS ,
    secretAccessKey:process.env.SECRETAWS ,
  }
});
const BUCKET_NAME = 'mysmartverifybucket';
// Storage config for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'temp/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
    
    try {
      console.log("ejhgijhero")
        const { userId } = req.body;
        const videoPath = req.file.path;
            const originalName = req.file.originalname;
            const contentType = mime.lookup(originalName) || 'application/octet-stream';
        const mp4Path = videoPath.replace('.webm', '.mp4');
        const framesDir = path.join(__dirname, '../temp/frames_' + Date.now());

        fs.mkdirSync(framesDir);

        // ✅ Step 1: Convert .webm to .mp4
        await new Promise((resolve, reject) => {
            ffmpeg(videoPath)
                .output(mp4Path)
                .on('end', () => {
                    console.log('Conversion to .mp4 successful:', mp4Path);
                    resolve();
                })
                .on('error', (err) => {
                    console.error('Conversion error:', err);
                    reject(err);
                })
                .run();
        });

      // ✅ Step 2: Extract frames from .mp4
      await new Promise((resolve, reject) => {
        ffmpeg(mp4Path)
            .output(`${framesDir}/frame-%03d.jpg`)
            .outputOptions('-vf', 'fps=1') // 1 frame/sec
            .on('end', () => {
                console.log('Frame extraction complete:', framesDir);
                resolve();
            })
            .on('error', (err) => {
                console.error('Frame extraction error:', err);
                reject(err);
            })
            .run();
    });
 // Read file from disk
    const fileBuffer = fs.readFileSync(mp4Path);
 
    const videoHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

    // Unique S3 object key (you can use userId/timestamp for folders)
    const s3Key = `video-consents/${Date.now()}_${originalName}`;

    // Upload to S3
    const uploadCommand = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: s3Key,
      Body: fileBuffer,
      ContentType: contentType,

    });
    // Create getObject command
const getObjectCommand = new GetObjectCommand({
  Bucket: BUCKET_NAME,
  Key: s3Key
});

    await s3.send(uploadCommand);

    // Respond with success and S3 URL (optional)
   // const fileUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${s3Key}`;
    const signedUrl = await getSignedUrl(s3, getObjectCommand, { expiresIn: 3600 });

        // 2. Analyze emotions in each frame
        const files = fs.readdirSync(framesDir);
        console.log('Frames extracted:', files.length); 
        let flaggedFrames = 0;
        let facesNo =0;
            for (const file of files) {
            const filePath = path.join(framesDir, file);
            const [result] = await client.faceDetection({ image: { content: fs.readFileSync(filePath) } });
            console.log(result)
            console.log('Analyzing frame:', file);
            const faces = result.faceAnnotations || [];
            
            facesNo+=faces.length;
            console.log('Faces detected:', faces.length);
            for (const face of faces) {
                const anger = face.angerLikelihood;
                console.log('Anger:', anger);
                const sorrow = face.sorrowLikelihood;
            
                const surprise = face.surpriseLikelihood;
                const under = face.underExposedLikelihood;
                const blurred = face.blurredLikelihood; 
                const headwear = face.headwearLikelihood;   
                if (['LIKELY', 'VERY_LIKELY'].includes(anger) || ['VERY_LIKELY'].includes(sorrow)||['LIKELY','VERY_LIKELY'].includes(under)||['LIKELY','VERY_LIKELY'].includes(under)||['LIKELY','VERY_LIKELY'].includes(blurred)||['LIKELY','VERY_LIKELY'].includes(headwear)) {
                    flaggedFrames++;
                    console.log(`${file}: flagged (anger/sorrow)`);
                }
            }
        }
        console.log("no of frames facces where dedecteed", facesNo)
        // 3. Decide result
        const flagged = flaggedFrames > (files.length * 0.3)|| facesNo<=5; // flag if >30% suspicious
        console.log('Flagged frames:', flaggedFrames, 'out of', files.length);  
        res.status(200).json(
            {
            message: flagged ? '1' : '0',
            flagged,
            flaggedFrames,
            totalFrames: files.length
        });
        // Clean up
        fs.rmSync(framesDir, { recursive: true, force: true });
        fs.unlinkSync(videoPath);

        await UserMetadata.updateOne(
        { userId: userId },
      {
    $set: {
      videoConsent: {
        videoUrl: signedUrl,
        uploadedAt: new Date(),
        videoHash: videoHash,
        ipAddress: req.ip,
        location: { lat: 10.5, lng: 78.3 }
      }
    }
  }
);

    } catch (err) {
        console.error(err);
        res.status(500).send('Error processing video');
    }
});


router.post("/save", async (req, res) => {
    try {
        const { aiFlag, userId } = req.body;
        console.log("AI Flag:", aiFlag); // Log the AI flag for debugging
          
       await UserMetadata.updateOne( 
        {userId: userId },
      { 
         $set: {
        result: aiFlag
         }
        }
       )


        res.status(200).json({ message: "AI flag saved successfully" });
    } catch (error) {
        console.error("Error saving AI flag:", error);
        res.status(500).json({ message: "Error saving AI flag" });
    }
});
router.get("/getMetaData/:userId", async (req, res) => {   
          try
          {
            const { userId } = req.params;
            const metaData = await UserMetadata.find({ userId: userId });
            if (!metaData) 
                {
                    
                return res.status(404).json({ message: "AI status not found" });
            }
            res.status(200).json(metaData); 
          }
          catch (error) {
            console.error("Error fetching AI status:", error);
            res.status(500).json({ message: "Error fetching AI status" });  

}
})


module.exports = router;

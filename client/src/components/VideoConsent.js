import React, { useState, useEffect, useRef } from "react";
import { Box, Paper, Typography, Button, CircularProgress, Grid } from "@mui/material";
import DoDontsList from "./DoDontsList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RecordingInstructionsCard from "./RecordingInstructionCard";
import axios from "axios";
import { useTranslation } from "react-i18next";
//mport { NFTStorage, File } from 'nft.storage';
import { sha256 } from 'js-sha256'; // For hashing
//onst nftStorageClient = new NFTStorage({ token: '758229bf.5023b9cb6bfb47268f37e96a4f5f9bc1' });
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const userId = localStorage.getItem("userId");
const VideoConsent = ({ handleNextStep }) => {
  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      console.log("Voices loaded:", window.speechSynthesis.getVoices());
    };
  }, []);
  const { t } = useTranslation();
  const { i18n } = useTranslation();
const language = i18n.language === "ta" ? "ta-IN" : "en-US";
console.log(language) // Adjust based on your i18n setup
const questions = t("videoConsent.questions", { returnObjects: true });

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [videoUploading, setVideoUploading] = useState(false);
  const [videoSubmitted, setVideoSubmitted] = useState(false);
  const [sentimentResult, setSentimentResult] = useState(null);
 // const [currentQuestion, setCurrentQuestion] = useState(0);
  const [transcript, setTranscript] = useState([]);
  const chunks = useRef([]);

  const startRecording = async () => {
   
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;

      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.current.push(event.data);
        }
      };

      mediaRecorderRef.current.start();
      setRecording(true);

      // Start the questioning process
      askQuestion(0);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    setRecording(false);
  };
 
  const askQuestion = (index) => {
    if (index >= questions.length) return;
  
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(questions[index]);
  
    // Set correct language
    const language = i18n.language === "ta" ? "ta-IN" : "en-US";
    utterance.lang = language;
  
    const voices = synth.getVoices();
  
    // Prefer exact Tamil match, then Tamil-named voice, then Ravi as fallback
    const matchedVoice = 
      voices.find((voice) => voice.lang === language) ||
      voices.find((voice) => voice.name.toLowerCase().includes("tamil")) ||
      voices.find((voice) => voice.name === "Microsoft Ravi - English (India)") ||
      voices.find((voice) => voice.lang === "en-IN") ||
      voices[0]; // ultimate fallback
  
    if (matchedVoice) {
      utterance.voice = matchedVoice;
      console.log("Using voice:", matchedVoice.name);
    } else {
      console.warn("No matching voice found for:", language);
    }
  
    utterance.onend = () => listenForResponse(index);
  
    synth.speak(utterance);
  };
  
  

    const listenForResponse = (index) => {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = "en-US";
      recognition.start();

      recognition.onresult = (event) => {
        const response = event.results[0][0].transcript;
        setTranscript((prev) => [...prev, { question: questions[index], answer: response }]);
        console.log(`Q: ${questions[index]}, A: ${response}`);

        // Ask next question
        if (index + 1 < questions.length) {
          setTimeout(() => askQuestion(index + 1), 1000);
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };
    };
  const handleSubmitVideo = async () => {
    setVideoUploading(true);

    try {
       // 1. Create Blob from recorded chunks
       const recordedBlob = new Blob(chunks.current, { type: "video/webm" });

       // 2. Create File object
       const file = new File([recordedBlob], 'consent-video.webm', { type: 'video/webm' });

       // 3. Generate hash
       const arrayBuffer = await recordedBlob.arrayBuffer();
       const uint8Array = new Uint8Array(arrayBuffer);
       const videoHash = sha256(uint8Array);

       console.log("Video Hash (SHA-256):", videoHash);
       
       // ✅ 4. Prepare FormData
       const formData = new FormData();
       formData.append('file', file);  // This is important!
       formData.append('videoHash', videoHash);
       formData.append('transcript', transcript);
       formData.append('userId', userId);

       // ✅ 5. POST as multipart/form-data
       const response = await axios.post("http://localhost:5000/api/video/upload", formData, {
           headers: {
               'Content-Type': 'multipart/form-data'
           }
       });
         const data = response.data;
         console.log("Response from server:", data);
         let aiFlag = "Green";
         if(data.message === "1")
         {
          aiFlag = "Red"
         }
         else
         aiFlag = "Green"
        // 6. Update UI and show success toast
        setVideoUploading(false);
        setVideoSubmitted(true);
        setSentimentResult("Moving to the next step...");
        toast.success(t("videoConsent.recordingSuccess"), { position: "top-right" });

        // 7. Save event in the database
        await axios.post(`${backendUrl}/api/timeline/save-event`, {
            userId: userId,
            title: "Video Consent Recorded Successfully",
            description: "Consent video is Recorded Successfully.",
            status: "Completed",
        });
        // save the ai status in the database
        await axios.post(`${backendUrl}/api/video/save`, {
          userId: userId,
          aiFlag: aiFlag
     })


        // 8. Transition to the next step
        setTimeout(() => handleNextStep(), 4000);
    } catch (error) {
        console.error(error);
        toast.error("Error uploading video consent", { position: "top-right" });
        setVideoUploading(false);
    }
};


  

  return (
    <Grid container spacing={2}>
      <ToastContainer />
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
          <Typography variant="h5" gutterBottom>{t("rec")}</Typography>
          <Box sx={{ width: "100%", height: "300px", bgcolor: "#f0f0f0", mb: 2 }}>
            <video ref={videoRef} autoPlay playsInline width="100%" height="100%" />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button variant="contained" color="secondary" onClick={startRecording} disabled={recording}>{t("cap")}</Button>
            <Button variant="contained" color="error" onClick={stopRecording} disabled={!recording}>{t("sap")}</Button>
            <Button variant="contained" color="primary" onClick={handleSubmitVideo} >
              {videoUploading ? <CircularProgress size={24} /> : t("sub")}
            </Button>
          </Box>
          {videoSubmitted && (
            <Typography sx={{ mt: 2 }} color="green">
             {sentimentResult}
            </Typography>
          )}
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <DoDontsList />
      </Grid>
      <RecordingInstructionsCard />

    </Grid>
  );
};

export default VideoConsent;

let mediaRecorder;
let recordedChunks = [];
let activeTabId;
let timerInterval;
let secondsElapsed = 0;

// ----------------- Timer -----------------
function startTimer() {
  const timerEl = document.getElementById("timer");
  secondsElapsed = 0;

  timerInterval = setInterval(() => {
    secondsElapsed++;
    const minutes = String(Math.floor(secondsElapsed / 60)).padStart(2, "0");
    const seconds = String(secondsElapsed % 60).padStart(2, "0");
    timerEl.textContent = `${minutes}:${seconds}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  document.getElementById("timer").textContent = "00:00";
}

// ----------------- Listen for Teams tab -----------------
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "teamsTabDetected") {
    activeTabId = msg.tabId;
    document.getElementById("startBtn").disabled = false;
  }
});

// ----------------- Check current tab on popup open -----------------
document.addEventListener("DOMContentLoaded", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (/https:\/\/.*teams.*\.com/.test(tab.url)) {
    activeTabId = tab.id;
    document.getElementById("startBtn").disabled = false;
  }
});

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

// ----------------- Start Recording -----------------
startBtn.addEventListener("click", () => {
  chrome.tabCapture.capture({ audio: true, video: true }, async (tabStream) => {
    if (!tabStream) {
      alert("Failed to start recording. Make sure you're on a Teams tab.");
      return;
    }

    let finalStream;

    try {
      // Capture microphone
      const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Mix tab + mic audio
      const ctx = new AudioContext();
      const destination = ctx.createMediaStreamDestination();

      const tabSource = ctx.createMediaStreamSource(tabStream);
      const micSource = ctx.createMediaStreamSource(micStream);

      tabSource.connect(destination);
      micSource.connect(destination);

      // Merge video (from tab) + mixed audio
      finalStream = new MediaStream([
        ...tabStream.getVideoTracks(),
        ...destination.stream.getAudioTracks()
      ]);

      console.log("✅ Recording tab + mic audio");
    } catch (err) {
      console.warn("⚠️ Mic capture failed, fallback to tab audio only:", err);
      // Fallback: tab video + tab audio
      finalStream = new MediaStream([
        ...tabStream.getVideoTracks(),
        ...tabStream.getAudioTracks()
      ]);
    }

    mediaRecorder = new MediaRecorder(finalStream, {
      mimeType: "video/webm; codecs=vp8,opus"
    });

    recordedChunks = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) recordedChunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      stopTimer();
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      chrome.downloads.download({ url, filename: "teams_recording.webm" });
    };

    mediaRecorder.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
    startTimer();
  });
});

// ----------------- Stop Recording -----------------
stopBtn.addEventListener("click", () => {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }
});

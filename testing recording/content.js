console.log("✅ Teams Monitor content.js loaded!");

let meetingStarted = false;
let startTime = null;
let recorder;
let chunks = [];
let recordingBar;
let timerInterval;
let secondsElapsed = 0;

function log(msg) {
  console.log(`[Teams Monitor] ${msg}`);
}

// 🔴 Recording bar with glassmorphism
function showRecordingBar(showStopButton = false) {
  if (recordingBar) return;

  recordingBar = document.createElement("div");
  recordingBar.style.position = "fixed";
  recordingBar.style.bottom = "-100px";
  recordingBar.style.right = "20px";
  recordingBar.style.padding = "14px 18px";
  recordingBar.style.borderRadius = "16px";
  recordingBar.style.fontSize = "15px";
  recordingBar.style.fontWeight = "600";
  recordingBar.style.display = "flex";
  recordingBar.style.alignItems = "center";
  recordingBar.style.gap = "12px";
  recordingBar.style.color = "#fff";
  recordingBar.style.background = "rgba(255, 51, 102, 0.25)";
  recordingBar.style.backdropFilter = "blur(12px)";
  recordingBar.style.boxShadow = "0 8px 28px rgba(0,0,0,0.3)";
  recordingBar.style.zIndex = "999999";
  recordingBar.style.transition = "all 0.5s ease";

  const dot = document.createElement("div");
  dot.style.width = "12px";
  dot.style.height = "12px";
  dot.style.borderRadius = "50%";
  dot.style.background = "#ff1744";
  dot.style.boxShadow = "0 0 0 0 rgba(255, 23, 68, 0.7)";
  dot.style.animation = "pulse 1.5s infinite";
  recordingBar.appendChild(dot);

  const timerText = document.createElement("span");
  timerText.textContent = "Recording... 00:00";
  recordingBar.appendChild(timerText);

  if (showStopButton) {
    const stopBtn = document.createElement("button");
    stopBtn.textContent = "⏹ Stop";
    stopBtn.style.background = "linear-gradient(135deg, #ff416c, #ff4b2b)";
    stopBtn.style.border = "none";
    stopBtn.style.borderRadius = "12px";
    stopBtn.style.color = "#fff";
    stopBtn.style.padding = "6px 14px";
    stopBtn.style.cursor = "pointer";
    stopBtn.style.fontSize = "13px";
    stopBtn.style.fontWeight = "600";
    stopBtn.style.boxShadow = "0 4px 14px rgba(0,0,0,0.2)";
    stopBtn.style.transition = "all 0.3s ease";

    stopBtn.addEventListener("mouseenter", () => {
      stopBtn.style.transform = "scale(1.05)";
    });
    stopBtn.addEventListener("mouseleave", () => {
      stopBtn.style.transform = "scale(1)";
    });
    stopBtn.addEventListener("click", () => stopRecording());

    recordingBar.appendChild(stopBtn);
  }

  document.body.appendChild(recordingBar);

  const style = document.createElement("style");
  style.textContent = `
    @keyframes pulse {
      0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255,23,68,0.7); }
      70% { transform: scale(1.2); box-shadow: 0 0 0 15px rgba(255,23,68,0); }
      100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255,23,68,0); }
    }
  `;
  document.head.appendChild(style);

  requestAnimationFrame(() => {
    recordingBar.style.bottom = "20px";
  });

  secondsElapsed = 0;
  timerInterval = setInterval(() => {
    secondsElapsed++;
    const m = String(Math.floor(secondsElapsed / 60)).padStart(2, "0");
    const s = String(secondsElapsed % 60).padStart(2, "0");
    timerText.textContent = `Recording... ${m}:${s}`;

    chrome.runtime.sendMessage({ type: "recording-timer", seconds: secondsElapsed });
  }, 1000);
}

function hideRecordingBar() {
  if (recordingBar) {
    recordingBar.style.bottom = "-100px";
    setTimeout(() => {
      if (recordingBar) {
        recordingBar.remove();
        recordingBar = null;
      }
    }, 400);
  }
  clearInterval(timerInterval);
  secondsElapsed = 0;
}

function showSavedPopup() {
  const popup = document.createElement("div");
  popup.style.position = "fixed";
  popup.style.bottom = "-80px";
  popup.style.right = "20px";
  popup.style.padding = "14px 20px";
  popup.style.borderRadius = "16px";
  popup.style.fontSize = "15px";
  popup.style.fontWeight = "600";
  popup.style.color = "#fff";
  popup.style.background = "rgba(67, 233, 123, 0.3)";
  popup.style.backdropFilter = "blur(10px)";
  popup.style.boxShadow = "0 8px 28px rgba(0,0,0,0.25)";
  popup.style.zIndex = "999999";
  popup.style.transition = "all 0.5s ease";
  popup.textContent = "✅ Recording saved successfully";

  document.body.appendChild(popup);

  requestAnimationFrame(() => {
    popup.style.bottom = "20px";
  });

  setTimeout(() => {
    popup.style.bottom = "-80px";
    setTimeout(() => popup.remove(), 500);
  }, 4000);
}

async function startRecording(mode, isManual = false) {
  if (mode === "none") {
    log("🚫 Recording disabled by user.");
    return;
  }

  try {
    let stream;

    if (mode === "audio") {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setupRecorder(stream, isManual);
    } else if (mode === "cameraaudio") {
      stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setupRecorder(stream, isManual);
    } else if (mode === "screen" || mode === "screenaudio") {
      chrome.runtime.sendMessage(
        { type: "start-tab-recording", audio: mode === "screenaudio" },
        (res) => {
          if (res?.ok) {
            showRecordingBar(isManual);
            log("▶️ Tab recording started.");
          } else {
            console.error("❌ Failed to start tab recording.");
          }
        }
      );
      return;
    }
  } catch (err) {
    console.error("❌ Recording error:", err);
  }
}

function setupRecorder(stream, isManual) {
  recorder = new MediaRecorder(stream);
  recorder.stream = stream;
  chunks = [];

  recorder.ondataavailable = (e) => chunks.push(e.data);

  recorder.onstop = () => {
    hideRecordingBar();

    if (chunks.length) {
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `meeting_${Date.now()}.webm`;
      a.click();
      URL.revokeObjectURL(url);
    }

    showSavedPopup();
    chrome.runtime.sendMessage({ type: "recording-stopped" });
  };

  recorder.start();
  showRecordingBar(isManual);
  chrome.runtime.sendMessage({ type: "recording-started" });
  log("▶️ Recording started.");
}

function stopRecording() {
  if (recorder) {
    if (recorder.state === "recording") {
      log("⏹️ Stopping recording...");
      recorder.stop();
    }
    if (recorder.stream) {
      recorder.stream.getTracks().forEach(track => {
        if (track.readyState === "live") track.stop();
      });
    }
    recorder = null;
  } else {
    chrome.runtime.sendMessage({ type: "stop-tab-recording" });
  }

  hideRecordingBar();
  chrome.runtime.sendMessage({ type: "recording-stopped" });
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "manual-start") {
    startRecording("cameraaudio", true);
  }
  if (msg.type === "manual-stop") {
    stopRecording();
  }
});

const observer = new MutationObserver(() => {
  const toolbar = document.querySelector('div[role="toolbar"][aria-label*="Meeting"]');

  if (toolbar && !meetingStarted) {
    meetingStarted = true;
    startTime = new Date();
    log(`Meeting started at: ${startTime.toLocaleString()}`);

    chrome.storage.local.get("recordMode", (data) => {
      const mode = data.recordMode || "cameraaudio";
      if (mode !== "none") startRecording(mode, false);
    });

    chrome.runtime.sendMessage({ type: "meeting-start", time: startTime.toLocaleTimeString() });
  } 
  else if (!toolbar && meetingStarted) {
    meetingStarted = false;
    const endTime = new Date();
    const durationSec = Math.round((endTime - startTime) / 1000);

    log(`Meeting ended at: ${endTime.toLocaleString()}`);
    log(`Duration: ${durationSec} seconds`);

    stopRecording();
    chrome.runtime.sendMessage({ type: "meeting-end", duration: durationSec });
  }
});

observer.observe(document.body, { childList: true, subtree: true });

log("Meeting monitor is running...");






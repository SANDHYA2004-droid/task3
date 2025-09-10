




document.addEventListener("DOMContentLoaded", () => {
  const saveBtn = document.getElementById("save");
  const status = document.getElementById("status");
  const manualControls = document.getElementById("manualControls");
  const manualStart = document.getElementById("manualStart");
  const manualStop = document.getElementById("manualStop");

  let timerInterval;
  let seconds = 0;

  // Load saved mode
  chrome.storage.local.get("recordMode", (data) => {
    const mode = data.recordMode || "screenaudio";
    document.querySelector(`input[value="${mode}"]`).checked = true;
    updateStatus(mode);
  });

  // Save mode
  saveBtn.addEventListener("click", () => {
    const mode = document.querySelector('input[name="mode"]:checked')?.value;
    if (!mode) return alert("Please select a mode!");

    chrome.storage.local.set({ recordMode: mode }, () => {
      updateStatus(mode);
    });
  });

  function updateStatus(mode) {
    clearInterval(timerInterval);
    seconds = 0;
    if (mode === "none") {
      status.textContent = "🚫 Auto-recording disabled.\nUse Start/Stop buttons below.";
      status.className = "status inactive";
      manualControls.style.display = "flex";
      manualStart.disabled = false;
      manualStop.disabled = true;
    } else {
      status.textContent = `✅ Mode set to "${mode.toUpperCase()}".\nRecording starts automatically.`;
      status.className = "status active";
      manualControls.style.display = "none";
    }
  }

  function startTimer() {
    seconds = 0;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      seconds++;
      const m = String(Math.floor(seconds / 60)).padStart(2, "0");
      const s = String(seconds % 60).padStart(2, "0");
      status.textContent = `🔴 Recording... ${m}:${s}`;
      status.className = "status active";
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
    status.textContent = "⏹️ Recording stopped.\nFile saved.";
    status.className = "status neutral";
  }

  // Manual Start Recording
  manualStart.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: "manual-start" });
    });
    manualStart.disabled = true;
    manualStop.disabled = false;
    startTimer();
  });

  // Manual Stop Recording
  manualStop.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: "manual-stop" });
    });
    manualStart.disabled = false;
    manualStop.disabled = true;
    stopTimer();
  });

  // Listen for updates from content.js
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === "recording-timer") {
      const m = String(Math.floor(msg.seconds / 60)).padStart(2, "0");
      const s = String(msg.seconds % 60).padStart(2, "0");
      status.textContent = `🔴 Recording... ${m}:${s}`;
      status.className = "status active";
    }
    if (msg.type === "recording-stopped") {
      stopTimer();
    }
  });
});

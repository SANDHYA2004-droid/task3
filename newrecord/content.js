




// console.log("✅ Teams Monitor content.js loaded!");

// let meetingStarted = false;
// let startTime = null;
// let recorder;
// let chunks = [];
// let recordingBar;
// let timerInterval;

// function log(msg) {
//   console.log(`[Teams Monitor] ${msg}`);
// }

// // 🔴 Show red timer popup while recording
// function showRecordingBar() {
//   if (recordingBar) return;

//   recordingBar = document.createElement("div");
//   recordingBar.style.position = "fixed";
//   recordingBar.style.bottom = "20px";
//   recordingBar.style.right = "20px";
//   recordingBar.style.background = "red";
//   recordingBar.style.color = "white";
//   recordingBar.style.padding = "8px 12px";
//   recordingBar.style.borderRadius = "8px";
//   recordingBar.style.fontSize = "14px";
//   recordingBar.style.zIndex = "999999";
//   recordingBar.textContent = "⏺️ Recording... 00:00";

//   document.body.appendChild(recordingBar);

//   let seconds = 0;
//   timerInterval = setInterval(() => {
//     seconds++;
//     const m = String(Math.floor(seconds / 60)).padStart(2, "0");
//     const s = String(seconds % 60).padStart(2, "0");
//     recordingBar.textContent = `⏺️ Recording... ${m}:${s}`;
//   }, 1000);
// }

// function hideRecordingBar() {
//   if (recordingBar) {
//     recordingBar.remove();
//     recordingBar = null;
//   }
//   clearInterval(timerInterval);
// }

// // 🟢 Show green popup when recording stops
// function showSavedPopup() {
//   const popup = document.createElement("div");
//   popup.style.position = "fixed";
//   popup.style.bottom = "20px";
//   popup.style.right = "20px";
//   popup.style.background = "green";
//   popup.style.color = "white";
//   popup.style.padding = "8px 12px";
//   popup.style.borderRadius = "8px";
//   popup.style.fontSize = "14px";
//   popup.style.zIndex = "999999";
//   popup.textContent = "✅ Recording saved";

//   document.body.appendChild(popup);

//   setTimeout(() => popup.remove(), 4000); // auto hide after 4s
// }

// async function startRecording(mode) {
//   if (mode === "none") {
//     log("🚫 Recording disabled by user.");
//     return;
//   }

//   try {
//     let stream;
//     if (mode === "audio") {
//       stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     } else if (mode === "video") {
//       stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//     } else {
//       stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
//     }

//     recorder = new MediaRecorder(stream);
//     chunks = [];

//     recorder.ondataavailable = (e) => chunks.push(e.data);

//     recorder.onstop = () => {
//       hideRecordingBar();
//       if (chunks.length) {
//         const blob = new Blob(chunks, { type: "video/webm" });
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = `meeting_${Date.now()}.webm`;
//         a.click();
//         URL.revokeObjectURL(url);
//       }
//       showSavedPopup(); // ✅ green popup when saved
//     };

//     recorder.start();
//     showRecordingBar();
//     log("▶️ Recording started.");
//   } catch (err) {
//     console.error("❌ Recording error:", err);
//   }
// }

// function stopRecording() {
//   if (recorder && recorder.state !== "inactive") {
//     recorder.stop();
//     log("⏹️ Recording stopped.");
//   }
// }

// const observer = new MutationObserver(() => {
//   const toolbar = document.querySelector('div[role="toolbar"][aria-label*="Meeting"]');

//   if (toolbar && !meetingStarted) {
//     meetingStarted = true;
//     startTime = new Date();
//     log(`Meeting started at: ${startTime.toLocaleString()}`);

//     chrome.storage.local.get("recordMode", (data) => {
//       const mode = data.recordMode || "audiovideo";
//       startRecording(mode);
//     });

//     chrome.runtime.sendMessage({ type: "meeting-start", time: startTime.toLocaleTimeString() });
//   } 
//   else if (!toolbar && meetingStarted) {
//     meetingStarted = false;
//     const endTime = new Date();
//     const durationSec = Math.round((endTime - startTime) / 1000);

//     log(`Meeting ended at: ${endTime.toLocaleString()}`);
//     log(`Duration: ${durationSec} seconds`);

//     stopRecording();

//     chrome.runtime.sendMessage({ type: "meeting-end", duration: durationSec });
//   }
// });

// observer.observe(document.body, { childList: true, subtree: true });

// log("Meeting monitor is running...");










// console.log("✅ Teams Monitor content.js loaded!");

// let meetingStarted = false;
// let startTime = null;
// let recorder;
// let chunks = [];
// let recordingBar;
// let timerInterval;

// function log(msg) {
//   console.log(`[Teams Monitor] ${msg}`);
// }

// // 🔴 Show red timer popup while recording
// function showRecordingBar() {
//   if (recordingBar) return;

//   recordingBar = document.createElement("div");
//   recordingBar.style.position = "fixed";
//   recordingBar.style.bottom = "20px";
//   recordingBar.style.right = "20px";
//   recordingBar.style.background = "red";
//   recordingBar.style.color = "white";
//   recordingBar.style.padding = "8px 12px";
//   recordingBar.style.borderRadius = "8px";
//   recordingBar.style.fontSize = "14px";
//   recordingBar.style.zIndex = "999999";
//   recordingBar.textContent = "⏺️ Recording... 00:00";

//   document.body.appendChild(recordingBar);

//   let seconds = 0;
//   timerInterval = setInterval(() => {
//     seconds++;
//     const m = String(Math.floor(seconds / 60)).padStart(2, "0");
//     const s = String(seconds % 60).padStart(2, "0");
//     recordingBar.textContent = `⏺️ Recording... ${m}:${s}`;
//   }, 1000);
// }

// function hideRecordingBar() {
//   if (recordingBar) {
//     recordingBar.remove();
//     recordingBar = null;
//   }
//   clearInterval(timerInterval);
// }

// // 🟢 Show green popup when recording stops
// function showSavedPopup() {
//   const popup = document.createElement("div");
//   popup.style.position = "fixed";
//   popup.style.bottom = "20px";
//   popup.style.right = "20px";
//   popup.style.background = "green";
//   popup.style.color = "white";
//   popup.style.padding = "8px 12px";
//   popup.style.borderRadius = "8px";
//   popup.style.fontSize = "14px";
//   popup.style.zIndex = "999999";
//   popup.textContent = "✅ Recording saved";

//   document.body.appendChild(popup);

//   setTimeout(() => popup.remove(), 4000); // auto hide after 4s
// }

// async function startRecording(mode) {
//   if (mode === "none") {
//     log("🚫 Recording disabled by user.");
//     return;
//   }

//   try {
//     let stream;
//     if (mode === "audio") {
//       stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     } else if (mode === "video") {
//       stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//     } else {
//       stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
//     }

//     recorder = new MediaRecorder(stream);
//     chunks = [];

//     recorder.ondataavailable = (e) => chunks.push(e.data);

//     recorder.onstop = () => {
//       hideRecordingBar();
//       if (chunks.length) {
//         const blob = new Blob(chunks, { type: "video/webm" });
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = `meeting_${Date.now()}.webm`;
//         a.click();
//         URL.revokeObjectURL(url);
//       }
//       showSavedPopup(); // ✅ green popup when saved
//     };

//     recorder.start();
//     showRecordingBar();
//     log("▶️ Recording started.");
//   } catch (err) {
//     console.error("❌ Recording error:", err);
//   }
// }

// function stopRecording() {
//   if (recorder && recorder.state !== "inactive") {
//     recorder.stop();
//     log("⏹️ Recording stopped.");
//   }
// }

// const observer = new MutationObserver(() => {
//   const toolbar = document.querySelector('div[role="toolbar"][aria-label*="Meeting"]');

//   if (toolbar && !meetingStarted) {
//     meetingStarted = true;
//     startTime = new Date();
//     log(`Meeting started at: ${startTime.toLocaleString()}`);

//     chrome.storage.local.get("recordMode", (data) => {
//       const mode = data.recordMode || "audiovideo";
//       startRecording(mode);
//     });

//     chrome.runtime.sendMessage({ type: "meeting-start", time: startTime.toLocaleTimeString() });
//   } 
//   else if (!toolbar && meetingStarted) {
//     meetingStarted = false;
//     const endTime = new Date();
//     const durationSec = Math.round((endTime - startTime) / 1000);

//     log(`Meeting ended at: ${endTime.toLocaleString()}`);
//     log(`Duration: ${durationSec} seconds`);

//     stopRecording();

//     chrome.runtime.sendMessage({ type: "meeting-end", duration: durationSec });
//   }
// });

// observer.observe(document.body, { childList: true, subtree: true });

// log("Meeting monitor is running...");




// console.log("✅ Teams Monitor content.js loaded!");

// let meetingStarted = false;
// let startTime = null;
// let recorder;
// let chunks = [];
// let recordingBar;
// let timerInterval;
// let secondsElapsed = 0;

// function log(msg) {
//   console.log(`[Teams Monitor] ${msg}`);
// }

// // 🔴 Show red timer popup while recording
// function showRecordingBar() {
//   if (recordingBar) return;

//   recordingBar = document.createElement("div");
//   recordingBar.style.position = "fixed";
//   recordingBar.style.bottom = "20px";
//   recordingBar.style.right = "20px";
//   recordingBar.style.background = "red";
//   recordingBar.style.color = "white";
//   recordingBar.style.padding = "8px 12px";
//   recordingBar.style.borderRadius = "8px";
//   recordingBar.style.fontSize = "14px";
//   recordingBar.style.zIndex = "999999";
//   recordingBar.textContent = "⏺️ Recording... 00:00";

//   document.body.appendChild(recordingBar);

//   secondsElapsed = 0;
//   timerInterval = setInterval(() => {
//     secondsElapsed++;
//     const m = String(Math.floor(secondsElapsed / 60)).padStart(2, "0");
//     const s = String(secondsElapsed % 60).padStart(2, "0");
//     recordingBar.textContent = `⏺️ Recording... ${m}:${s}`;

//     // 🔄 Send timer updates to popup
//     chrome.runtime.sendMessage({ type: "recording-timer", seconds: secondsElapsed });
//   }, 1000);
// }

// function hideRecordingBar() {
//   if (recordingBar) {
//     recordingBar.remove();
//     recordingBar = null;
//   }
//   clearInterval(timerInterval);
//   secondsElapsed = 0;
// }

// // 🟢 Show green popup when recording stops
// function showSavedPopup() {
//   const popup = document.createElement("div");
//   popup.style.position = "fixed";
//   popup.style.bottom = "20px";
//   popup.style.right = "20px";
//   popup.style.background = "green";
//   popup.style.color = "white";
//   popup.style.padding = "8px 12px";
//   popup.style.borderRadius = "8px";
//   popup.style.fontSize = "14px";
//   popup.style.zIndex = "999999";
//   popup.textContent = "✅ Recording saved";

//   document.body.appendChild(popup);

//   setTimeout(() => popup.remove(), 4000); // auto hide after 4s
// }

// async function startRecording(mode) {
//   if (mode === "none") {
//     log("🚫 Recording disabled by user.");
//     return;
//   }

//   try {
//     let stream;
//     if (mode === "audio") {
//       stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     } else if (mode === "video") {
//       stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//     } else {
//       // audiovideo or manual-start fallback
//       stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
//     }

//     recorder = new MediaRecorder(stream);
//     chunks = [];

//     recorder.ondataavailable = (e) => chunks.push(e.data);

//     recorder.onstop = () => {
//       hideRecordingBar();
//       if (chunks.length) {
//         const blob = new Blob(chunks, { type: "video/webm" });
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = `meeting_${Date.now()}.webm`;
//         a.click();
//         URL.revokeObjectURL(url);
//       }
//       showSavedPopup(); // ✅ green popup when saved

//       // Let popup know recording stopped
//       chrome.runtime.sendMessage({ type: "recording-stopped" });
//     };

//     recorder.start();
//     showRecordingBar();

//     // Let popup know recording started
//     chrome.runtime.sendMessage({ type: "recording-started" });

//     log("▶️ Recording started.");
//   } catch (err) {
//     console.error("❌ Recording error:", err);
//   }
// }

// function stopRecording() {
//   if (recorder && recorder.state !== "inactive") {
//     recorder.stop();
//     log("⏹️ Recording stopped.");
//   }
// }

// // 🔹 Listen for manual start/stop from popup
// chrome.runtime.onMessage.addListener((msg) => {
//   if (msg.type === "manual-start") {
//     // Always record audio+video for manual mode
//     startRecording("audiovideo");
//   }
//   if (msg.type === "manual-stop") {
//     stopRecording();
//   }
// });

// // 🔹 Auto-detect meeting start/end
// const observer = new MutationObserver(() => {
//   const toolbar = document.querySelector('div[role="toolbar"][aria-label*="Meeting"]');

//   if (toolbar && !meetingStarted) {
//     meetingStarted = true;
//     startTime = new Date();
//     log(`Meeting started at: ${startTime.toLocaleString()}`);

//     chrome.storage.local.get("recordMode", (data) => {
//       const mode = data.recordMode || "audiovideo";
//       if (mode !== "none") startRecording(mode);
//     });

//     chrome.runtime.sendMessage({ type: "meeting-start", time: startTime.toLocaleTimeString() });
//   } 
//   else if (!toolbar && meetingStarted) {
//     meetingStarted = false;
//     const endTime = new Date();
//     const durationSec = Math.round((endTime - startTime) / 1000);

//     log(`Meeting ended at: ${endTime.toLocaleString()}`);
//     log(`Duration: ${durationSec} seconds`);

//     stopRecording();

//     chrome.runtime.sendMessage({ type: "meeting-end", duration: durationSec });
//   }
// });

// observer.observe(document.body, { childList: true, subtree: true });

// log("Meeting monitor is running...");




// console.log("✅ Teams Monitor content.js loaded!");

// let meetingStarted = false;
// let startTime = null;
// let recorder;
// let chunks = [];
// let recordingBar;
// let timerInterval;
// let secondsElapsed = 0;

// function log(msg) {
//   console.log(`[Teams Monitor] ${msg}`);
// }

// // 🔴 Show red timer popup while recording
// function showRecordingBar() {
//   if (recordingBar) return;

//   recordingBar = document.createElement("div");
//   recordingBar.style.position = "fixed";
//   recordingBar.style.bottom = "20px";
//   recordingBar.style.right = "20px";
//   recordingBar.style.background = "red";
//   recordingBar.style.color = "white";
//   recordingBar.style.padding = "8px 12px";
//   recordingBar.style.borderRadius = "8px";
//   recordingBar.style.fontSize = "14px";
//   recordingBar.style.zIndex = "999999";
//   recordingBar.textContent = "⏺️ Recording... 00:00";

//   document.body.appendChild(recordingBar);

//   secondsElapsed = 0;
//   timerInterval = setInterval(() => {
//     secondsElapsed++;
//     const m = String(Math.floor(secondsElapsed / 60)).padStart(2, "0");
//     const s = String(secondsElapsed % 60).padStart(2, "0");
//     recordingBar.textContent = `⏺️ Recording... ${m}:${s}`;

//     // 🔄 Send timer updates to popup
//     chrome.runtime.sendMessage({ type: "recording-timer", seconds: secondsElapsed });
//   }, 1000);
// }

// function hideRecordingBar() {
//   if (recordingBar) {
//     recordingBar.remove();
//     recordingBar = null;
//   }
//   clearInterval(timerInterval);
//   secondsElapsed = 0;
// }

// // 🟢 Show green popup when recording stops
// function showSavedPopup() {
//   const popup = document.createElement("div");
//   popup.style.position = "fixed";
//   popup.style.bottom = "20px";
//   popup.style.right = "20px";
//   popup.style.background = "green";
//   popup.style.color = "white";
//   popup.style.padding = "8px 12px";
//   popup.style.borderRadius = "8px";
//   popup.style.fontSize = "14px";
//   popup.style.zIndex = "999999";
//   popup.textContent = "✅ Recording saved";

//   document.body.appendChild(popup);

//   setTimeout(() => popup.remove(), 4000); // auto hide after 4s
// }

// async function startRecording(mode) {
//   if (mode === "none") {
//     log("🚫 Recording disabled by user.");
//     return;
//   }

//   try {
//     let stream;
//     if (mode === "audio") {
//       stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     } else if (mode === "video") {
//       stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//     } else {
//       // audiovideo or manual-start fallback
//       stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
//     }

//     recorder = new MediaRecorder(stream);
//     recorder.stream = stream;   // ✅ save stream for stopping
//     chunks = [];

//     recorder.ondataavailable = (e) => chunks.push(e.data);

//     recorder.onstop = () => {
//       hideRecordingBar();

//       if (chunks.length) {
//         const blob = new Blob(chunks, { type: "video/webm" });
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = `meeting_${Date.now()}.webm`;
//         a.click();
//         URL.revokeObjectURL(url);
//       }

//       showSavedPopup();

//       // Notify popup
//       chrome.runtime.sendMessage({ type: "recording-stopped" });
//     };

//     recorder.start();
//     showRecordingBar();

//     // Notify popup
//     chrome.runtime.sendMessage({ type: "recording-started" });

//     log("▶️ Recording started.");
//   } catch (err) {
//     console.error("❌ Recording error:", err);
//   }
// }

// function stopRecording() {
//   if (recorder && recorder.state === "recording") {
//     log("⏹️ Stopping recording...");

//     recorder.stop();

//     // ✅ Ensure all tracks are stopped
//     if (recorder.stream) {
//       recorder.stream.getTracks().forEach(track => track.stop());
//     }

//     hideRecordingBar();
//     chrome.runtime.sendMessage({ type: "recording-stopped" });
//   } else {
//     log("⚠️ No active recording to stop.");
//   }
// }

// // 🔹 Listen for manual start/stop from popup
// chrome.runtime.onMessage.addListener((msg) => {
//   if (msg.type === "manual-start") {
//     startRecording("audiovideo");
//   }
//   if (msg.type === "manual-stop") {
//     stopRecording();
//   }
// });

// // 🔹 Auto-detect meeting start/end
// const observer = new MutationObserver(() => {
//   const toolbar = document.querySelector('div[role="toolbar"][aria-label*="Meeting"]');

//   if (toolbar && !meetingStarted) {
//     meetingStarted = true;
//     startTime = new Date();
//     log(`Meeting started at: ${startTime.toLocaleString()}`);

//     chrome.storage.local.get("recordMode", (data) => {
//       const mode = data.recordMode || "audiovideo";
//       if (mode !== "none") startRecording(mode);
//     });

//     chrome.runtime.sendMessage({ type: "meeting-start", time: startTime.toLocaleTimeString() });
//   } 
//   else if (!toolbar && meetingStarted) {
//     meetingStarted = false;
//     const endTime = new Date();
//     const durationSec = Math.round((endTime - startTime) / 1000);

//     log(`Meeting ended at: ${endTime.toLocaleString()}`);
//     log(`Duration: ${durationSec} seconds`);

//     stopRecording();

//     chrome.runtime.sendMessage({ type: "meeting-end", duration: durationSec });
//   }
// });

// observer.observe(document.body, { childList: true, subtree: true });

// log("Meeting monitor is running...");




// console.log("✅ Teams Monitor content.js loaded!");

// let meetingStarted = false;
// let startTime = null;
// let recorder;
// let chunks = [];
// let recordingBar;
// let timerInterval;
// let secondsElapsed = 0;

// function log(msg) {
//   console.log(`[Teams Monitor] ${msg}`);
// }

// // 🔴 Show red timer popup while recording
// function showRecordingBar(showStopButton = false) {
//   if (recordingBar) return;

//   recordingBar = document.createElement("div");
//   recordingBar.style.position = "fixed";
//   recordingBar.style.bottom = "20px";
//   recordingBar.style.right = "20px";
//   recordingBar.style.background = "#d32f2f";
//   recordingBar.style.color = "white";
//   recordingBar.style.padding = "10px 14px";
//   recordingBar.style.borderRadius = "10px";
//   recordingBar.style.fontSize = "14px";
//   recordingBar.style.fontWeight = "bold";
//   recordingBar.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
//   recordingBar.style.zIndex = "999999";
//   recordingBar.style.display = "flex";
//   recordingBar.style.alignItems = "center";
//   recordingBar.style.gap = "10px";

//   // Timer text
//   const timerText = document.createElement("span");
//   timerText.textContent = "⏺️ Recording... 00:00";
//   recordingBar.appendChild(timerText);

//   // ⏹ Stop button only if manual recording
//   if (showStopButton) {
//     const stopBtn = document.createElement("button");
//     stopBtn.textContent = "⏹ Stop";
//     stopBtn.style.background = "#ffffff22";
//     stopBtn.style.border = "1px solid #fff";
//     stopBtn.style.borderRadius = "6px";
//     stopBtn.style.color = "white";
//     stopBtn.style.padding = "4px 8px";
//     stopBtn.style.cursor = "pointer";
//     stopBtn.style.fontSize = "12px";
//     stopBtn.style.fontWeight = "bold";

//     stopBtn.addEventListener("mouseenter", () => {
//       stopBtn.style.background = "#b71c1c";
//     });
//     stopBtn.addEventListener("mouseleave", () => {
//       stopBtn.style.background = "#ffffff22";
//     });

//     stopBtn.addEventListener("click", () => {
//       stopRecording();
//     });

//     recordingBar.appendChild(stopBtn);
//   }

//   document.body.appendChild(recordingBar);

//   // Timer logic
//   secondsElapsed = 0;
//   timerInterval = setInterval(() => {
//     secondsElapsed++;
//     const m = String(Math.floor(secondsElapsed / 60)).padStart(2, "0");
//     const s = String(secondsElapsed % 60).padStart(2, "0");
//     timerText.textContent = `⏺️ Recording... ${m}:${s}`;

//     // 🔄 Send timer updates to popup
//     chrome.runtime.sendMessage({ type: "recording-timer", seconds: secondsElapsed });
//   }, 1000);
// }

// function hideRecordingBar() {
//   if (recordingBar) {
//     recordingBar.remove();
//     recordingBar = null;
//   }
//   clearInterval(timerInterval);
//   secondsElapsed = 0;
// }

// // 🟢 Show green popup when recording stops
// function showSavedPopup() {
//   const popup = document.createElement("div");
//   popup.style.position = "fixed";
//   popup.style.bottom = "20px";
//   popup.style.right = "20px";
//   popup.style.background = "#388e3c";
//   popup.style.color = "white";
//   popup.style.padding = "10px 14px";
//   popup.style.borderRadius = "10px";
//   popup.style.fontSize = "14px";
//   popup.style.fontWeight = "bold";
//   popup.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
//   popup.style.zIndex = "999999";
//   popup.textContent = "✅ Recording saved";

//   document.body.appendChild(popup);

//   setTimeout(() => popup.remove(), 4000); // auto hide after 4s
// }

// async function startRecording(mode, isManual = false) {
//   if (mode === "none") {
//     log("🚫 Recording disabled by user.");
//     return;
//   }

//   try {
//     let stream;
//     if (mode === "audio") {
//       stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     } else if (mode === "video") {
//       stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//     } else {
//       // audiovideo or manual-start fallback
//       stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
//     }

//     recorder = new MediaRecorder(stream);
//     recorder.stream = stream;   // ✅ save stream for manual stop
//     chunks = [];

//     recorder.ondataavailable = (e) => chunks.push(e.data);

//     recorder.onstop = () => {
//       hideRecordingBar();

//       if (chunks.length) {
//         const blob = new Blob(chunks, { type: "video/webm" });
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = `meeting_${Date.now()}.webm`;
//         a.click();
//         URL.revokeObjectURL(url);
//       }

//       showSavedPopup();

//       // Notify popup
//       chrome.runtime.sendMessage({ type: "recording-stopped" });
//     };

//     recorder.start();

//     // 🔹 show stop button only for manual recordings
//     showRecordingBar(isManual);

//     // Notify popup
//     chrome.runtime.sendMessage({ type: "recording-started" });

//     log("▶️ Recording started.");
//   } catch (err) {
//     console.error("❌ Recording error:", err);
//   }
// }

// function stopRecording() {
//   if (recorder && recorder.state === "recording") {
//     log("⏹️ Stopping recording...");

//     recorder.stop();

//     // ✅ Immediately stop all tracks so Chrome finalizes recording
//     if (recorder.stream) {
//       recorder.stream.getTracks().forEach(track => track.stop());
//     }

//     hideRecordingBar();
//     chrome.runtime.sendMessage({ type: "recording-stopped" });
//   } else {
//     log("⚠️ No active recording to stop.");
//   }
// }

// // 🔹 Listen for manual start/stop from popup
// chrome.runtime.onMessage.addListener((msg) => {
//   if (msg.type === "manual-start") {
//     startRecording("audiovideo", true); // ✅ pass true to show stop button
//   }
//   if (msg.type === "manual-stop") {
//     stopRecording();
//   }
// });

// // 🔹 Auto-detect meeting start/end
// const observer = new MutationObserver(() => {
//   const toolbar = document.querySelector('div[role="toolbar"][aria-label*="Meeting"]');

//   if (toolbar && !meetingStarted) {
//     meetingStarted = true;
//     startTime = new Date();
//     log(`Meeting started at: ${startTime.toLocaleString()}`);

//     chrome.storage.local.get("recordMode", (data) => {
//       const mode = data.recordMode || "audiovideo";
//       if (mode !== "none") startRecording(mode, false); // auto mode → no stop button
//     });

//     chrome.runtime.sendMessage({ type: "meeting-start", time: startTime.toLocaleTimeString() });
//   } 
//   else if (!toolbar && meetingStarted) {
//     meetingStarted = false;
//     const endTime = new Date();
//     const durationSec = Math.round((endTime - startTime) / 1000);

//     log(`Meeting ended at: ${endTime.toLocaleString()}`);
//     log(`Duration: ${durationSec} seconds`);

//     stopRecording();

//     chrome.runtime.sendMessage({ type: "meeting-end", duration: durationSec });
//   }
// });

// observer.observe(document.body, { childList: true, subtree: true });

// log("Meeting monitor is running...");




// console.log("✅ Teams Monitor content.js loaded!");

// let meetingStarted = false;
// let startTime = null;
// let recorder;
// let chunks = [];
// let recordingBar;
// let timerInterval;
// let secondsElapsed = 0;

// function log(msg) {
//   console.log(`[Teams Monitor] ${msg}`);
// }

// // 🔴 Show red timer popup while recording (animated, with optional Stop button)
// function showRecordingBar(showStopButton = false) {
//   if (recordingBar) return;

//   recordingBar = document.createElement("div");
//   recordingBar.style.position = "fixed";
//   recordingBar.style.bottom = "-80px"; // start hidden below screen
//   recordingBar.style.right = "20px";
//   recordingBar.style.background = "#d32f2f";
//   recordingBar.style.color = "white";
//   recordingBar.style.padding = "10px 14px";
//   recordingBar.style.borderRadius = "10px";
//   recordingBar.style.fontSize = "14px";
//   recordingBar.style.fontWeight = "bold";
//   recordingBar.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
//   recordingBar.style.zIndex = "999999";
//   recordingBar.style.display = "flex";
//   recordingBar.style.alignItems = "center";
//   recordingBar.style.gap = "10px";
//   recordingBar.style.transition = "all 0.4s ease";

//   // Timer text
//   const timerText = document.createElement("span");
//   timerText.textContent = "⏺️ Recording... 00:00";
//   recordingBar.appendChild(timerText);

//   // ⏹ Stop button only if manual recording
//   if (showStopButton) {
//     const stopBtn = document.createElement("button");
//     stopBtn.textContent = "⏹ Stop";
//     stopBtn.style.background = "#ffffff22";
//     stopBtn.style.border = "1px solid #fff";
//     stopBtn.style.borderRadius = "6px";
//     stopBtn.style.color = "white";
//     stopBtn.style.padding = "4px 10px";
//     stopBtn.style.cursor = "pointer";
//     stopBtn.style.fontSize = "12px";
//     stopBtn.style.fontWeight = "bold";
//     stopBtn.style.transition = "background 0.3s ease";

//     stopBtn.addEventListener("mouseenter", () => {
//       stopBtn.style.background = "#b71c1c";
//     });
//     stopBtn.addEventListener("mouseleave", () => {
//       stopBtn.style.background = "#ffffff22";
//     });

//     stopBtn.addEventListener("click", () => {
//       stopRecording();
//     });

//     recordingBar.appendChild(stopBtn);
//   }

//   document.body.appendChild(recordingBar);

//   // Slide-in animation
//   requestAnimationFrame(() => {
//     recordingBar.style.bottom = "20px";
//   });

//   // Timer logic
//   secondsElapsed = 0;
//   timerInterval = setInterval(() => {
//     secondsElapsed++;
//     const m = String(Math.floor(secondsElapsed / 60)).padStart(2, "0");
//     const s = String(secondsElapsed % 60).padStart(2, "0");
//     timerText.textContent = `⏺️ Recording... ${m}:${s}`;

//     // 🔄 Send timer updates to popup
//     chrome.runtime.sendMessage({ type: "recording-timer", seconds: secondsElapsed });
//   }, 1000);
// }

// function hideRecordingBar() {
//   if (recordingBar) {
//     // Slide-out animation
//     recordingBar.style.bottom = "-80px";
//     setTimeout(() => {
//       if (recordingBar) {
//         recordingBar.remove();
//         recordingBar = null;
//       }
//     }, 400);
//   }
//   clearInterval(timerInterval);
//   secondsElapsed = 0;
// }

// // 🟢 Show green popup when recording stops (animated)
// function showSavedPopup() {
//   const popup = document.createElement("div");
//   popup.style.position = "fixed";
//   popup.style.bottom = "-60px";
//   popup.style.right = "20px";
//   popup.style.background = "#388e3c";
//   popup.style.color = "white";
//   popup.style.padding = "10px 14px";
//   popup.style.borderRadius = "10px";
//   popup.style.fontSize = "14px";
//   popup.style.fontWeight = "bold";
//   popup.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
//   popup.style.zIndex = "999999";
//   popup.style.transition = "all 0.4s ease";
//   popup.textContent = "✅ Recording saved";

//   document.body.appendChild(popup);

//   // Slide in
//   requestAnimationFrame(() => {
//     popup.style.bottom = "20px";
//   });

//   // Slide out
//   setTimeout(() => {
//     popup.style.bottom = "-60px";
//     setTimeout(() => popup.remove(), 400);
//   }, 4000);
// }

// async function startRecording(mode, isManual = false) {
//   if (mode === "none") {
//     log("🚫 Recording disabled by user.");
//     return;
//   }

//   try {
//     let stream;
//     if (mode === "audio") {
//       stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     } else if (mode === "video") {
//       stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//     } else {
//       stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
//     }

//     recorder = new MediaRecorder(stream);
//     recorder.stream = stream;
//     chunks = [];

//     recorder.ondataavailable = (e) => chunks.push(e.data);

//     recorder.onstop = () => {
//       hideRecordingBar();

//       if (chunks.length) {
//         const blob = new Blob(chunks, { type: "video/webm" });
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = `meeting_${Date.now()}.webm`;
//         a.click();
//         URL.revokeObjectURL(url);
//       }

//       showSavedPopup();

//       chrome.runtime.sendMessage({ type: "recording-stopped" });
//     };

//     recorder.start();
//     showRecordingBar(isManual);

//     chrome.runtime.sendMessage({ type: "recording-started" });

//     log("▶️ Recording started.");
//   } catch (err) {
//     console.error("❌ Recording error:", err);
//   }
// }

// function stopRecording() {
//   if (recorder && recorder.state === "recording") {
//     log("⏹️ Stopping recording...");

//     recorder.stop();

//     if (recorder.stream) {
//       recorder.stream.getTracks().forEach(track => track.stop());
//     }

//     hideRecordingBar();
//     chrome.runtime.sendMessage({ type: "recording-stopped" });
//   } else {
//     log("⚠️ No active recording to stop.");
//   }
// }

// // 🔹 Listen for manual start/stop from popup
// chrome.runtime.onMessage.addListener((msg) => {
//   if (msg.type === "manual-start") {
//     startRecording("audiovideo", true); // ✅ show Stop button
//   }
//   if (msg.type === "manual-stop") {
//     stopRecording();
//   }
// });

// // 🔹 Auto-detect meeting start/end
// const observer = new MutationObserver(() => {
//   const toolbar = document.querySelector('div[role="toolbar"][aria-label*="Meeting"]');

//   if (toolbar && !meetingStarted) {
//     meetingStarted = true;
//     startTime = new Date();
//     log(`Meeting started at: ${startTime.toLocaleString()}`);

//     chrome.storage.local.get("recordMode", (data) => {
//       const mode = data.recordMode || "audiovideo";
//       if (mode !== "none") startRecording(mode, false); // auto → no Stop button
//     });

//     chrome.runtime.sendMessage({ type: "meeting-start", time: startTime.toLocaleTimeString() });
//   } 
//   else if (!toolbar && meetingStarted) {
//     meetingStarted = false;
//     const endTime = new Date();
//     const durationSec = Math.round((endTime - startTime) / 1000);

//     log(`Meeting ended at: ${endTime.toLocaleString()}`);
//     log(`Duration: ${durationSec} seconds`);

//     stopRecording();

//     chrome.runtime.sendMessage({ type: "meeting-end", duration: durationSec });
//   }
// });

// observer.observe(document.body, { childList: true, subtree: true });

// log("Meeting monitor is running...");






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

// 🔴 Show red timer popup while recording (animated, with optional Stop button)
function showRecordingBar(showStopButton = false) {
  if (recordingBar) return;

  recordingBar = document.createElement("div");
  recordingBar.style.position = "fixed";
  recordingBar.style.bottom = "-80px"; // start hidden below screen
  recordingBar.style.right = "20px";
  recordingBar.style.background = "#d32f2f";
  recordingBar.style.color = "white";
  recordingBar.style.padding = "10px 14px";
  recordingBar.style.borderRadius = "10px";
  recordingBar.style.fontSize = "14px";
  recordingBar.style.fontWeight = "bold";
  recordingBar.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
  recordingBar.style.zIndex = "999999";
  recordingBar.style.display = "flex";
  recordingBar.style.alignItems = "center";
  recordingBar.style.gap = "10px";
  recordingBar.style.transition = "all 0.4s ease";

  // Timer text
  const timerText = document.createElement("span");
  timerText.textContent = "⏺️ Recording... 00:00";
  recordingBar.appendChild(timerText);

  // ⏹ Stop button only if manual recording
  if (showStopButton) {
    const stopBtn = document.createElement("button");
    stopBtn.textContent = "⏹ Stop";
    stopBtn.style.background = "#ffffff22";
    stopBtn.style.border = "1px solid #fff";
    stopBtn.style.borderRadius = "6px";
    stopBtn.style.color = "white";
    stopBtn.style.padding = "4px 10px";
    stopBtn.style.cursor = "pointer";
    stopBtn.style.fontSize = "12px";
    stopBtn.style.fontWeight = "bold";
    stopBtn.style.transition = "background 0.3s ease";

    stopBtn.addEventListener("mouseenter", () => {
      stopBtn.style.background = "#b71c1c";
    });
    stopBtn.addEventListener("mouseleave", () => {
      stopBtn.style.background = "#ffffff22";
    });

    stopBtn.addEventListener("click", () => {
      stopRecording();
    });

    recordingBar.appendChild(stopBtn);
  }

  document.body.appendChild(recordingBar);

  // Slide-in animation
  requestAnimationFrame(() => {
    recordingBar.style.bottom = "20px";
  });

  // Timer logic
  secondsElapsed = 0;
  timerInterval = setInterval(() => {
    secondsElapsed++;
    const m = String(Math.floor(secondsElapsed / 60)).padStart(2, "0");
    const s = String(secondsElapsed % 60).padStart(2, "0");
    timerText.textContent = `⏺️ Recording... ${m}:${s}`;

    // 🔄 Send timer updates to popup
    chrome.runtime.sendMessage({ type: "recording-timer", seconds: secondsElapsed });
  }, 1000);
}

function hideRecordingBar() {
  if (recordingBar) {
    // Slide-out animation
    recordingBar.style.bottom = "-80px";
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

// 🟢 Show green popup when recording stops (animated)
function showSavedPopup() {
  const popup = document.createElement("div");
  popup.style.position = "fixed";
  popup.style.bottom = "-60px";
  popup.style.right = "20px";
  popup.style.background = "#388e3c";
  popup.style.color = "white";
  popup.style.padding = "10px 14px";
  popup.style.borderRadius = "10px";
  popup.style.fontSize = "14px";
  popup.style.fontWeight = "bold";
  popup.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
  popup.style.zIndex = "999999";
  popup.style.transition = "all 0.4s ease";
  popup.textContent = "✅ Recording saved";

  document.body.appendChild(popup);

  // Slide in
  requestAnimationFrame(() => {
    popup.style.bottom = "20px";
  });

  // Slide out
  setTimeout(() => {
    popup.style.bottom = "-60px";
    setTimeout(() => popup.remove(), 400);
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
    } else if (mode === "video") {
      stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    } else {
      stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
    }

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
  } catch (err) {
    console.error("❌ Recording error:", err);
  }
}

function stopRecording() {
  if (recorder) {
    if (recorder.state === "recording") {
      log("⏹️ Stopping recording...");
      recorder.stop();
    } else {
      log("⚠️ Recorder not in recording state, forcing cleanup.");
    }

    // ✅ Always stop all tracks to finalize recording
    if (recorder.stream) {
      recorder.stream.getTracks().forEach(track => {
        if (track.readyState === "live") {
          track.stop();
        }
      });
    }

    hideRecordingBar();
    chrome.runtime.sendMessage({ type: "recording-stopped" });

    // Clear reference
    recorder = null;
  } else {
    log("⚠️ No active recorder found.");
  }
}

// 🔹 Listen for manual start/stop from popup
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "manual-start") {
    startRecording("audiovideo", true); // ✅ show Stop button
  }
  if (msg.type === "manual-stop") {
    stopRecording();
  }
});

// 🔹 Auto-detect meeting start/end
const observer = new MutationObserver(() => {
  const toolbar = document.querySelector('div[role="toolbar"][aria-label*="Meeting"]');

  if (toolbar && !meetingStarted) {
    meetingStarted = true;
    startTime = new Date();
    log(`Meeting started at: ${startTime.toLocaleString()}`);

    chrome.storage.local.get("recordMode", (data) => {
      const mode = data.recordMode || "audiovideo";
      if (mode !== "none") startRecording(mode, false); // auto → no Stop button
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

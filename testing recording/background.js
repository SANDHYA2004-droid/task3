// console.log("✅ Background script loaded!");

// let recorder;
// let chunks = [];
// let timerInterval;
// let secondsElapsed = 0;

// function stopTracks(stream) {
//   if (stream) {
//     stream.getTracks().forEach(track => {
//       if (track.readyState === "live") track.stop();
//     });
//   }
// }

// chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//   console.log("📩 Background received:", msg);

//   if (msg.type === "meeting-start") {
//     chrome.notifications.create("meeting-start-" + Date.now(), {
//       type: "basic",
//       iconUrl: "icon.png",
//       title: "Teams Meeting Started",
//       message: `Started at ${msg.time}`
//     });

//     chrome.storage.local.get("recordMode", (data) => {
//       sendResponse({ recordMode: data.recordMode || "audiovideo" });
//     });
//     return true;
//   }

//   if (msg.type === "meeting-end") {
//     chrome.notifications.create("meeting-end-" + Date.now(), {
//       type: "basic",
//       iconUrl: "icon.png",
//       title: "Teams Meeting Ended",
//       message: `Duration: ${msg.duration} seconds`
//     });

//     if (recorder && recorder.state === "recording") {
//       recorder.stop();
//     }
//     return true;
//   }

//   // ✅ Start tab recording (force-focus Teams tab first)
//   if (msg.type === "start-tab-recording") {
//     const tabId = sender.tab?.id;
//     if (!tabId) {
//       console.error("❌ No tabId from sender, cannot record.");
//       sendResponse({ ok: false });
//       return true;
//     }

//     // Bring Teams tab to front
//     chrome.tabs.update(tabId, { active: true }, () => {
//       // Wait a tiny bit so Chrome registers it as active
//       setTimeout(() => {
//         chrome.tabCapture.capture(
//           { audio: msg.audio || false, video: true },
//           (stream) => {
//             if (chrome.runtime.lastError || !stream) {
//               console.error("❌ Tab capture error:", chrome.runtime.lastError);
//               sendResponse({ ok: false });
//               return;
//             }

//             chunks = [];
//             recorder = new MediaRecorder(stream);

//             recorder.ondataavailable = (e) => chunks.push(e.data);

//             recorder.onstop = () => {
//               stopTracks(stream);
//               clearInterval(timerInterval);

//               if (chunks.length) {
//                 const blob = new Blob(chunks, { type: "video/webm" });
//                 const url = URL.createObjectURL(blob);

//                 const a = document.createElement("a");
//                 a.href = url;
//                 a.download = `meeting_${Date.now()}.webm`;
//                 a.click();
//                 URL.revokeObjectURL(url);
//               }

//               chrome.runtime.sendMessage({ type: "recording-stopped" });
//             };

//             recorder.start();

//             // Timer updates
//             secondsElapsed = 0;
//             timerInterval = setInterval(() => {
//               secondsElapsed++;
//               chrome.runtime.sendMessage({ type: "recording-timer", seconds: secondsElapsed });
//             }, 1000);

//             chrome.runtime.sendMessage({ type: "recording-started" });
//             sendResponse({ ok: true });
//           }
//         );
//       }, 500); // give Chrome ~0.5s to make tab active
//     });

//     return true; // keep sendResponse alive
//   }

//   if (msg.type === "stop-tab-recording") {
//     if (recorder && recorder.state === "recording") {
//       recorder.stop();
//     }
//     sendResponse({ ok: true });
//     return true;
//   }
// });








console.log("✅ Background script loaded!");

let recorder;
let chunks = [];
let timerInterval;
let secondsElapsed = 0;

// Stop all tracks from a stream
function stopTracks(stream) {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }
}

// 🔹 Auto-detect Teams tab and record
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    if (tab.url.includes("teams.microsoft.com")) {
      console.log("💻 Teams meeting tab detected, starting auto-record...");

      chrome.tabCapture.capture({ audio: true, video: true }, (stream) => {
        if (!stream) {
          console.error("❌ Capture failed:", chrome.runtime.lastError);
          return;
        }

        chunks = [];
        recorder = new MediaRecorder(stream, { mimeType: "video/webm" });

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunks.push(e.data);
        };

        recorder.onstop = () => {
          stopTracks(stream);
          clearInterval(timerInterval);

          if (chunks.length) {
            const blob = new Blob(chunks, { type: "video/webm" });
            const url = URL.createObjectURL(blob);

            // Save automatically
            chrome.downloads.download({
              url: url,
              filename: `teams_meeting_${Date.now()}.webm`
            });
          }

          chrome.runtime.sendMessage({ type: "recording-stopped" });
        };

        recorder.start();
        console.log("▶️ Auto recording started");

        // Timer
        secondsElapsed = 0;
        timerInterval = setInterval(() => {
          secondsElapsed++;
          chrome.runtime.sendMessage({ type: "recording-timer", seconds: secondsElapsed });
        }, 1000);

        chrome.runtime.sendMessage({ type: "recording-started" });

        // Auto-stop after 1 hour
        setTimeout(() => {
          if (recorder && recorder.state === "recording") {
            console.log("⏹ Auto-stopping after 1h");
            recorder.stop();
          }
        }, 3600000);
      });
    }
  }
});

// 🔹 Manual start/stop support from popup or content.js
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log("📩 Background received:", msg);

  if (msg.type === "stop-tab-recording") {
    if (recorder && recorder.state === "recording") {
      console.log("⏹ Stopping recorder (manual)...");
      recorder.stop();
    }
    sendResponse({ ok: true });
    return true;
  }
});

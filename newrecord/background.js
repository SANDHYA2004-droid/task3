





console.log("✅ Background script loaded!");

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log("📩 Background received:", msg);

  if (msg.type === "meeting-start") {
    chrome.notifications.create("meeting-start-" + Date.now(), {
      type: "basic",
      iconUrl: "icon.png",
      title: "Teams Meeting Started",
      message: `Started at ${msg.time}`
    });

    // tell content.js to start recording
    chrome.storage.local.get("recordMode", (data) => {
      sendResponse({ recordMode: data.recordMode || "audiovideo" });
    });
    return true; // keep sendResponse async
  }

  if (msg.type === "meeting-end") {
    chrome.notifications.create("meeting-end-" + Date.now(), {
      type: "basic",
      iconUrl: "icon.png",
      title: "Teams Meeting Ended",
      message: `Duration: ${msg.duration} seconds`
    });

    // tell content.js to stop recording
    sendResponse({ stop: true });
    return true;
  }
});

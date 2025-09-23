







chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && /https:\/\/.*teams.*\.com/.test(tab.url)) {
    chrome.runtime.sendMessage({ action: "teamsTabDetected", tabId });

    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "Teams Recorder",
      message: "Teams tab detected! Open the extension to start recording."
    });
  }
});






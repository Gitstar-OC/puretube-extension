// Listen for navigation to YouTube
chrome.webNavigation.onCompleted.addListener((details) => {
  const urlObj = new URL(details.url);
  if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
    chrome.tabs.get(details.tabId, (tab) => {
      if (tab.active) {
        checkAndOpenPopup(details.url);
      }
    });
  }
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'openPopup') {
    const senderUrl = new URL(sender.url);
    if (senderUrl.hostname === 'www.youtube.com' || senderUrl.hostname === 'youtube.com') {
      chrome.tabs.get(sender.tab.id, (tab) => {
        if (tab.active) {
          checkAndOpenPopup(sender.url);
        }
      });
    }
  }
});

function checkAndOpenPopup(url) {
  const urlObj = new URL(url);
  const videoId = urlObj.searchParams.get('v');
  const searchQuery = urlObj.searchParams.get('search_query');
  let settingKey;
  if (videoId) {
    settingKey = 'popupVideos';
  } else if (searchQuery) {
    settingKey = 'popupSearch';
  } else {
    settingKey = 'popupHomepage';
  }
  chrome.storage.local.get(settingKey, (result) => {
    if (result[settingKey] !== false) {
      chrome.action.openPopup().catch(() => {
        // Ignore if popup fails to open (e.g., already open)
      });
    }
  });
}

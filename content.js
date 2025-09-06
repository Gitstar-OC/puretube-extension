// Detect if on a YouTube video page
function getYouTubeVideoId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('v');
}

// Listen for video play event
const video = document.querySelector('video');
if (video) {
  video.addEventListener('play', () => {
    chrome.runtime.sendMessage({action: 'openPopup'});
  });
}

// Detect URL changes (for SPA navigation)
let currentUrl = window.location.href;
setInterval(() => {
  if (window.location.href !== currentUrl) {
    currentUrl = window.location.href;
    const urlObj = new URL(currentUrl);
    if (urlObj.searchParams.get('v') || urlObj.searchParams.get('search_query')) {
      chrome.runtime.sendMessage({action: 'openPopup'});
    }
  }
}, 1000);

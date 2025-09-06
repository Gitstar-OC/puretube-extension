chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  const tab = tabs[0];
  const url = new URL(tab.url);
  
  // Check if we're on YouTube
  if (url.hostname === 'www.youtube.com' || url.hostname === 'youtube.com') {
    const videoId = url.searchParams.get('v');
    const searchQuery = url.searchParams.get('search_query');

    const titleEl = document.getElementById('title');
    const descEl = document.getElementById('description');
    const linkEl = document.getElementById('puretube-link');

    if (videoId) {
      linkEl.href = `https://puretube.oc0.io/watch?v=${videoId}`;
      titleEl.textContent = 'Watch in PureTube';
      descEl.textContent = 'Watch this video in a distraction-free environment.';
      linkEl.textContent = 'Watch in PureTube';
    } else if (searchQuery) {
      linkEl.href = `https://puretube.oc0.io/home?q=${encodeURIComponent(searchQuery)}`;
      titleEl.textContent = 'Search in PureTube';
      descEl.textContent = 'Find videos without algorithmic distractions.';
      linkEl.textContent = 'Search in PureTube';
    } else {
      linkEl.href = 'https://puretube.oc0.io/home';
      titleEl.textContent = 'Open PureTube';
      descEl.textContent = 'Enjoy a distraction-free experience with PureTube.';
      linkEl.textContent = 'Open PureTube';
    }
  } else {
    // Show settings for non-YouTube pages
    const titleEl = document.getElementById('title');
    const descEl = document.getElementById('description');
    const linkEl = document.getElementById('puretube-link');
    
    titleEl.textContent = 'PureTube Extension';
    descEl.textContent = 'Configure your extension settings.';
    linkEl.textContent = 'Open Settings';
    linkEl.href = '#';
    linkEl.onclick = (e) => {
      e.preventDefault();
      chrome.runtime.openOptionsPage();
      window.close();
    };
  }
});

// Handle settings link
const settingsLink = document.getElementById('settings-link');
if (settingsLink) {
  settingsLink.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
  });
}

// Load settings
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['popupHomepage', 'popupVideos', 'popupSearch'], (result) => {
    document.getElementById('popup-homepage').checked = result.popupHomepage !== false; // default true
    document.getElementById('popup-videos').checked = result.popupVideos !== false;
    document.getElementById('popup-search').checked = result.popupSearch !== false;
  });
});

// Save settings
document.getElementById('options-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const settings = {
    popupHomepage: document.getElementById('popup-homepage').checked,
    popupVideos: document.getElementById('popup-videos').checked,
    popupSearch: document.getElementById('popup-search').checked
  };
  chrome.storage.local.set(settings, () => {
    alert('Settings saved!');
  });
});

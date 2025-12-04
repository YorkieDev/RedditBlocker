// Popup script for Reddit Blocker

document.addEventListener('DOMContentLoaded', () => {
  const toggleSwitch = document.getElementById('toggleSwitch');
  const statusDot = document.getElementById('statusDot');
  const statusText = document.getElementById('statusText');
  const blockedCount = document.getElementById('blockedCount');
  const timeSaved = document.getElementById('timeSaved');

  // Load current state
  chrome.storage.local.get(['enabled', 'blockedCount'], (result) => {
    const isEnabled = result.enabled !== false;
    toggleSwitch.checked = isEnabled;
    updateUI(isEnabled);
    
    const count = result.blockedCount || 0;
    blockedCount.textContent = count;
    timeSaved.textContent = count * 5;
  });

  // Handle toggle
  toggleSwitch.addEventListener('change', () => {
    chrome.runtime.sendMessage({ type: 'TOGGLE_EXTENSION' }, (response) => {
      if (response) {
        updateUI(response.enabled);
      }
    });
  });

  function updateUI(isEnabled) {
    if (isEnabled) {
      statusDot.classList.add('active');
      statusText.textContent = 'Active';
    } else {
      statusDot.classList.remove('active');
      statusText.textContent = 'Inactive';
    }
  }

  // Listen for storage changes
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (changes.blockedCount) {
      const count = changes.blockedCount.newValue || 0;
      blockedCount.textContent = count;
      timeSaved.textContent = count * 5;
    }
  });
});

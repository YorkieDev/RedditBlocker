// Background service worker for Reddit Blocker

// Initialize extension state
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    enabled: true,
    blockedCount: 0
  });
  console.log('Reddit Blocker installed and enabled');
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_STATUS') {
    chrome.storage.local.get(['enabled'], (result) => {
      sendResponse({ enabled: result.enabled !== false });
    });
    return true;
  }
  
  if (message.type === 'TOGGLE_EXTENSION') {
    chrome.storage.local.get(['enabled'], (result) => {
      const newState = !result.enabled;
      chrome.storage.local.set({ enabled: newState });
      
      // Enable or disable the blocking rules
      if (newState) {
        chrome.declarativeNetRequest.updateEnabledRulesets({
          enableRulesetIds: ['ruleset_1']
        });
      } else {
        chrome.declarativeNetRequest.updateEnabledRulesets({
          disableRulesetIds: ['ruleset_1']
        });
      }
      
      sendResponse({ enabled: newState });
    });
    return true;
  }
  
  if (message.type === 'INCREMENT_BLOCKED') {
    chrome.storage.local.get(['blockedCount'], (result) => {
      chrome.storage.local.set({ blockedCount: (result.blockedCount || 0) + 1 });
    });
  }
});

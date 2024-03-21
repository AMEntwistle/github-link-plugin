async function handleUpdated(tabId, changeInfo, tabInfo) {
  if (changeInfo.status === 'complete') {
    const queryInfo = {
      active: true,
      currentWindow: true,
    };
    const [tab] = await chrome.tabs.query(queryInfo);
    const validRegex = /https:\/\/github.com\/.*\/pull\/\d+/;
    if (tab.url && validRegex.test(tab.url)) {
      chrome.tabs.sendMessage(tabId, {action: 'tabUpdated'})
    }
  }
}

chrome.tabs.onUpdated.addListener((handleUpdated));
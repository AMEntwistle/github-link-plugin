async function handleUpdated(tabId, changeInfo, tabInfo) {
  if (changeInfo.status === 'complete') {
    const queryInfo = {
      active: true,
      currentWindow: true,
    };
    const [tab] = await chrome.tabs.query(queryInfo);
    const validRegex = /https:\/\/github.com\/.*\/pull\/\d+/;
    if (validRegex.test(tab.url)) {
      setTimeout(() => {
        chrome.tabs.sendMessage(tabId, {action: 'tabUpdated'})
      }, 1000);
    }
  }
}
chrome.tabs.onUpdated.addListener((handleUpdated))
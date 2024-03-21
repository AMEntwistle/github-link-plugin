async function handleUpdated(tabId, changeInfo, tabInfo) {
  if (changeInfo.status === 'complete') {
    const queryInfo = {
      active: true,
      currentWindow: true,
    };
    const [tab] = await chrome.tabs.query(queryInfo);
    const validRegex = /https:\/\/github.com\/.*\/pull\/\d+/;
    if (tab.url && validRegex.test(tab.url)) {
      chrome.tabs.sendMessage(tabId, {action: 'tabUpdated'}).catch((e) => {
        if (e.message !== 'Could not establish connection.' +
            ' Receiving end does not exist.')
          throw e;
      });
    }
  }
}

chrome.tabs.onUpdated.addListener((handleUpdated));
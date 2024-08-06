function sendUpdated(tabId) {
    chrome.tabs.sendMessage(tabId, {action: 'tabUpdated'}).catch((e) => {
        if (e.message !== 'Could not establish connection.' +
            ' Receiving end does not exist.')
            throw e;
    })
}

async function handleUpdated(tabId, changeInfo, tabInfo) {
    if (changeInfo.status === 'complete') {
        const queryInfo = {
            active: true,
            currentWindow: true,
        };
        const [tab] = await chrome.tabs.query(queryInfo);
        const validRegex = /https:\/\/github.com\/.*\/pull\/\d+/;
        if (tab.url && validRegex.test(tab.url)) {
            sendUpdated(tabId)
            setTimeout(() => {
                sendUpdated(tabId)
            }, 2000)
            setTimeout(() => {
                sendUpdated(tabId)
            }, 4000)
        }
    }
}

chrome.tabs.onUpdated.addListener((handleUpdated))
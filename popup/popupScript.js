const buttonId = 'copyButton';
const unsupportedAlert = 'Unsupported page, only use this extension on github PR pages';

document.getElementById(buttonId).onclick = async () => {
  await copyPrDetailsToClipboard();
};

window.onload = async () => {
  await copyPrDetailsToClipboard();
};

async function copyPrDetailsToClipboard() {
  const queryInfo = {
    active: true,
    currentWindow: true,
  };
  const [tab] = await chrome.tabs.query(queryInfo);
  const url = tab.url;
  if (!checkSupported(url)) {
    window.close();
    return;
  }
  const text = await chrome.scripting.executeScript({
    target: {tabId: tab.id},
    func: () => document.getElementsByClassName(
        'js-issue-title')[0].textContent,
  });
  const prName = text[0].result;
  await navigator.clipboard.writeText(url + ' - ' + prName);
  const originalText = document.getElementById(buttonId).innerHTML;
  document.getElementById(buttonId).innerHTML = 'PR Copied to Clipboard';
  setTimeout(() => {
    document.getElementById(buttonId).innerHTML = originalText;
  }, 5000);
}

function checkSupported(url) {
  const validRegex = /https:\/\/github.com\/.*\/pull\/\d+/;
  console.log(url);
  if (!validRegex.test(url)) {
    alert(unsupportedAlert);
    return false;
  }
  return true;
}
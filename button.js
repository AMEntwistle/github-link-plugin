const buttonId = 'copyButton'


document.getElementById(buttonId).onclick = async () => {
  const queryInfo = {
    active: true,
    currentWindow: true
  }
  const [tab] = await chrome.tabs.query(queryInfo)
  const url = tab.url
  try {
    const text = await chrome.scripting.executeScript({
      target: {tabId: tab.id},
      func: () => document.getElementsByClassName(
          "js-issue-title")[0].textContent
    })
    const prName = text[0].result
    await navigator.clipboard.writeText(url + ' - ' + prName)
    const originalText = document.getElementById(buttonId).innerHTML
    document.getElementById(buttonId).innerHTML = "PR copied to clipboard"
    setTimeout(() => {
      document.getElementById(buttonId).innerHTML = originalText
    }, 5000)
  } catch (e) {
    alert('Unsupported page, only use this extension on github PR pages')
  }
}

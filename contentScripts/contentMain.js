function getPrTitleElement() {
  // Try multiple selectors to handle GitHub's changing structure
  for (const selector of PR_TITLE_SELECTORS) {
    const element = document.querySelector(selector);
    if (element && element.textContent.trim()) {
      return element;
    }
  }

  return null;
}

function makeTitleClickable() {
  const prTitle = getPrTitleElement();

  if (prTitle) {
    let originalPrColour = prTitle.style.color;
    let originalPrText = prTitle.textContent.trim();
    prTitle.style.cursor = 'pointer';
    prTitle.onmouseout = () => {
      prTitle.style.color = originalPrColour;
      prTitle.style.textDecoration = '';
    };
    prTitle.onmouseover = () => {
      prTitle.style.color = `#0000FF`;
      prTitle.style.textDecoration = 'underline';
    };
    prTitle.onclick = async () => {
      const url = window.location.href;
      const prName = originalPrText;
      await navigator.clipboard.writeText(url + ' - ' + prName);
      prTitle.innerHTML = 'PR Copied to Clipboard';
      prTitle.style.cursor = 'auto';
      setTimeout(() => {
        prTitle.innerHTML = prName;
        prTitle.style.cursor = 'pointer';
      }, 1000);
    };
  }
}
makeTitleClickable()
chrome.runtime.onMessage.addListener(() => {
  makeTitleClickable()
});

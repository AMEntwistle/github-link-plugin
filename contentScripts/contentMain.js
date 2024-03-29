function makeTitleClickable() {
  const titleClass = 'js-issue-title';
  const prTitle = document.getElementsByClassName(titleClass)[0];

  if (prTitle) {
    let originalPrColour = prTitle.style.color;
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
      const prName = prTitle.textContent;
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

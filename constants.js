// Shared constants for GitHub PR Link Extension

// Selectors to find the PR title element on GitHub pages
// Listed in order of preference (newest GitHub structure first)
const PR_TITLE_SELECTORS = [
  'h1[data-component="Heading"] span[class*="markdownTitle"]',
  'h1[data-component="Heading"] > span:first-child',
  'span.markdown-title',
  '[data-component="PH_Title"] span.markdown-title',
  'h1[data-component="PH_Title"] span.markdown-title',
  '[data-component="TitleArea"] span.markdown-title',
  '.js-issue-title',
  'bdi.js-issue-title',
  'h1.gh-header-title bdi',
  'h1 bdi.js-issue-title'
];
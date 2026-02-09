# Github Link Plugin

Github link plugin is a chrome plugin designed to speed up copying of PR information to post to external sources. It
takes the PR url and pr title and copies them to the clipboard in the format:

```[PR Link] - [PR title]```

## Installation

### For Users
1. Download the latest release `.zip` file from the [Releases page](../../releases)
2. Open `chrome://extensions` in Chrome
3. Enable "Developer mode" (toggle in top right)
4. Drag and drop the `.zip` file onto the page, OR click `Load unpacked` and select the unzipped folder

### For Development
1. Clone this repository
2. Open `chrome://extensions` in Chrome
3. Enable "Developer mode"
4. Click `Load unpacked` and select the project directory

## Use

To use the plugin navigate to a PR page and click the plugin icon. You can also click the PR title instead.

## Development

### Making Changes
1. Make your code changes
2. Update the version number in `manifest.json`
3. Open `chrome://extensions` and click the reload icon for this extension
4. Test on a GitHub PR page

### Packaging for Release

To create a release package:

```bash
# Create the zip file
zip -r github-pr-link-extension-v<VERSION>.zip manifest.json constants.js contentScripts/ popup/ serviceWorker.js icon.png ReadMe.md -x "*.DS_Store"
```

Replace `<VERSION>` with the version number from `manifest.json`.

### Publishing a Release

#### Option 1: GitHub Release
```bash
# Tag the release
git tag -a v<VERSION> -m "Release description"

# Push the tag
git push origin v<VERSION>

# Create GitHub release with the zip file
gh release create v<VERSION> github-pr-link-extension-v<VERSION>.zip \
  --title "v<VERSION> - Release Title" \
  --notes "Release notes here"
```

#### Option 2: Chrome Web Store
1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Click on your extension
3. Upload the `.zip` file
4. Update store listing details
5. Submit for review

## Architecture

- **constants.js** - Shared constants including PR title selectors
- **contentScripts/contentMain.js** - Makes PR titles clickable on GitHub pages
- **popup/** - Extension popup UI and logic
- **serviceWorker.js** - Background service worker
- **manifest.json** - Extension configuration
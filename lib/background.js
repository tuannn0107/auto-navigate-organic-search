console.log("start running");

chrome.tabs.onActivated.addListener(handleActivated);

function handleActivated(activeInfo) {
    chrome.tabs.executeScript(activeInfo.tabId, {
        file: '/lib/auto-navigate-to-main-domain.js',
        allFrames: false
    });
}
const MAX_ITEMS = 512
const MAX_BYTES = 102400
const MAX_BYTES_PER_ITEM = 8192

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

function loadFavicon(pictureURL) {
    document.querySelector('link[rel*="icon"]').href = pictureURL
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
    console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.tabs.onUpdated.addListener(() => {
    getCurrentTab().then((value) => {
        chrome.storage.sync.get(value.url, (file) => {
            console.log(file);
            if (file) {
                let imageUrl = file[value.url].url
                chrome.scripting.executeScript({
                    target: { tabId: value.id },
                    func: loadFavicon,
                    args: [imageUrl]
                });
            }
        });
    });
});
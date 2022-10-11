let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
    console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.tabs.onCreated.addListener(async () => {
    chrome.storage.sync.get("file", async (data) => {
        console.log(data);
        let [bookTab] = await chrome.tabs.query({ url: 'https://bookdown.org/roback/bookdown-BeyondMLR/' });
        let [allTabs] = await chrome.tabs.query({ index: 2 });
        // console.log(bookTab);
        // console.log(allTabs);
        bookTab.favIconUrl = 'images/favicon.ico';
        console.log('test');
    });
});
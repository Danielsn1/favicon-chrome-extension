const DEFAULT_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAADdUlEQVRYhcXX24vVVRQH8E/msXSCCkWaIUdiuo6UgtNUMOLD5IN0ew6L6LlogvKhpwoMeonqL4gIU6l8CaerPU0Y6qB2k4oyKNKmCazUGR1seljrOD+P+5w5IyN9YXN+v70u+3v2Xnut9eN/xmVz1F+CDRjATbgq5//BD/gcH2NivgjW0Y+dOInpHL/hSI6jlfmTeA93tuN4wSzyldiBPViILZjE27gRIzl6sC1lW7AIX2A7utv6iwWsxx/YJ3aghq+xC5enzls55Nxw6tRwN/ZjDOvmuvgjOINX0hkM4S9cV9GrEoDO1BnK90V4Faexqd3F1+fiz1fmFoizfqFBt5GA1Dni/ON9MUnMuhMrxbZPYhwvYw02YgpdbRDoSt2NuCN9jKfPMaxoRWAHDuJaPIWvRGRP4hg24/4k1Z36O/J5Ne7Ds+JWTKbtN+nrGhwSAVxEP8668PrcKu71Pnwrjme6yZjCdyL4JtDb4OuuXKOvRGAnPizMd6fz1fleE4HYK6J+OJ87RdAROzStfAU/wruNk0tEAnmgYPCQ2M5aQVaKAUlkMm0b8SBOYDEzkbohn3cXDG4T2zpVkDXDGXwvjq8Ru0XOuLdKYAB7capgsExE71wxlraNOCliZKBKoEfc3RKWims0V4w3IQA/iVR+rhp+Ju7vlwXle8SWjhZk/fm7tyBbK2JhT0G2Gr9icLZidMmxMH+P4xc8VtB5A1fi4YKsfgMeLci2i1zweEH2JjqYiYEfcUMTkn9qfpatsEzz2OnJNc8RGBEZcElBeRzLL4LA8iYEOkR8jFQJfIJ/MVgwOIxblBNRMyzCzWnbiEGRjj+tEjglUuQTBYMDuAKrKs678n1pjsZU3Js2Bwr+nhQp/4K+sU+5GK1K5VEzGbFVMTosCteEyKJV1IvR2gIxROQeFKXz6XQ2nc6O4hkzdb5ZOd4sSne1HA+JEn8IW5stLh2NmWlIXsLtLr4hWeP8huR3XN+KANE2nRZtVB3z1ZINzLZ4HZvS4DUzgVVvSjtbEOjE36IDkravp69SImuJdeI49ovgqYkWbVjztvyD1KmJGjIqtr3tf96IFeKD4yzex3MiILeJhFIn0JFzE6mzK222auPM20GfaKOqn2bHxFn/nM/1+RN4R4urVsVcP04Xi05mQNTzq3P+uMjtIyLDzfvH6SXDfwqf+eCBtC91AAAAAElFTkSuQmCC"

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

function loadFavicon(pictureURL) {
    document.querySelector('link[rel*="icon"]').href = pictureURL
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ default: { url: DEFAULT_IMAGE } });
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
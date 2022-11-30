const MAX_ITEMS = 512;
const MAX_BYTES = 102400;
const MAX_BYTES_PER_ITEM = 8192;

let fileReader = document.querySelector("input");
let image = document.getElementById("inputImage")
let clear = document.getElementById("clear");
let dropZone = document.getElementById("drop");
let reader = new FileReader();
let url;

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let currTabUrl = tabs[0].url;
    chrome.storage.sync.get([currTabUrl, "default"], (imgURL) => {
        if (imgURL[currTabUrl]) {
            image.src = imgURL[currTabUrl].url;
        }
        else {
            image.src = imgURL.default.url;
        }
    });

    reader.addEventListener("load", () => {
        url = reader.result;
        console.log(tabs[0]);
        chrome.storage.sync.set({
            [tabs[0].url]: { url }
        });
        window.close();
    }, false);

    dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        if (e.dataTransfer.items && e.dataTransfer.files.length === 1) {
            reader.readAsDataURL(e.dataTransfer.files[0])
        }
        else {
            console.error("Incorrect number of files uploaded. Only one file is allowed at a time.")
        }
    });

    dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
    })

    fileReader.addEventListener("change", async () => {
        let file = fileReader.files[0];
        if (Object.keys(await chrome.storage.sync.get()).length + 1 > MAX_ITEMS) console.error("Number of URL's has been exceded.");
        else if (file.size > MAX_BYTES_PER_ITEM) console.error("Image provided is too large.");
        else if (await chrome.storage.sync.getBytesInUse() + file.size > MAX_BYTES) console.error("Number of Bytes has been exceded.");
        else reader.readAsDataURL(file);
    })

    clear.addEventListener("click", () => {
        chrome.storage.sync.remove(currTabUrl);
        location.reload();
    });
});
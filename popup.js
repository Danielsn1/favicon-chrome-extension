let fileReader = document.querySelector("input");
let image = document.getElementById("inputImage")
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
    }, false)

    fileReader.addEventListener("change", () => {
        let file = fileReader.files[0];
        //let file_blob = new Blob([file.arrayBuffer()], { "type": file.type })
        reader.readAsDataURL(file);
    })
});
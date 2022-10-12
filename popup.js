let fileReader = document.querySelector("input");
let reader = new FileReader();
let url;

reader.addEventListener("load", () => {
    url = reader.result;
    console.log(url);
    chrome.storage.sync.set({
        image: { url }
    });
}, false)

fileReader.addEventListener("change", () => {
    let file = fileReader.files[0];
    //let file_blob = new Blob([file.arrayBuffer()], { "type": file.type })
    reader.readAsDataURL(file);
})
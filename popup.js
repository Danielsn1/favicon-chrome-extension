let fileReader = document.getElementById("input");
console.log(fileReader);
console.log("test");

fileReader.addEventListener("change", () => {
    console.log(this.File.);
    console.log(this)
    console.log(this.FileReader.toString())
    chrome.storage.sync.set({ image: this.File })
})
let page = document.getElementById("buttonDiv");
let test = document.getElementById("test");
let selectedClassName = "current";
const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];

function handleButtonClick(event) {
    let current = event.target.parentElement.querySelector(
        `.${selectedClassName}`
    );
    if (current && current !== event.target) {
        current.classList.remove(selectedClassName);
    }

    let color = event.target.dataset.color;
    event.target.classList.add(selectedClassName);
    chrome.storage.sync.set({ color })
}

function constructOptions(buttonColors) {
    chrome.storage.sync.get("color", (data) => {
        chrome.storage.sync.get(null, (keyValues) => {
            let currentColor = data.color;
            console.log(keyValues);

            for (let buttonColor of buttonColors) {
                let button = document.createElement("button");
                button.dataset.color = buttonColor;
                button.style.backgroundColor = buttonColor;


                if (buttonColor === currentColor) {
                    button.classList.add(selectedClassName);
                }

                button.addEventListener("click", handleButtonClick);
                page.appendChild(button);
            }

            for (let [location, { url }] of Object.entries(keyValues)) {
                console.log(url);
                let p = document.createElement("p");
                let image = document.createElement("img");
                p.innerHTML = `URL: ${location} <br> Image: ${url}`
                image.src = url;
                test.appendChild(p);
                test.appendChild(image);
            }
        });
    });
}

constructOptions(presetButtonColors);
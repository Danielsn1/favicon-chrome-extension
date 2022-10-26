let wrapper = document.getElementById("urlsWrapper");

// function handleButtonClick(event) {
//     let current = event.target.parentElement.querySelector(
//         `.${selectedClassName}`
//     );
//     if (current && current !== event.target) {
//         current.classList.remove(selectedClassName);
//     }

//     let color = event.target.dataset.color;
//     event.target.classList.add(selectedClassName);
//     chrome.storage.sync.set({ color })
// }

function constructOptions() {
    chrome.storage.sync.get(null, (keyValues) => {
        console.log(keyValues);

        for (let [location, { url }] of Object.entries(keyValues)) {
            let line = document.createElement("div");
            line.className = "line";
            let p = document.createElement("p");
            let image = document.createElement("img");
            p.innerHTML = `${location}`;
            image.src = url;
            let brk = document.createElement("div");
            brk.className = "break";
            line.appendChild(image);
            line.appendChild(p);
            wrapper.appendChild(line);
            wrapper.appendChild(brk);
        }
    });
}

constructOptions();
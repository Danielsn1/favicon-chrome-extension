let wrapper = document.getElementById("urlsWrapper");
let button = document.getElementById("deleteButton");

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
        let count = 0
        for (let [location, { url }] of Object.entries(keyValues)) {
            if (location != "default") {
                count++;
                let check = document.createElement("input");
                check.setAttribute("type", "checkbox")
                check.id = `checkbox${count}`;

                let label = document.createElement("label");
                label.setAttribute("for", `checkbox${count}`)

                let line = document.createElement("div");
                line.className = "line";

                let a = document.createElement("a");
                a.innerHTML = `${location}`;
                a.href = `${location}`;

                let image = document.createElement("img");
                image.src = url;

                let brk = document.createElement("div");
                brk.className = "break";

                line.appendChild(image);
                line.appendChild(a);
                label.appendChild(line);
                wrapper.append(check, label, brk);
            }
        }
    });
}

constructOptions();

button.addEventListener('click', (e) => {
    let checks = document.querySelectorAll("input[type='checkbox']")
    checks.forEach((check) => {
        if (check.checked) {
            console.log(check.labels[0].innerText);
            chrome.storage.sync.remove(check.labels[0].innerText);
        }
    });
    location.reload();
});
let count = 0;
const box = document.getElementById("container");
const container = document.getElementById("box");
const inbox = document.getElementById("inner-container");

function startLoader() {
    count = 0;
    updateProgress(); 
    nextLoader();
}

function updateProgress() {
    box.innerHTML = count + "%";
}

function nextLoader() {
    inbox.style.width = count * 1 + "%";
    if (count < 100) {
        count++;
        updateProgress(); 
        setTimeout(nextLoader, 900);
    } else {
        container.style.opacity = "1";
    }
}

document.querySelector(".start").addEventListener("click", startLoader);
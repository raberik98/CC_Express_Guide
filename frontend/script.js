window.addEventListener("load", () => {
    fetch("/api/v1/getData").then((res) => res.json().then((data) => {
        document.querySelector("body").insertAdjacentHTML("beforeend",`<h2>${data[0]}</h2>`)
    }))
})
const selectedButton = document.querySelector("#button")

function newURL() {
    // window.location.href = "https://example.com/new-page";
    history.pushState(null, null, "/new-page");
}

selectedButton.addEventListener("click", newURL)
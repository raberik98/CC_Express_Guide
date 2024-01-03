function generatePersonLogs(peopleArray) {
    returnString = ""

    peopleArray.forEach(person => {
        returnString += `<h2>${person.name}</h2> <h4>${person.age}</h4>`
    })

    return returnString
}

window.addEventListener("load", () => {
    fetch("/api/v1/getData").then((res) => res.json().then((data) => {
        document.querySelector("body").insertAdjacentHTML("beforeend", generatePersonLogs(data))
    }))
})

document.querySelector("#registrationForm").addEventListener("submit", async (e) => {
    e.preventDefault()
    let resp = await fetch("/api/v1/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: e.target.name.value, age: e.target.age.value })
    })

    let data = await resp.json()

    console.log(data);
})
let urlParts = document.location.href.split("/")
let idFromUrl = urlParts[urlParts.length-1]

window.addEventListener("load", async () => {
    const resp = await fetch(`/api/v1/getSpecificPerson/${idFromUrl}`)
    const data = await resp.json()

    document.querySelector("#name").value = data.name
    document.querySelector("#age").value = data.age
})

document.querySelector("#editForm").addEventListener("submit", async (e) => {
    e.preventDefault()
    const resp = await fetch(`/api/v1/editProfile/${idFromUrl}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: e.target.name.value, age: e.target.age.value })
    })

    if (resp.status == 200) {
        document.location.href = "/"
    }
    else {
        message = await resp.json()
        alert(message.message)
    }
})
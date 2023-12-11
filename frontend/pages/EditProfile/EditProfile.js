let url = document.location.href
let parts = url.split("/")
let selectedID = parts[parts.length-1]
console.log(selectedID);

async function getUserData() {
    try {
        let resp = await fetch(`/api/getSpecificData/${selectedID}`)
        let data = await resp.json()

        document.querySelector("#inputName").value = data.name
        document.querySelector("#inputProfession").value = data.profession

    } catch (error) {
        alert(error)
    }
}

async function submitEditForm(event) {
    try {
        event.preventDefault()
        let resp = await fetch(`/api/editProfile/${selectedID}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: event.target.inputName.value,
                profession: event.target.inputProfession.value
            })
        })
        let { message } = await resp.json()

        alert(message)

    } catch (error) {
        alert(error)
    }
}

getUserData()
document.querySelector("#editForm").addEventListener("submit", (event) => submitEditForm(event))
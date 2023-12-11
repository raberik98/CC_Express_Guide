async function submitForm(event) {
    try {
        event.preventDefault()
        let resp = await fetch("/api/registration", {
            method: "POST",
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
        alert(error.message)
    }
}   

document.querySelector("#registrationForm").addEventListener("submit", (event) => { submitForm(event) })
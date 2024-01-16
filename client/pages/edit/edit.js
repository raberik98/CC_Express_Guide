let urlStringParts = document.location.href.split("/")
let mode = urlStringParts[urlStringParts.length-1] == "register" ? "reg" : "edit"


async function fetchData() {
    try {
        const resp = await fetch(`/api/v1/people/${urlStringParts[urlStringParts.length-1]}`)
        const data = await resp.json()

        if (resp.status == 404) {
            return alert(data.message)
        }

        document.querySelector("#name").value = data.name
        document.querySelector("#favArea").value = data.favArea
        document.querySelector("#module").value = data.module
        document.querySelector("#age").value = data.age

    } catch (error) {
        console.log(error);
    }

}

if (mode == "edit") {
    fetchData()
}

document.querySelector("#my-form").addEventListener("submit", async (e) => {
    e.preventDefault()

    const sendThis = {
        name: e.target.name.value,
        favArea: e.target.favArea.value,
        module: e.target.module.value,
        age: e.target.age.value
    }

    if (mode == "reg") {
        try {
            const resp = await fetch(`/api/v1/people`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sendThis)
            })
            const data = await resp.json()

            alert(data.message)
        } catch (error) {
            alert(error.message)
        }
    }
    else {
        try {
            const resp = await fetch(`/api/v1/people/${urlStringParts[urlStringParts.length-1]}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sendThis)
            })
            const data = await resp.json()

            if (resp.status == 404) {
                return alert(data.message)
            }

            alert(data.message)
        } catch (error) {
            alert(error.message)
        }
    }

})
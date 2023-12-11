let allData = []

async function getDataFromServer() {
    let resp = await fetch("/api/getAllData")
    allData = await resp.json()
}

async function main() {
    await getDataFromServer()

    document.querySelector("#myList")
        .insertAdjacentHTML("afterbegin", allData
        .map((element) => `<li>${element.name}</li>`)
        .join(""))
}
main()
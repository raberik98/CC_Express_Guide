async function main() {
    const resp = await fetch("/api/v1/people")
    const data = await resp.json()

    let htmlString = ""

    data.forEach(element => {
        htmlString += `<h2 id='${element.id}'>${element.name}</h2>`
    });

    document.querySelector("#people").insertAdjacentHTML("afterbegin", htmlString)
}
main()

document.addEventListener("click", (e) => {

    let id = parseInt(e.target.id)

    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN

    //Check this section: 
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN#testing_against_nan

    if (!isNaN(id)) {
        document.location.href = `/edit/${id}`
    }
})
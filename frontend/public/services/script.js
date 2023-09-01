async function fetchData() {
  try {
    const resp = await fetch("http://127.0.0.1:3000/api/v1/getPeopleData");
    const data = await resp.json();

    let peopleContainer = document.querySelector("#people-container");
    peopleContainer.innerHTML = "";
    data.forEach((element) => {
      peopleContainer.insertAdjacentHTML(
        "beforeend",
        `<h3>Name: ${element.name} and Age: ${element.age}</h3>`
      );
    });
  } catch (error) {
    alert(error);
  }
}
window.addEventListener("load", fetchData);


async function postData(event) {
  event.preventDefault();
  try {
    const postThis = {
      name: event.target.name.value,
      age: event.target.age.value,
    };

    const resp = await fetch("http://127.0.0.1:3000/api/v1/addNewPerson", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postThis),
    });
    const data = await resp.json();
    await fetchData();
  } catch (error) {
    alert(error);
  }
}
document.querySelector("#form").addEventListener("submit", postData);

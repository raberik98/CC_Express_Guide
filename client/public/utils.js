//Naturaly if we want to have a fetch function which is good far everything this can be way more sophisticated then this.

async function fetchData(url, method, body, contentType) {
  try {
    if (method == "GET") {

      const resp = await fetch(url);
      const data = resp.json();
      return data;

    } else if (method == "POST" || method == "PUT" || method == "PATCH") {

      const resp = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": contentType,
        },
        body: JSON.stringify(body),
      });
      const data = await resp.json();

      if(resp.status == 404) {
        return alert(data.message)
        }

      alert(data.message);
      return data;

    } else if (method == "DELETE") {

      const resp = await fetch(url, {
        method: method,
      });
      const data = await resp.json();

      alert(data.message);
      return data;

    }
  } catch (error) {
    alert(error.message);
  }
}

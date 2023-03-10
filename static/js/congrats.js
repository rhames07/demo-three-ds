document.addEventListener("DOMContentLoaded", async function (e) {
  init();
});

async function init() {
  const id = localStorage.getItem("paymentId");

  try {
    const response = await fetch("/get_payment/" + id, {
      method: "GET",
    });
    const result = await response.json();
    if (result.status != 200) throw new Error("error getting payment");
    console.log(result);
    document.getElementById("congrats-div").innerHTML =
      "Pagamento " + result.data.id + " -> Status: " + result.data.status;
  } catch (error) {
    alert("Unexpected error\n" + JSON.stringify(error));
  }
}

async function createCardToken() {
  var card_number = "2303779999000408";
  var security_code = "123";
  var expirationMonth = 11;
  var expirationYear = 2025;
  var cardholderName = "APRO";

  const data = {
    cardholder: {
      name: cardholderName,
    },
    card_number,
    security_code,
    expiration_year: Number(expirationYear),
    expiration_month: Number(expirationMonth),
  };

  try {
    const response = await fetch("/process_card", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.status != 201) throw new Error("error creating card token");
    console.log(result);
    return result.data;
  } catch (error) {
    alert("Unexpected error\n" + JSON.stringify(error));
  }
}

async function createPayment(token) {
  var email = "test_user_1671715145@testuser.com";
  var payment_method_id = "master";
  var marketplace = "NONE";
  var installments = 1;
  var transaction_amount = 34;
  var description = "Payment test";

  const data = {
    payer: { email },
    payment_method_id,
    marketplace,
    installments,
    transaction_amount,
    description,
    token,
  };

  try {
    const response = await fetch("/process_payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.status != 201) throw new Error("error creating payment");
    console.log(result);
    return result.data;
  } catch (error) {
    alert("Unexpected error\n" + JSON.stringify(error));
  }
}

function doChallenge(payment) {
  try {
    const {
      status,
      status_detail,
      three_dsinfo: { creq, external_resource_url },
    } = payment;
    if (status === "pending" && status_detail === "pending_challenge") {
      var iframe = document.createElement("iframe");
      iframe.name = "myframe";
      iframe.id = "myframe";
      iframe.height = "500px";
      iframe.width = "600px";
      document.body.appendChild(iframe);

      var idocument = iframe.contentWindow.document;

      var myform = idocument.createElement("form");
      myform.name = "myform";
      myform.setAttribute("target", "myframe");
      myform.setAttribute("method", "post");
      myform.setAttribute("action", external_resource_url);

      var hiddenField = idocument.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", "creq");
      hiddenField.setAttribute("value", creq);
      myform.appendChild(hiddenField);
      iframe.appendChild(myform);

      myform.submit();
    }
  } catch (error) {
    console.log(error);
    alert("Error doing challenge, try again later.");
  }
}

async function processPayment() {
  const { id: token } = await createCardToken();
  const payment = await createPayment(token);
  doChallenge(payment);
}

document.getElementById("checkout-btn").addEventListener("click", () => {
  setTimeout(() => {
    processPayment();
  }, 500);
});

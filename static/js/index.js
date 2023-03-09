const mp = new MercadoPago("APP_USR-2dfd505a-4b30-4403-878b-f8fb618e58b3")

async function createCardToken() {
  var cardNumber = "5031433215406351";
  var securityCode = "123";
  var identificationType = "CPF";
  var identificationNumber = "123";
  var cardExpirationMonth = "11";
  var cardExpirationYear = "2025";
  var cardholderName = "APRO";

  const token = await mp.createCardToken({
    cardNumber,
    securityCode,
    cardholderName,
    cardExpirationMonth,
    cardExpirationYear,
    identificationType,
    identificationNumber,
  });
  console.log(token)
  return token.id;
}

async function createPayment(token) {
  var email = "test_user_14026913@testuser.com";
  var payment_method_id = "master";
  var marketplace = "NONE";
  var installments = 1;
  var transaction_amount = 10;
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
    console.log(status, status_detail)
    if (status === "pending" && status_detail === "pending_challenge") {
      mountIframe(creq, external_resource_url)
    }
  } catch (error) {
    console.log(error);
    alert("Error doing challenge, try again later.");
  }
}

function mountIframe(creq, external_resource_url) {
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

async function processPayment() {
  const token = await createCardToken();
  const payment = await createPayment(token);
  localStorage.setItem('paymentId', payment.id);
  doChallenge(payment);
}

document.getElementById("checkout-btn").addEventListener("click", () => {
    processPayment();
});

window.addEventListener("message", (e) => {
      if (e.data.status === "COMPLETE") {
          window.open("congrats.html");
      }
});

import axios from "axios";
import * as dotenv from "dotenv";
import express from "express";
dotenv.config();

var YOUR_ACCESS_TOKEN = "TEST-367604750109681-030714-a1adc70b233852f82df8a3e76f83c28b-1160535239"
var PAYMENTS_URL = "https://api.mercadopago.com/v1/payments"

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./static"));
app.use(express.json());

app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});

app.get("/congrats", (_, res) => {
  res.sendFile(path.join(__dirname, "static", "congrats.html"));
});

app.post("/process_payment", async (req, res) => {
  const {
    payer: { email },
    payment_method_id,
    marketplace,
    installments,
    transaction_amount,
    description,
    token,
  } = req.body;

  const body = {
    payer: {
      email,
    },
    additional_info: {
      items: [
        {
          quantity: 1,
          category_id: "MLA91058",
          title: "Clases De Payments",
          unit_price: 34,
        },
      ],
    },
    payment_method_id,
    marketplace,
    installments,
    transaction_amount,
    description,
    token,
    three_d_secure_mode: "optional",
    capture: true,
    binary_mode: false,
  };

  const options = {
    headers: {
      "Authorization": "Bearer " + YOUR_ACCESS_TOKEN,
      "Content-Type": "application/json"
    },
  };

  try {
    const { data, status } = await axios.post(
      PAYMENTS_URL,
      body,
      options
    );
    if (data && status == 201) {
      const response = { ...{ data }, ...{ status } };
      res.status(201).json(response);
    }
    res.status(status).send()
  } catch (error) {
    handleAxiosErrors(error);
    res.status(500).send();
  }
});

app.get("/get_payment/:payment_id", async (req, res) => {
  const options = {
    headers: {
      "Authorization": "Bearer " + YOUR_ACCESS_TOKEN,
    },
  };

  try {
    console.log(req.params)
    const { data, status } = await axios.get(
      PAYMENTS_URL + req.params.payment_id,
      options
    );
    if (data && status == 200) {
      const response = { ...{ data }, ...{ status } };
      res.status(200).json(response);
    }
    res.status(500).send();
  } catch (error) {
    handleAxiosErrors(error);
    res.status(500).send();
  }
});

function handleAxiosErrors(error) {
  // console.log(error);
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
}
app.listen(8080, () => {
  console.log("The server is now running on port 8080");
});

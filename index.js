import axios from "axios";
import * as dotenv from "dotenv";
import express from "express";
import { payment } from "./mocks/payment-response.js";
dotenv.config();

const FURY_TOKEN = process.env.FURY_TOKEN;
if (!FURY_TOKEN) {
  console.log("Error: access token not defined");
  process.exit(1);
}
const FURY_BEARER_TOKEN = "Bearer " + FURY_TOKEN;
const PUBLIC_KEY = "TEST-ccac7255-c3d0-4d25-bc8e-145e8cc8012d";

const CARD_TOKEN_URL = "https://api.mercadopago.com/v1/card_tokens/zeta";
const PAYMENTS_BASE_URL =
  "https://payments-beta-staging.melioffice.com/v1/payments";

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

app.post("/process_card", async (req, res) => {
  const {
    cardholder: { name },
    card_number,
    security_code,
    expiration_year,
    expiration_month,
  } = req.body;

  const body = {
    cardholder: {
      name,
    },
    card_number,
    security_code,
    expiration_year,
    expiration_month,
  };

  const options = {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      public_key: PUBLIC_KEY,
    },
  };

  try {
    const { data, status } = await axios.post(CARD_TOKEN_URL, body, options);
    if (data && status == 201) {
      const response = { ...{ data }, ...{ status } };
      res.status(201).json(response);
    }
    res.status(500).send();
  } catch (error) {
    handleAxiosErrors(error);
    res.status(500).send();
  }
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
      "X-Caller-Scopes": "payments",
      "Content-Type": "application/json",
      "X-Tiger-Token": FURY_BEARER_TOKEN,
      "x-test-token": "true",
      "x-wanted-response": "rejected",
    },
    params: {
      "caller.id": "1004607769",
      "client.id": "5083322942877179",
      "caller.admin": "true",
    },
  };

  try {
    const { data, status } = await axios.post(
      "https://theta--openplatform-payments-api.furyapps.io/payments",
      body,
      options
    );
    if (data && status == 201) {
      const response = { ...{ data }, ...{ status } };
      res.status(201).json(response);
    }
    res.status(500).send();
    // const response = { ...{ data: payment }, ...{ status: 201 } };
    // res.status(201).json(response);
  } catch (error) {
    handleAxiosErrors(error);
    res.status(500).send();
  }
});

app.get("/get_payment/:payment_id", async (req, res) => {
  const options = {
    headers: {
      "X-Caller-Scopes": "payments",
      "X-Tiger-Token": FURY_BEARER_TOKEN,
      "x-test-token": "true",
    },
    params: {
      "caller.id": "1004607769",
      "client.id": "5083322942877179",
      "caller.admin": "true",
    },
  };

  try {
    const { data, status } = await axios.get(
      "https://theta--openplatform-payments-api.furyapps.io/payments/" + req.params.payment_id,
      options
    );
    if (data && status == 200) {
      const response = { ...{ data }, ...{ status } };
      res.status(200).json(response);
    }
    res.status(500).send();
    // const response = { ...{ data: payment }, ...{ status: 201 } };
    // res.status(201).json(response);
  } catch (error) {
    handleAxiosErrors(error);
    res.status(500).send();
  }
});

function handleAxiosErrors(error) {
  console.log(error);
  //   if (error.response) {
  //     console.log(error.response.data);
  //     console.log(error.response.status);
  //     console.log(error.response.headers);
  //   } else if (error.request) {
  //     console.log(error.request);
  //   } else {
  //     console.log("Error", error.message);
  //   }
  //   console.log(error.config);
}
app.listen(8080, () => {
  console.log("The server is now running on port 8080");
});

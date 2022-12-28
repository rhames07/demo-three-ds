export const payment = {
  id: 52998230124,
  version: null,
  date_created: "2022-12-27T14:33:56.449-04:00",
  date_approved: null,
  date_last_updated: "2022-12-27T14:33:56.449-04:00",
  date_of_expiration: null,
  money_release_date: null,
  money_release_status: null,
  operation_type: "regular_payment",
  issuer_id: null,
  payment_method_id: "master",
  payment_type_id: "credit_card",
  payment_method: {
    id: "master",
    type: "credit_card",
  },
  status: "pending",
  status_detail: "pending_challenge",
  currency_id: "BRL",
  description: "Payment test",
  live_mode: true,
  sponsor_id: null,
  authorization_code: null,
  money_release_schema: null,
  taxes_amount: 0,
  counter_currency: null,
  brand_id: null,
  site_id: "MLB",
  marketplace: "NONE",
  application_id: 5083322942877179,
  transaction_id: "86000149282_377b7377776e737f3377",
  coupon_id: null,
  risk_execution_id: null,
  available_actions: ["cancel"],
  profile_id: "g2_getnet_getnet_7187497",
  is_test: true,
  payer_tags: null,
  collector_tags: null,
  api_version: "2",
  financing_type: null,
  client_id: "5083322942877179",
  shipping_amount: 0,
  reserve_id: null,
  build_version: "1.1.20-3ds-sms-hack",
  product_id: "BF3L8CCEVKKG01NFMI70",
  pos_id: null,
  store_id: null,
  integrator_id: null,
  platform_id: null,
  corporation_id: null,
  collector_id: 1004607769,
  payer: {
    type: "guest",
    id: "1274101259",
    operator_id: null,
    email: "test_user_1672166035@testuser.com",
    identification: {
      type: null,
      number: null,
    },
    phone: {
      area_code: null,
      number: null,
      extension: null,
    },
    first_name: null,
    last_name: null,
    entity_type: null,
  },
  payer_id: 1274101259,
  collector: {
    id: 1004607769,
    operator_id: null,
    email: "test_user_16082899@testuser.com",
    identification: {
      type: "CPF",
      number: "15635614680",
    },
    phone: {
      area_code: "01",
      number: "1111-1111",
      extension: "",
    },
    first_name: "Test",
    last_name: "Test",
  },
  marketplace_owner: null,
  metadata: {},
  internal_metadata: {
    rule_engine: {
      with_promise: false,
      valid_promise: false,
      rules: [
        {
          rule_id: 21002808561,
          rule_set: "processing_fee_and_release",
        },
        {
          rule_id: 21000231962,
          rule_set: "financing_fee_collector",
        },
      ],
    },
    unified_processing: true,
    "3ds_disabled_reason": "none",
    approval_optimization_context: [
      {
        trx_id: "86000149282_377b7377776e737f3377",
        profile_id: "g2_getnet_getnet_7187497",
        gtw_context: {
          response_code: null,
          http_status: null,
          operation: "authorization",
        },
        approval_decision: {
          abtesting_flows: null,
          deferred_retry: true,
          data_only: false,
          retry_after_time: "2022-12-27T21:00:00Z",
          approval_flows: [
            "tokenization",
            "threeds",
            "data_only",
            "no_cvv",
            "default",
          ],
          three_ds: true,
          remove_cvv: false,
          operation_mode: "async",
          best_flows: ["threeds"],
        },
        mcc: null,
        attempt: 1,
        security_code_data: null,
      },
    ],
    g2: "on",
    "3ds_status": "CHALLENGE",
    "3ds_challenge": true,
    "3ds_challenge_drop_reason": "none",
    rejected_by_penalty: false,
    payment_method_id: "67696841",
    pci_info: {
      ct_x_forwarded_for: null,
      pay_x_forwarded_for: "10.195.1.92, 10.54.29.159",
      is_public: false,
    },
    mcc_assigned: "5099",
    internal_risk_analysis: "by_risk",
    approval_decision: {
      abtesting_flows: null,
      deferred_retry: true,
      data_only: false,
      retry_after_time: "2022-12-27T21:00:00Z",
      approval_flows: [
        "tokenization",
        "threeds",
        "data_only",
        "no_cvv",
        "default",
      ],
      three_ds: true,
      remove_cvv: false,
      operation_mode: "async",
      best_flows: ["threeds"],
    },
    mcc_source: "DEFAULT",
  },
  db_metadata: {
    source_create: "FULL_KVS",
  },
  additional_info: {
    items: [
      {
        id: null,
        title: "Clases De Payments",
        description: null,
        picture_url: null,
        category_id: "MLA91058",
        quantity: "1",
        unit_price: "34",
      },
    ],
    tracking_id: "platform:v1-whitelabel,so:ALL,type:N/A,security:none",
    available_balance: null,
    nsu_processadora: null,
    authentication_code: null,
  },
  money_release_days: 0,
  order: {},
  external_reference: null,
  transaction_amount: 34,
  transaction_amount_refunded: 0,
  coupon_amount: 0,
  splitter_id: null,
  differential_pricing_id: null,
  financing_group: null,
  deduction_schema: null,
  installments: 1,
  transaction_details: {
    payment_method_reference_id: null,
    net_received_amount: 0,
    total_paid_amount: 34,
    overpaid_amount: 0,
    external_resource_url: null,
    installment_amount: 34,
    financial_institution: null,
    payable_deferral_period: null,
    acquirer_reference: null,
  },
  fee_details: [],
  charges_details: [
    {
      id: "52998230124-001",
      name: "mercadopago_fee",
      type: "fee",
      accounts: {
        from: "collector",
        to: "mp",
      },
      client_id: 0,
      date_created: "2022-12-27T14:33:56.458-04:00",
      last_updated: "2022-12-27T14:33:56.458-04:00",
      amounts: {
        original: 1.69,
        refunded: 0,
      },
      metadata: {},
      reserve_id: null,
      refund_charges: [],
    },
  ],
  captured: true,
  binary_mode: false,
  call_for_authorize_id: null,
  statement_descriptor: null,
  card: {
    id: null,
    first_six_digits: "230377",
    last_four_digits: "0408",
    bin: "23037799",
    expiration_month: 11,
    expiration_year: 2025,
    date_created: "2022-12-27T14:33:56.000-04:00",
    date_last_updated: "2022-12-27T14:33:56.000-04:00",
    cardholder: {
      name: "APRO",
      identification: {
        number: null,
        type: null,
      },
    },
  },
  notification_url: null,
  refunds: [],
  processing_mode: "aggregator",
  merchant_account_id: null,
  acquirer: "getnet",
  merchant_number: null,
  acquirer_reconciliation: [],
  contingencies: {
    status: "none",
    list: [],
  },
  point_of_interaction: {
    type: "UNSPECIFIED",
    business_info: {
      unit: null,
      sub_unit: null,
    },
  },
  three_dsinfo: {
    external_resource_url:
      "https://acs-public.tp.mastercard.com/api/v1/browser_challenges",
    creq: "eyJ0aHJlZURTU2VydmVyVHJhbnNJRCI6ImE4NDQ1NTE2LThjNzktNGQ1NC04MjRmLTU5YzgzNDRiY2FjNCIsImFjc1RyYW5zSUQiOiJmZjVlMWM4YS00M2Y2LTQ5ZDEtYjhmMy02M2FmMzJkMzgwYTEiLCJjaGFsbGVuZ2VXaW5kb3dTaXplIjoiMDQiLCJtZXNzYWdlVHlwZSI6IkNSZXEiLCJtZXNzYWdlVmVyc2lvbiI6IjIuMS4wIn0",
  },
  owner: null,
};

import { IAddress } from "./iaddress";
import { categories, ewallet_id, payment_flow_type } from "./types";

export interface IPayment {
  /**
  * ID of the Payment Method Type object.
  */
  id?: string;
  /**
  * The billing address associated with the card.
  
  For more information, see Address Object.
  */
  address?: object;
  /**
  * Indicates the amount range for the payment method's currencies. Each object contains the following fields:
  currency - Three-letter ISO 4217 format of currency.
  maximum_amount - The maximum payment amount.
  * minimum_amount - The minimum payment amount.
  */
  amount_range_per_currency?: AmountRangePerCurrency[];
  /**
  * Bank Identification Number (BIN) details. Read-only. Object containing the following fields:
  bin_number - BIN number
  country - The two-letter ISO 3166-1 ALPHA-2 code for the country. Uppercase.
  funding - Type of card funding. One of the following:
  credit
  debit
  prepaid
  unknown
  bank - Name of the issuing bank.

  Relevant to cards.
  */
  bin_details?: object;
  /**
  * Category of payment method. Possible values:
  bank_redirect
  bank_transfer
  card
  cash
  ewallet
  rapyd_ewallet

  Response only.
  */
  category?: string;
  /**
  * Name of the country where this payment method is in use. Two-letter ISO 3166-1 alpha-2 code. Uppercase.

  To determine the code for a country, see List Countries.
  */
  country?: string;
  /**
  * A list of currencies in use in the country for this type of payment method. Three-letter ISO 4217 format. Uppercase. Response only.
  */
  currencies?: string[];
  /**
  * Name of the customer. Relevant to cards.

  For more information, see Customer Object.
  */
  customer?: string;
  /**
  * Contains several fields that are used in creating the specific payment method. These fields always contain the same value for a payment method, so they are included in the payment method object.

  To determine what fields are required for the payment method, see Get Payment Method Required Fields.

  For more fields, see the payment_options field in the response to List Payment Methods.

  Note: The 'fields' object can contain only fields that are either required or optional. A field with an unknown name will throw an error.
  */
  fields?: object;
  /**
  * Hash of the card number, expiration date and CVV. Read-only.

  Relevant to cards.
  */
  fingerprint?: string;
  /**
  * A URL to the image of the icon for the type of payment method. Response only.
  */
  image?: string;
  /**
  * Indicates whether a payment made with this payment method can be canceled. Response only.
  */
  is_cancelable?: Boolean;
  /**
  * Indicates whether the merchant can set an expiration time for the customer to complete the payment. Response only.
  */
  is_expirable?: Boolean;
  /**
  * Indicates whether the payment is completed immediately online. Response only.
  */
  is_online?: Boolean;
  /**
  * Last four digits of the card number. Read-only.

  Relevant to cards.
  */
  last4?: string;
  /**
  * The maximum time (in seconds) that the merchant can set for completing the payment. Relevant when is_expirable is true. Response only.
  */
  maximum_expiration_seconds?: number;
  /**
  * The minimum time (in seconds) that the merchant can set for completing the payment. Relevant when is_expirable is true. Response only.
  */
  minimum_expiration_seconds?: number;
  /**
  * The name of the payment method, in user-friendly terms. For example, 'Ireland Visa card'. Response only.
  */
  name?: string;
  /**
  * Indicates how the customer completes the payment transaction. Possible values:
  bank redirect - The customer is directed to another URL to complete the bank payment.
  bank transfer - Customer makes a transfer directly from the customer's bank to a bank account.
  card - Rapyd charges the customer's card.
  otc - The customer pays in cash at a Rapyd point-of-sale location. To find nearby locations, see Methods - eWallet.
  * ewallet - The customer pays from an eWallet.

  Response only.
  */
  payment_flow_type?: string;
  /**
  * Additional fields required for the payment method. These values might vary from one use to the next, so they are not saved as part of the payment method object.

  In the request to create payment, these fields appear in the 'payment_method_options' object.

  To determine the fields required, run Get Payment Method Required Fields.

  See Options Objects, below.
  */
  payment_method_options?: any[];
  /**
  * Additional fields of the Payment object which are required for the payment.

  In the request to create payment, these fields appear in the root of the body of the request.

  To determine the fields required, run Get Payment Method Required Fields.

  See Options Objects, below.
  */
  payment_options?: PaymentOption[];
  /**
  * Indicates the status of the payment method. One of the following values:
  * 1 - Valid.
  */
  status?: number;
  /**
  * Name of the payment method type. For example, it_visa_card.

  To get a list of payment methods for a country, use List Payment Methods by Country.
  */
  type?: string;
}

export interface PaymentOption {
  name: string
  type: string
  regex: string
  description: string
  is_required: boolean
  is_updatable: boolean
}

export interface AmountRangePerCurrency {
  currency: string
  maximum_amount: any
  minimum_amount: any
}



export namespace PostCreatePayment {

  export interface Request {
    /**The amount of the payment, in units of the currency defined in currency. Decimal. */
    amount: number //must
    currency: string //must
    /**ID of the customer. String starting with cus_. Required if payment_method is blank. */
    customer?: string //must
    payment_method: PostCreatePayment.IPaymentMethod
    /**Determines when the payment is processed for capture. When true, the payment is captured immediately. When false, the payment is captured at a later time. Relevant to cards. Default is true. */
    capture?: boolean //must
    /**URL where the customer is redirected after a successful payment. Required for bank redirect payment methods. */
    complete_payment_url: string; //must
    /**URL where the customer is redirected in case of an error in the payment. Required for bank redirect payment methods. */
    error_payment_url: string; //must

    ewallets: PostCreatePayment.ISplitWallet[] //must
    "3DS_requirede": boolean //must
    description: string //must
    statement_descriptor?: string
    address: IAddress //must
    category?: categories
    metadata?: any
  }

  export interface IPaymentMethod {
    type: string
    fields?: IFields
    metadata?: any
  }
  export interface ISplitWallet {
    ewallet: ewallet_id
    percentage?: number
  }

  export interface IFields {
    phone?: string
    number?: string
    expiration_month?: string
    expiration_year?: string
    name?: string
    cvv?: string
    [key: string]: string
  }

  export interface Response {
    id: string
    amount: number
    original_amount: number
    is_partial: boolean
    currency_code: string
    country_code: string
    /**One of the following:
* ACT - Active and awaiting payment. Can be updated.
* CAN - Canceled by the merchant or the customer's bank.
* CLO - Closed and paid.
* ERR - Error. An attempt was made to create or complete a payment, but it failed.
* EXP - The payment has expired.
* NEW - Not closed.
* REV - Reversed by Rapyd. See cancel_reason, above.
*/
    status: "ACT" | "CAN" | "CLO" | "ERR" | "EXP" | "NEW" | "REV"
    description: string
    merchant_reference_id: string
    customer_token: string
    payment_method: string
    payment_method_data: PaymentMethodData
    expiration: number
    captured: boolean
    refunded: boolean
    refunded_amount: number
    receipt_email: string
    redirect_url: string
    complete_payment_url: string
    error_payment_url: string
    receipt_number: string
    flow_type: string
    address: Address
    statement_descriptor: string
    transaction_id: string
    created_at: number
    metadata: Metadata2
    failure_code: string
    failure_message: string
    paid: boolean
    paid_at: number
    dispute: any
    refunds: any
    order: any
    outcome: any
    visual_codes: VisualCodes
    textual_codes: TextualCodes
    instructions: any[]
    ewallet_id: string
    ewallets: Ewallet[]
    payment_method_options: PaymentMethodOptions
    payment_method_type: string
    payment_method_type_category: string
    fx_rate: number
    merchant_requested_currency: any
    merchant_requested_amount: any
    fixed_side: string
    payment_fees: any
    invoice: string
    escrow: any
    group_payment: string
    cancel_reason: any
    initiation_type: string
    mid: string
    next_action: string
  }

  export interface PaymentMethodData {
    id: string
    type: string
    category: string
    metadata: any
    image: string
    webhook_url: string
    supporting_documentation: string
    name: string
    last4: string
    acs_check: string
    cvv_check: string
    bin_details: BinDetails
    expiration_year: string
    expiration_month: string
    fingerprint_token: string
  }

  export interface BinDetails {
    brand: any
    bin_number: string
  }

  export interface Address {
    id: string
    name: string
    line_1: string
    line_2: string
    line_3: string
    city: string
    state: string
    country: string
    zip: string
    phone_number: string
    metadata: Metadata
    canton: string
    district: string
    created_at: number
  }

  export interface Metadata { }

  export interface Metadata2 {
    name: string
    image: string
    category: string
  }

  export interface VisualCodes { }

  export interface TextualCodes { }

  export interface Ewallet {
    ewallet_id: string
    amount: number
    percent: number
    refunded_amount: number
  }

  export interface PaymentMethodOptions { }

}


export namespace ListPayments {

  export interface Response {
    type: string
    name: string
    category: categories
    image: string
    country: string
    payment_flow_type: payment_flow_type
    currencies: string[]
    status: number
    is_cancelable: boolean
    payment_options: ListPayments.PaymentOption[]
    is_expirable: boolean
    is_online: boolean
    is_refundable: boolean
    minimum_expiration_seconds: number
    maximum_expiration_seconds: number
    virtual_payment_method_type: string
    is_virtual: boolean
    multiple_overage_allowed: boolean
    amount_range_per_currency: ListPayments.AmountRangePerCurrency[]
    is_tokenizable: boolean
  }

  export interface PaymentOption {
    name: string
    type: "string" | "number" | "boolean"
    regex: string
    description: string
    is_required: boolean
    is_updatable: boolean
  }

  export interface AmountRangePerCurrency {
    currency: string
    maximum_amount: any
    minimum_amount: any
  }
}

export namespace RequiredFields {

  export interface Response {
    type: string
    fields: Field[]
    payment_method_options: RequiredFields.PaymentMethodOption[]
    payment_options: RequiredFields.PaymentMethodOption[]
    minimum_expiration_seconds: number
    maximum_expiration_seconds: number
  }

  export interface Field {
    name: string | "number" | "expiration_month" | "expiration_year" | "name" | "cvv"
    type: string
    regex: string
    is_required: boolean
    instructions: string
  }

  export interface PaymentMethodOption {
    name: string
    type: string
    regex: string
    description: string
    is_required: boolean
    is_updatable: boolean
  }


}


export namespace completePaymentRequest {
  export interface Cash {
    /** Payment Id */
    token: string;
  }
  export interface Card {
    /** Payment Id */
    token: string;
  }
  export interface BankTransfer {
    /** Payment Id */
    token: string;
    /** Original Payment Amount */
    param2: string;
  }
  export interface BankRedirect {
    /** Payment Id */
    token: string;
    /** rapyd */
    param1: string;
    /** success */
    param2: string;
  }

}
export namespace completePaymentResponse {
  export interface Response extends PostCreatePayment.Response {
    id: string
    amount: number
    original_amount: number
    is_partial: boolean
    currency_code: string
    country_code: string
    status: "ACT" | "CAN" | "CLO" | "ERR" | "EXP" | "NEW" | "REV"
    description: string
    merchant_reference_id: string
    customer_token: string
    payment_method: string
    payment_method_data: PaymentMethodData
    expiration: number
    captured: boolean
    refunded: boolean
    refunded_amount: number
    receipt_email: string
    redirect_url: string
    complete_payment_url: string
    error_payment_url: string
    receipt_number: string
    flow_type: string
    address: Address
    statement_descriptor: string
    transaction_id: string
    created_at: number
    metadata: Metadata2
    failure_code: string
    failure_message: string
    paid: boolean
    paid_at: number
    dispute: any
    refunds: any
    order: any
    outcome: any
    visual_codes: VisualCodes
    textual_codes: TextualCodes
    instructions: any[]
    ewallet_id: string
    ewallets: Ewallet[]
    payment_method_options: PaymentMethodOptions
    payment_method_type: string
    payment_method_type_category: string
    fx_rate: number
    merchant_requested_currency: any
    merchant_requested_amount: any
    fixed_side: string
    payment_fees: any
    invoice: string
    escrow: any
    group_payment: string
    cancel_reason: any
    initiation_type: string
    mid: string
    next_action: string
  }

  export interface PaymentMethodData {
    id: string
    type: string
    category: string
    metadata: any
    image: string
    webhook_url: string
    supporting_documentation: string
    name: string
    last4: string
    acs_check: string
    cvv_check: string
    bin_details: BinDetails
    expiration_year: string
    expiration_month: string
    fingerprint_token: string
  }

  export interface BinDetails {
    brand: any
    bin_number: string
  }

  export interface Address {
    id: string
    name: string
    line_1: string
    line_2: string
    line_3: string
    city: string
    state: string
    country: string
    zip: string
    phone_number: string
    metadata: Metadata
    canton: string
    district: string
    created_at: number
  }

  export interface Metadata { }

  export interface Metadata2 {
    name: string
    image: string
    category: string
  }

  export interface VisualCodes { }

  export interface TextualCodes { }

  export interface Ewallet {
    ewallet_id: string
    amount: number
    percent: number
    refunded_amount: number
  }

  export interface PaymentMethodOptions {
    "3d_required": boolean
  }

}
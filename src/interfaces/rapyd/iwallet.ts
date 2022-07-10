import { IAccType } from "./general";
import { IContact } from "./icontact";
import { WalletTransactionTypes } from "./types";

export interface IWallet {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  email?: string;

  /**
   * Set by the user.
   */
  ewallet_reference_id: string;
  metadata: any;
  type?: IAccType;
  contact?: IContact;
  contacts?: {
    data: IContact[];
    has_more: boolean;
    total_count: number;
    /**
     *  Example "/v1/ewallets/ewallet_c633f0da4a5997a71918940c95a3aae0/contacts"
     */
    url: string;
  };
}

export interface WalletBalanceResponse {
  id: string;
  currency: string;
  alias: string;
  balance: number;
  received_balance: number;
  on_hold_balance: number;
  reserve_balance: number;
  limits: any;
  limit: any;
}

export namespace TransferToWallet {
  export interface Request {
    source_ewallet: string;
    phone_number: string;
    amount: number;
    currency: string;
    destination_ewallet: string;
    metadata: any;
  }
  export interface Response {
    id: string;
    /**
         ** accept - The transferee accepts the transfer.
        * cancel - The sender cancels the transaction.
        * decline - The transferee declines to accept the transfer.

        Response - One of the following:
        * CAN - The sender canceled the transaction.
        * DEC - The transferee declined to accept the transfer.
        * PEN - Pending. Waiting for the transferee to respond.
        * CLO - Closed. The transferee accepted the transfer.

        Other transactions:
        * CANCELED
        * CLOSED
         */
    status: "PEN" | "CLO" | "DEC" | "CAN";
    amount: number;
    currency_code: string;
    destination_phone_number: string;
    destination_ewallet_id: string;
    destination_transaction_id: string;
    source_ewallet_id: string;
    source_transaction_id: string;
    transfer_response_at: number;
    created_at: number;

    /** metadata set by who made the request  (source's metadata)*/
    metadata: any;
    /** metadata set by the response (destination's metadata)*/
    response_metadata: any;
  }

  export interface Set_Response {
    /** The transfer id */
    id: string;
    /** The desired status */
    status: "accept" | "cancel" | "decline";
    metadata?: any;
  }
}

export namespace ICurrency {
  export interface QueryRequest {
    sell_currency: string;
    buy_currency: string;
    action_type: "payment" | "payout";
  }
  export interface Response {
    sell_currency: string;
    buy_currency: string;
    action_type: "payment" | "payout";
    fixed_side: any;
    rate: number;
    date: string;
    sell_amount: any;
    buy_amount: any;
  }
}

export interface IWalletTransaction {
  id: string;
  amount: number;
  currency: string;
  ewallet_id: string;
  type: WalletTransactionTypes;
  balance_type: string;
  balance?: number;
  created_at: number;
  status: string;
  reason: string;
}
export const wallet_transaction_description = {
  /**
   * Funds transferred from a bank account to a wallet via an issued bank account number.
   */
  bank_issuing_in: "Bank transfer received",
  /**
   * Funds returned to wallet from canceled or rejected payout.
   */
  payout_funds_in: "Cancellation of disbursement",
  /**
   * Refund against funds paid out to a card issued by Rapyd.
   */
  card_issuing_in: "Card payout reversal",
  /**
   * Adjust the amount of a transaction made by an issued card.
   */
  card_issuing_adjustment: "Card issuing adjustment",
  /**
   * Funds deposited to wallet at point of sale.
   */
  deposit_funds: "Deposit at POS",
  /**
   * Funds paid out via a payout.
   */
  payout_funds_out: "Disbursement",
  /**
   * Funds paid out from wallet to a service provider.
   */
  provider_service_funds_out: "Disbursement to service provider",
  /**
   * Funds added to wallet.
   */
  add_funds: "Funds added",
  /**
   * Funds collected to wallet.
   */
  payment_funds_in: "Funds collected",
  /**
   * Funds paid out from wallet via issued card.
   */
  card_issuing_out: "Funds paid out via card",
  /**
   * Funds removed from wallet.
   */
  remove_funds: "Funds removed",
  /**
   * Transfers funds from the 'available_balance' to the 'on_hold_balance'.
   */
  put_funds_on_hold: "Put funds on hold",
  /**
   * Funds refunded against a payment.
   */
  payment_funds_out: "Refund against funds collected",
  /**
   * Wallet credited with funds released from escrow.
   */
  release_escrow: "Release from escrow",
  /**
   * Transfers wallet funds from the on-hold balance to the available balance.
   */
  release_on_hold_funds: "Release on-hold funds",
  /**
   * Funds transferred between two wallets.
   */
  p2p_transfer: "Wallet-to-wallet transfer",
  /**
   * Cash withdrawn from wallet at point of sale.
   */
  withdraw_funds: "Withdrawal at POS",
};

export namespace ICreateChckoutPage {
  export interface Request {
    amount: number;
    complete_payment_url: string;
    country: string;
    currency: string;
    error_payment_url: string;
    merchant_reference_id: string;
    cardholder_preferred_currency: boolean;
    language: string;
    metadata: Metadata;
    payment_method_types_include: any[];
    expiration: number;
    payment_method_types_exclude: any[];
    custom_elements: CustomElements;
  }

  export interface Metadata {
    merchant_defined: boolean;
  }

  export interface CustomElements {
    save_card_default: boolean;
    display_description: boolean;
    payment_fees_display: boolean;
    merchant_currency_only: boolean;
    billing_address_collect: boolean;
    dynamic_currency_conversion: boolean;
  }

  export interface Response {
    id: string;
    status: string;
    cancel_url: string;
    complete_url: string;
    language: string;
    merchant_color: string;
    merchant_logo: string;
    merchant_website: string;
    merchant_language: string;
    merchant_customer_support: MerchantCustomerSupport;
    merchant_alias: string;
    merchant_terms: string;
    merchant_privacy_policy: string;
    page_expiration: number;
    redirect_url: string;
    cancel_checkout_url: string;
    complete_checkout_url: string;
    country: string;
    currency: string;
    amount: number;
    payment: Payment;
    payment_method_type: string;
    payment_method_type_categories: any;
    payment_method_types_include: any[];
    payment_method_types_exclude: any[];
    customer: string;
    customer_data: any;
    country_name: string;
    custom_elements: CustomElements;
    timestamp: number;
    payment_expiration: any;
    cart_items: any[];
    complete_checkout_auto_redirect: boolean;
    region: string;
    escrow: any;
    escrow_release_days: any;
  }

  export interface MerchantCustomerSupport {
    url: string;
    email: string;
    phone_number: string;
  }

  export interface Payment {
    id: string;
    amount: number;
    original_amount: number;
    is_partial: boolean;
    currency_code: string;
    country_code: string;
    status: string;
    description: string;
    merchant_reference_id: string;
    customer_token: string;
    expiration: number;
    captured: boolean;
    refunded: boolean;
    refunded_amount: number;
    receipt_email: string;
    redirect_url: string;
    complete_payment_url: string;
    error_payment_url: string;
    receipt_number: string;
    flow_type: string;
    address: any;
    statement_descriptor: string;
    transaction_id: string;
    created_at: number;
    updated_at: number;
    metadata: Metadata;
    failure_code: string;
    failure_message: string;
    paid: boolean;
    paid_at: number;
    dispute: any;
    refunds: any;
    order: any;
    outcome: any;
    visual_codes: VisualCodes;
    textual_codes: TextualCodes;
    instructions: Instructions;
    ewallet_id: any;
    ewallets: any[];
    payment_method_options: PaymentMethodOptions;
    payment_method_type: string;
    payment_method_type_category: string;
    fx_rate: string;
    merchant_requested_currency: any;
    merchant_requested_amount: any;
    payment_fees: any;
    invoice: string;
    escrow: any;
  }

  export interface Metadata {
    merchant_defined: boolean;
  }

  export interface VisualCodes {}

  export interface TextualCodes {}

  export interface Instructions {}

  export interface PaymentMethodOptions {}

  export interface CustomElements {
    save_card_default: boolean;
    display_description: boolean;
    payment_fees_display: boolean;
    merchant_currency_only: boolean;
    billing_address_collect: boolean;
    dynamic_currency_conversion: boolean;
    merchant_color: any;
  }
}

export namespace IdentityVerification {
  export interface Request {
    reference_id: string;
    ewallet: string;
    contact: string;
    complete_url: string;
    cancel_url: string;
    page_expiration: number;
  }

  export interface Response {
    id: string;
    status: string;
    reference_id: string;
    wallet: string;
    contact: string;
    language: any;
    country: any;
    page_expiration: number;
    request_type: string;
    send_callback: any;
    valid_countries: any;
    redirect_url: string;
    merchant_website: string;
    merchant_color: string;
    merchant_design: any;
    merchant_language: any;
    merchant_logo: string;
    cancel_url: any;
    complete_url: any;
  }
}

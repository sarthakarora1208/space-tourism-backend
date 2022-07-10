import { IWallet } from "./../rapyd/iwallet";
import { customer_id, kycid_id, sender_id } from "./../rapyd/types.d";
import { IContact } from "../rapyd/icontact";
import { ewallet_id } from "../rapyd/types";
import { IDBSecurity } from "./isecurity";
import { IResponseCreateWallet } from "./idbwallet";

export interface IDBContact {
  /** local contact id */
  contact_reference_id?: number;
  /** rapyd id */
  contact?: string;
  /** rapyd id */
  email?: string;
  /** rapyd id */
  ewallet?: ewallet_id;
  /** rapyd id */
  customer?: customer_id;
  /** rapyd id */
  kycid?: kycid_id;

  /** data stored in rapyd servers */
  rapyd_contact_data?: IContact;
  /** data stored in rapyd servers */
  rapyd_wallet_data?: IResponseCreateWallet.Root;

  phone_number?: string;
  security?: IDBSecurity;
  meta?: object;
}

export interface ICreateCustomer {
  business_vat_id: string;
  email: string;
  ewallet: string;
  invoice_prefix: string;
  metadata: any;
  name: string;
  phone_number: string;
}

export interface ICreateCustomerResponse {
  id: string;
  delinquent: boolean;
  discount: any;
  name: string;
  default_payment_method: string;
  description: string;
  email: string;
  phone_number: string;
  invoice_prefix: string;
  addresses: any[];
  payment_methods: any;
  subscriptions: any;
  created_at: number;
  metadata: any;
  business_vat_id: string;
  ewallet: string;
}

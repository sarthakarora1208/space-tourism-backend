import { contact_id, customer_id } from "./../rapyd/types.d";
import { IWallet, WalletBalanceResponse } from "./../rapyd/iwallet";
import { ewallet_id } from "../rapyd/types";
import { IDBSecurity } from "./isecurity";
/**
 *
ewallet_reference_id VARCHAR ( 255 ) PRIMARY KEY,
id VARCHAR ( 255 ),
phone_number VARCHAR ( 255 ),
email VARCHAR ( 255 ),
contact_id VARCHAR ( 255 ),
contact_reference_id VARCHAR ( 255 ),
data TEXT

 */

export interface IDBWallet {
  ewallet_reference_id?: number;
  id?: contact_id;
  email?: string;
  ewallet: ewallet_id;
  contact_id: string;
  customer?: customer_id;
  contact_reference_id: string;
  phone_number?: string;
  security: IDBSecurity;
  meta: object;
  data: IWallet;
}

export namespace ICreateWallet {
  export interface Root {
    type: "person" | "business";
    ewallet_reference_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    contact: Contact;
  }

  export interface Contact {
    first_name: string;
    last_name: string;
    address: null;
    contact_type: "personal";
    phone_number: string;
    email: string;
    country: string;
  }

  export interface Form {
    first_name: string;
    last_name: string;
    email: string;
    country: string;
  }
}

export namespace IResponseCreateWallet {
  export interface Root {
    phone_number: string;
    email: string;
    first_name: string;
    last_name: string;
    id: string;
    status: string;
    accounts: WalletBalanceResponse[];
    verification_status: string;
    type: string;
    metadata: any;
    ewallet_reference_id: string;
    category: any;
    contacts: Contacts;
  }

  export interface Contacts {
    data: Daum[];
    has_more: boolean;
    total_count: number;
    url: string;
  }

  export interface Daum {
    id: string;
    first_name: string;
    last_name: string;
    middle_name: string;
    second_last_name: string;
    gender: string;
    marital_status: string;
    house_type: string;
    contact_type: string;
    phone_number: string;
    email: string;
    identification_type: string;
    identification_number: string;
    preferred_name: string;
    date_of_birth: any;
    country: string;
    nationality: any;
    address: any;
    ewallet: string;
    created_at: number;
    metadata: any;
    business_details: any;
    compliance_profile: number;
    verification_status: string;
    send_notifications: boolean;
    mothers_name: string;
  }
}

export interface IWallet2Wallet {
  contact_reference_id: number;
  phone_number: string;
  amount: number;
  currecny: "USD";
  message: string;
}

import { IContact } from './icontact';
import { IAddress } from "./iaddress";

export interface IssueVccRequest {
    ewallet_contact: string
    country: string
    metadata: any
}

export interface IssueVccRequestForm {
    address: IAddress,
    date_of_birth: string,
    country: string
}
export interface IssueVccResponse {
    id: string
    ewallet_contact: IContact
    status: string
    card_id: string
    assigned_at: number
    activated_at: number
    metadata: any
    country_iso_alpha_2: string
    created_at: number
    blocked_reason: string
    card_tracking_id: any
    card_program: any
    card_number: string
    cvv: string
    expiration_month: string
    expiration_year: string
    bin: string
    sub_bin: string
}
export namespace ListIssuedVcc{
    export interface Response {
        id: string
        ewallet_contact: EwalletContact
        status: "ACT"|"BLO"|"CAN"|"IMP"|"INA"
        card_id: string
        assigned_at: number
        activated_at: number
        metadata: any
        country_iso_alpha_2: string
        created_at: number
        blocked_reason: string
        card_program: any
        card_number: string
        cvv: string
        expiration_month: string
        expiration_year: string
        bin: string
        sub_bin: string
      }
  
      export interface EwalletContact {
        id: string
        first_name: string
        last_name: string
        middle_name: string
        second_last_name: string
        gender: string
        marital_status: string
        house_type: string
        contact_type: string
        phone_number: string
        email: string
        identification_type: string
        identification_number: string
        issued_card_data: IssuedCardData
        date_of_birth: string
        country: string
        nationality: any
        address: Address
        ewallet: string
        created_at: number
        metadata: any
        business_details: any
        compliance_profile: number
        verification_status: string
        send_notifications: boolean
        mothers_name: string
      }
  
      export interface IssuedCardData {
        preferred_name: string
        transaction_permissions: string
        role_in_company: string
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
        metadata: any
        canton: string
        district: string
        created_at: number
      }
  }

export namespace ListIssuedVccTransactions {
    export interface Response {
        id: string
        amount: number
        currency: string
        created_at: number
        card_id: string
        merchant_category_code: string
        merchant_name_location: string
        auth_code: string
        bin: string
        last4: string
        issuing_txn_type: string
        pos_entry_mode: string
        systems_trace_audit_number: string
        retrieval_reference_number: string
        original_transaction_id: string
        original_txn_amount: any
        original_txn_currency: string
        fx_rate: any
        card_program: string
        wallet_transaction_id: string
        authorization_approved_by: string
        card_authorization: string

    }
}

export interface ISetCardStatus {
    /**Card ID */
    card: string,
    status: "active" | "unblock" | "block"
}
export interface ISimulateCardAuthorization {
    /**Card ID */
    card_id: string,
    amount:number,
    currency: "USD"
}


// Frontend-server interface
export interface ICreateVccToUser {
    contact_reference_id: number
    metadata: {
        name: string
        [key:string]:any
    }
}
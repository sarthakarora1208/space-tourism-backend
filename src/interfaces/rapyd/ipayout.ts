import { RequiredFields } from "./ipayment";

export namespace IListPayout {

    export interface Response {
        payout_method_type: string
        name: string
        is_cancelable: number
        is_expirable: number
        is_location_specific: number
        is_online: number
        status: number
        image: string
        category: string
        beneficiary_country: string
        payout_currencies: string[]
        sender_entity_types: string[]
        beneficiary_entity_types: string[]
        amount_range_per_currency: AmountRangePerCurrency[]
        minimum_expiration_seconds: any
        maximum_expiration_seconds: any
        sender_currencies: string[]
    }

    export interface AmountRangePerCurrency {
        maximum_amount?: number
        minimum_amount?: number
        // filter anything that isn't USD
        payout_currency: string
    }
}

export namespace IGetPayoutRequiredFields {
    export interface Response {
        payout_method_type: string
        sender_currency: string
        sender_country: string
        sender_entity_type: string
        beneficiary_country: string
        payout_currency: string
        beneficiary_entity_type: string
        is_cancelable: number
        is_location_specific: number
        is_expirable: number
        minimum_expiration_seconds: any
        maximum_expiration_seconds: any
        is_online: number
        image: string
        status: number
        beneficiary_required_fields: RequiredFields.Field[]
        sender_required_fields: RequiredFields.Field[]
        payout_options: any[]
        minimum_amount: number
        maximum_amount: number
        batch_file_header: string
    }

    export interface QueryRequest {
        sender_country: string
        beneficiary_country: string
        payout_currency: string
        payout_amount: number
        payout_method_type: string
    }
}

export namespace ICreatePayout {
    export interface Request {
        beneficiary: Beneficiary
        beneficiary_country: string
        beneficiary_entity_type: string
        description: string
        payout_method_type: string
        ewallet: string
        metadata?: any
        payout_amount: any
        payout_currency: string
        sender_country: string
        sender_currency: string
        sender_entity_type: string
        merchant_reference_id?: string
        sender?: Sender
        statement_descriptor?: string
        confirm_automatically?: boolean
    }
    export interface Beneficiary {
        first_name?: string
        last_name?: string
        account_number?: string
        payment_type?: string
        address?: string
        city?: string
        country?: string
        state?: string
        phone_number?: string
        postcode?: string
        aba?: string
        identification_type?: string
        identification_value?: string
        email?: string
        card_number?: string
        card_expiration_month?: string
        card_expiration_year?: string
        card_cvv?: string
        company_name?: string

        // response
        entity_type: string
        name: string
        currency: string
        id?: string

    }
    export interface Sender {
        first_name?: string
        last_name?: string
        identification_type?: string
        identification_value?: string
        phone_number: string
        occupation?: string
        source_of_income?: string
        date_of_birth?: string
        address?: string
        purpose_code?: string
        beneficiary_relationship?: string
        company_name?: string
        city?: string
        state?: string

        // response
        country: string
        entity_type: string
        currency: string
        id?: string
        name?: string
    }

    // send
    export interface Response {
        id: string
        payout_type: string
        payout_method_type: string
        amount: number
        payout_currency: string
        sender_amount: number
        sender_currency: string
        status: string
        sender_country: string
        sender: Sender
        beneficiary_country: string
        beneficiary: Beneficiary
        fx_rate: number
        instructions: Instructions
        ewallets: Ewallet[]
        metadata: Metadata
        description: string
        created_at: number
        payout_fees: any
        expiration: any
        paid_at: any
        identifier_type: any
        identifier_value: any
        error: any
        paid_amount: number
        statement_descriptor: any
        gc_error_code?: string
        merchant_reference_id?: string
    }



    export interface Instructions {
        name?: string
        steps?: Step[]
    }

    export interface Step {
        step1: string
    }

    export interface Ewallet {
        ewallet_id: string
        amount: number
        percent: number
    }

    export interface Metadata {
        merchant_defined: boolean
    }


}

export interface ISimulateTransaction{
    success:boolean;
    message:string;
    error_code:string;
}
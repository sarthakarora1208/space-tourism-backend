import { IDBContact } from './../db/idbcontact';
export interface ISender {
    /**
    * ID of the Sender object. String starting with sender_.
    */
    sender?: string;

    /**
    * ID of the Sender object. String starting with sender_. Response only.
    */
    id?: string;
    /**
    * Name of the sender company. Relevant when entity_type is company.
    */
    company_name?: string;
    /**
    * Country of the sender. Two-letter ISO 3166-1 ALPHA-2 code. Uppercase.
    */
    country?: string;
    /**
    * Currency that the sender is paying with. Three-letter ISO 4217 code. Uppercase.
    */
    currency?: string;
    /**
    * Indicates whether a request to delete a sender from the Rapyd platform succeeded. Response only.
    */
    deleted?: Boolean;
    /**
    * Type of entity. One of the following values:
    individual
    company
    */
    entity_type?: "individual" | "company";
    /**
    * First name of the sender. Relevant when entity_type is individual.
    */
    first_name?: string;
    /**
    * Type of identification document for the sender. When entity_type is company, this field must be company_registered_number.
    When entity_type is individual, one of the following values:
    * drivers_license
    * identification_id
    * international_passport
    * residence_permit
    * social_security
    * work_permit
    */
    identification_type?: "company_registered_number" | "drivers_license" | "identification_id" | "international_passport" | "residence_permit" | "social_security" | "work_permit";
    /**
    * Identification number on the document mentioned in identification_type.
    */
    identification_value?: string;
    /**
    * Last name of the sender. Relevant when entity_type is individual.
    */
    last_name?: string;

    // additional fields
    phone_number: string
    date_of_birth: string
    address: string

    // payout details
    purpose_code: string
    beneficiary_relationship: string
    occupation: string
    source_of_income: string
  
}

export interface MetaContactToSender{
    /**
     * three letter currency
     */
    currency:string;
    // payout details
    purpose_code: string
    beneficiary_relationship: string
    occupation: string
    source_of_income: string
    
}

export interface IContactAndSender{
    contact:IDBContact
    meta:MetaContactToSender
}
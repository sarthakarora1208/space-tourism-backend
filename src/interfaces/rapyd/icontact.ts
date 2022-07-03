import { IAddress } from "./iaddress";
import { address_id, contact_id, contact_type, dateformate, ewallet_id } from "./types";


export interface IContact {
    /**
    * ID of the Contact object. String starting with cont_.
    */
    id?: contact_id;
    /**
    * Address of this contact person. Required when the client issues a card to the contact.
    
    This can be an Address object or the ID of an address object created with Create Address. For more information, see Address Object.
    */
    address?: IAddress | address_id;
    /**
    * Describes additional information for business entities. See Business Details Object, below.
    
    Required when type is company.
    */
    business_details?: object;
    /**
    * Indicates the degree to which this contact can use the wallet. One of the following:
    * 1 - All transactions are allowed.
    * 0 - The wallet is limited, and the contact must complete the identity verification process.
    * -1 - The wallet is restricted and cannot be used for any transactions.
    
    Response only.
    */
    compliance_profile?: number;
    /**
    * Type of contact. One of the following:
    personal - An individual customer.
    business - A business customer.
    */
    contact_type?: contact_type;
    /**
    * The two-letter ISO 3166-1 ALPHA-2 code for the country. Uppercase.
    
    To determine the code for a country, see List Countries.
    */
    country?: string;
    /**
    * Time of creation of the Contact object, in Unix time. Response only.
    */
    created_at?: number;
    /**
    * Date of birth of the individual. Format: MM/DD/YYYY
    */
    date_of_birth?: dateformate;
    /**
    * Email address of the contact.
    */
    email?: string;
    /**
    * ID of the Rapyd Wallet that this contact is associated with. String starting with ewallet_.
    */
    ewallet: ewallet_id;
    /**
    * First name of the personal contact or primary person associated with the business contact.
    */
    first_name?: string;
    /**
    * Gender of the personal contact or primary person associated with the business contact. One of the following values:
    male
    female
    other
    not_applicable
    */
    gender?: string;
    /**
    * Description of the type of residency at the contact's residence. One of the following values:
    lease - A long-term lease.
    live_with_family - The contact lives with family.
    own - The contact owns the residence.
    owner - The contact is the owner of the residence.
    month_to_month - An informal agreement, renewable each month.
    housing_project - A room in a large residence facility, such as a residence hall or senior citizens' home.
    */
    house_type?: string;
    /**
    * ID number as shown by the ID document.
    */
    identification_number?: string;
    /**
    * Type of the identification document associated with the contact. Must be uppercase.
    
    For types that are valid in the country, use List Official Identification Documents.
    */
    identification_type?: "company_registered_number" | "drivers_license" | "identification_id" | "international_passport" | "residence_permit" | "social_security" | "work_permit";
    /**
    * Family name of the personal contact or primary person associated with the business contact. This field is required to issue a card to a personal contact.
    */
    last_name?: string;
    /**
    * Marital status of the personal contact or primary person associated with the business contact. One of the following values:
    married
    single
    divorced
    widowed
    cohabiting
    not_applicable
    */
    marital_status?: string;
    /**
    * A JSON object defined by the client.
    */
    metadata?: object;
    /**
    * Middle name of the personal contact or primary person associated with the business contact.
    */
    middle_name?: string;
    /**
    * Name of the mother of the personal contact or primary person associated with the business contact. Alphabetic characters and spaces.
    */
    mothers_name?: string;
    /**
    * The citizenship of the contact. Two-letter ISO 3166-1 ALPHA-2 code for the country. Uppercase.
    
    To determine the code for a country, see List Countries.
    */
    nationality?: string;
    /**
    * Phone number of the contact in E.164 format.
    */
    phone_number?: string;
    /**
    * Second last name of the personal contact or primary person associated with the business contact.
    */
    second_last_name?: string;
    /**
    * Determines whether Rapyd sends notifications to the contact. Default is false.
    */
    send_notifications?: Boolean;
    /**
    * Result of the verification check. One of the following:
    not verified - The contact has not been submitted for the Know Your Customer checks.
    KYCd - The user has passed the Know Your Customer checks.
    */
    verification_status?: string;
}
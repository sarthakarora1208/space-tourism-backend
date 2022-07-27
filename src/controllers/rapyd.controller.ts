import { Request, Response, NextFunction } from "express";
import RapydService from "../services/rapydService";
import asyncHandler from "../middleware/async";

import { ICreateCustomer } from "../interfaces/db/idbcontact";
import { makeId } from "../utils/makeId";
import { IdentityVerification } from "../interfaces/rapyd/iwallet";
import {
  ICreateVirtualAccount,
  ISimulateBankTransfer,
} from "../interfaces/db/idbvirtualaccount";
import { Business } from "../entities/Business";

//@desc
//@route		POST /api/v1/
//@access		Public

export const createWallet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const rapydService = new RapydService();
    // let wallet: ICreateWallet.Root = {
    //   phone_number: "923456789",
    //   first_name: "first name",
    //   last_name: "last name",
    //   email: "email2@gmail.com",
    //   type: "person",
    //   ewallet_reference_id: "1234567890",
    //   contact: {
    //     address: null,
    //     phone_number: "923456789",
    //     contact_type: "personal",
    //     country: "GB",
    //     email: "email2@gmail.com",
    //     first_name: "first name",
    //     last_name: "last name",
    //   },
    // };
    // const rapydService = new RapydService();
    // let newWallet = await rapydService.createWallet(wallet);
    // console.log(newWallet);
    // let rapyd_contact = newWallet!.contacts.data[0];
    // let customer: ICreateCustomer = {
    //   name: rapyd_contact.first_name + " " + rapyd_contact!.last_name,
    //   phone_number: rapyd_contact.phone_number,
    //   metadata: {
    //     contact_reference_id: "1234567891",
    //   },
    //   business_vat_id: "123456789",
    //   ewallet: newWallet!.id,
    //   email: "email1@gmail.com",
    //   invoice_prefix: makeId(4) + "-",
    // };
    // let newCustomer = await rapydService.createCustomer(customer);
    // console.log(newCustomer);
    // let contacts = await rapydService.listContactsForRapydWallet(
    //   "ewallet_8a8782e022648cce7ed1bef11618eceb"
    // );
    // console.log(contacts);
    // let identityVerificationRequest: IdentityVerification.Request = {
    //   reference_id: "123456780success",
    //   ewallet: "ewallet_8a8782e022648cce7ed1bef11618eceb",
    //   contact: "cont_dc860cd603c0705ec57542a0bf4f983a",
    //   complete_url: "",
    //   cancel_url: "",
    //   page_expiration: 5,
    // };

    // let identityVerificationRequest1: IdentityVerification.Request = {
    //   reference_id: "Y8VX6dJNsuccess",
    //   ewallet: "ewallet_a2b5c1e186a95853e2c41e511a7ff12c",
    //   contact: "cont_cd0d45975cb7a4b3cef6ae564232efe1",
    //   complete_url: "",
    //   cancel_url: "",
    //   page_expiration: 5,
    // };

    // let response1 = await rapydService.generateIdentityVerificationPage(
    //   identityVerificationRequest1
    // );

    // console.log(response1);
    //let wallet = await rapydService.getWallet(
    //"ewallet_8a8782e022648cce7ed1bef11618eceb"
    //);
    //console.log(wallet);
    //if (wallet.verification_status === "verified") {
    // let createVirtualAccount: ICreateVirtualAccount = {
    //   currency: "SGD",
    //   country: "SG",
    //   description: "Description",
    //   ewallet: "ewallet_8a8782e022648cce7ed1bef11618eceb",
    //   merchant_reference_id: "5rtfgk8970dfbm",
    //   metadata: {
    //     merchant_defined: true,
    //   },
    // };
    // let response1 = await rapydService.issueVirtualAccountToWallet(
    //   createVirtualAccount
    // );
    // console.log(response1);
    let ewallet = "ewallet_689ce7f5339bc87ba7b03b37142705b1";
    let response = await rapydService.listPayouts(ewallet);
    console.log(response);
    //console.log(response.length);
    // let response = await rapydService.listVirtualAccountsByWallet(ewallet);

    // console.log(response);

    // let currency = response!.bank_accounts[0].currency;
    // let country = response!.bank_accounts[0].country_iso;

    // let methods = await rapydService.listPayoutMethodTypes(currency);
    // console.log(methods);

    // let payout_method_type = methods[0].payout_method_type;

    // let beneficiaryId = "beneficiary_d22e249947594b4f4be2c44d51a8e0ed";
    // let beneficiaryId1 = "beneficiary_1474813a33a6e2e47807d6b532e99052";
    // let beneficiaryId2 = "beneficiary_28dbb24cfce782da36a34cbff019e39c";
    // let beneficiary = await rapydService.retrieveBeneficiary(beneficiaryId2);
    // console.log(beneficiary);

    // let requiredPayoutFields = await rapydService.getPayoutRequiredFields(
    //   beneficiary.country,
    //   beneficiary.currency,
    //   beneficiary.default_payout_method_type
    // );

    // console.log(requiredPayoutFields);
    // let mandatoryFields = [
    //   "country",
    //   "currency",
    //   "first_name",
    //   "last_name",
    //   "identification_type",
    //   "identification_value",
    // ];
    // let senderBody: any = {};
    // for (
    //   let i = 0;
    //   i < requiredPayoutFields.sender_required_fields.length;
    //   i++
    // ) {
    //   let key = requiredPayoutFields.sender_required_fields[i].name;
    //   if (!mandatoryFields.includes(key)) {
    //     console.log(key);
    //     if (key === "address") {
    //       senderBody.address = "address";
    //     }
    //     if (key === "city") {
    //       senderBody.city = "city";
    //     }
    //     if (key === "state") {
    //       senderBody.state = "state";
    //     }
    //     if (key === "postcode") {
    //       senderBody.postcode = "postcode";
    //     }
    //     if (key === "date_of_birth") {
    //       senderBody.date_of_birth = "12/12/1990";
    //     }
    //     if (key === "description") {
    //       senderBody.description = "description";
    //     }
    //     if (key === "beneficiary_relationship") {
    //       senderBody.beneficiary_relationship = "supplier";
    //     }
    //     if (key === "source_of_income") {
    //       senderBody.source_of_income = "business";
    //     }
    //     if (key === "occupation") {
    //       senderBody.occupation = "space vendor";
    //     }
    //   }
    // }
    // const sender = await rapydService.createSenderWithRequiredFields(
    //   country,
    //   currency,
    //   "First Name",
    //   "Last Name",
    //   "12345678",
    //   {}
    // );
    // const sender = await rapydService.createSender(
    //   country,
    //   currency,
    //   "First Name",
    //   "Last Name",
    //   "123456789"
    // );
    //console.log(sender);
    //id: 'sender_6bb553bc04bfa863b2453a4a381858fb
    // let sender = await rapydService.retrieveSender(
    //   "sender_"6bb553bc04bfa863b2453a4a381858fb"
    // );
    // console.log(sender);

    //let senderId = "sender_6bb553bc04bfa863b2453a4a381858fb";
    // console.log("***");
    // console.log(currency);
    // let response1 = await rapydService.createBenificiaryTokenizationPage(
    //   currency,
    //   country,
    //   "123456789"
    // );
    // console.log("***");
    // console.log(response1);

    // let beneficiaryId = "beneficiary_db068fc0a031edaec9ae7bef2e32cade";

    // let beneficiary1 = await rapydService.retrieveBeneficiary(beneficiaryId);
    // console.log(beneficiary1);
    // let payout = await rapydService.createPayout(
    //   beneficiaryId,
    //   senderId,
    //   country,
    //   ewallet,
    //   "500",
    //   currency,
    //   beneficiary1.default_payout_method_type
    // );
    // console.log(payout);

    // let simulateBankTransfer: ISimulateBankTransfer = {
    //   issued_bank_account: "issuing_b80faa8884bb92dd83c67af400524f1e",
    //   amount: "100000",
    //   currency: "SGD",
    // };
    // let response1 = await rapydService.simulateBankTransfer(
    //   simulateBankTransfer
    // );
    // console.log(response1);
    //let response1 = await rapydService.retrieveVirtualAccountHistory(
    // "issuing_b80faa8884bb92dd83c67af400524f1e"
    //);

    // let response2 = await rapydService.retrieveRemitterDetails(
    //   "issuing_b80faa8884bb92dd83c67af400524f1e",
    //   "isutran_2f9207af76de14639fa64c977ce70202"
    // );
    // console.log(response2);
    //}
    // let payout_id = "payout_e3ee5f3c667bb8659d8de6d5531b8122";
    // let payout = await rapydService.completePayout(payout_id, "500");
    // console.log(payout);

    let res1 = await rapydService.listCapabilities("SG");
    console.log(res1.supported_currencies);
    res.status(200).json({ success: true });
  }
);

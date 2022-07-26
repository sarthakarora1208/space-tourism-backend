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
    let ewallet = "ewallet_8a8782e022648cce7ed1bef11618eceb";
    let response = await rapydService.listVirtualAccountsByWallet(
      "ewallet_8a8782e022648cce7ed1bef11618eceb"
    );

    console.log(response);
    let currency = response!.bank_accounts[0].currency;
    let country = response!.bank_accounts[0].country_iso;

    let methods = await rapydService.listPayoutMethodTypes(currency);

    let payout_method_type = methods[0].payout_method_type;

    let res1 = await rapydService.getPayoutRequiredFields(
      country,
      currency,
      payout_method_type
    );

    //console.log(res1);
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

    let senderId = "sender_6bb553bc04bfa863b2453a4a381858fb";
    // console.log("***");
    // console.log(currency);
    // let response1 = await rapydService.createBenificiaryTokenizationPage(
    //   currency,
    //   country,
    //   "123456789"
    // );
    // console.log("***");
    // console.log(response1);
    // let beneficiary = await rapydService.retrieveBeneficiary(
    //   "beneficiary_d26cc80727f5fa47293e52cc767ad4fc"
    // );
    // console.log(beneficiary);

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
    let payout_id = "payout_e3ee5f3c667bb8659d8de6d5531b8122";
    let payout = await rapydService.completePayout(payout_id, "500");
    console.log(payout);

    res.status(200).json({ success: true });
  }
);

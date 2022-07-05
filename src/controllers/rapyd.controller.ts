import { Request, Response, NextFunction } from "express";
import RapydService from "../services/rapydService";
import asyncHandler from "../middleware/async";

import { ICreateCustomer } from "interfaces/db/idbcontact";
import { makeId } from "../utils/makeId";
import { IdentityVerification } from "interfaces/rapyd/iwallet";
import {
  ICreateVirtualAccount,
  ISimulateBankTransfer,
} from "interfaces/db/idbvirtualaccount";

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
    //   reference_id: "123456789success",
    //   ewallet: "ewallet_8a8782e022648cce7ed1bef11618eceb",
    //   contact: "cont_dc860cd603c0705ec57542a0bf4f983a",
    //   page_expiration: 5,
    // };
    // let response1 = await rapydService.generateIdentityVerificationPage(
    //   identityVerificationRequest
    // );
    //console.log(response1);
    let wallet = await rapydService.getWallet(
      "ewallet_8a8782e022648cce7ed1bef11618eceb"
    );
    //console.log(wallet);
    if (wallet.verification_status === "verified") {
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
      //      let response = await rapydService.listVirtualAccountsByWallet(
      //       "ewallet_8a8782e022648cce7ed1bef11618eceb"
      //    );
      //   console.log(response);
      let simulateBankTransfer: ISimulateBankTransfer = {
        issued_bank_account: "issuing_b80faa8884bb92dd83c67af400524f1e",
        amount: "100",
        currency: "EUR",
      };
      let response = await rapydService.simulateBankTransfer(
        simulateBankTransfer
      );
      console.log(response);
      //let response = await rapydService.retrieveVirtualAccountHistory(
      //"issuing_b80faa8884bb92dd83c67af400524f1e"
      //);
      // let response = await rapydService.retrieveVirtualAccountTransaction(
      //   "issuing_b80faa8884bb92dd83c67af400524f1e",
      //   "isutran_2f9207af76de14639fa64c977ce70202"
      // );
      // console.log(response);
    }

    res.status(200).json({ success: true });
  }
);

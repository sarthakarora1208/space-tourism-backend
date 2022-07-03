import { Request, Response, NextFunction } from "express";
import { ICreateWallet } from "interfaces/db/idbwallet";
import RapydService from "../services/rapydService";
import asyncHandler from "../middleware/async";

//@desc
//@route		POST /api/v1/
//@access		Public

export const createWallet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let wallet: ICreateWallet.Root = {
      phone_number: "12345678",
      first_name: "first name",
      last_name: "last name",
      email: "email1@gmail.com",
      type: "person",
      ewallet_reference_id: "12345678",
      contact: {
        address: null,
        phone_number: "12345678",
        contact_type: "personal",
        country: "GB",
        email: "email1@gmail.com",
        first_name: "first name",
        last_name: "last name",
      },
    };
    const rapydService = new RapydService();
    let newWallet = await rapydService.createWallet(wallet);
    console.log(newWallet);
  }
);

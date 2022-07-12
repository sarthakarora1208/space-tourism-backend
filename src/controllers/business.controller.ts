import asyncHandler from "../middleware/async";
import ErrorResponse from "../utils/errorResponse";
import { Request, Response, NextFunction } from "express";
import { Business } from "../entities/Business";
import { User } from "../entities/User";
import { dataSource } from "../server";
import { SpaceService } from "../entities/SpaceService";
import { IdentityVerification } from "../interfaces/rapyd/iwallet";
import RapydService from "../services/rapydService";
import { makeId } from "../utils/makeId";
import { ISimulateBankTransfer } from "../interfaces/db/idbvirtualaccount";

//@desc			Mark Business Verified
//@route		POST /api/v1/business/:id/verified
//@access		Public

export const markIsBusinessVerified = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const businessRepository = dataSource.getRepository(Business);

    const id = req.params.id;

    const business = await businessRepository.findOne({
      where: { id },
    });

    if (!business) {
      return next(new ErrorResponse(`No business with id ${id}`, 404));
    }

    businessRepository.merge(business, {
      isVerified: true,
    });

    let newBusiness = await businessRepository.save(business);

    res.status(200).json({
      success: true,
      data: newBusiness,
    });
  }
);

//@desc			Get all services for business
//@route		GET /api/v1/business/:id/services
//@access		Public

export const getServicesForBusiness = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const spaceServiceRepository = dataSource.getRepository(SpaceService);

    let spaceServices: SpaceService[] = [];

    if (req.params.businessId) {
      const id = req.params.businessId;
      spaceServices = await spaceServiceRepository.find({
        where: { business: { id } },
      });
    } else {
      return next(new ErrorResponse(`Invalid business id`, 404));
    }
    res.status(200).json({
      success: true,
      data: {
        spaceServices,
      },
    });
  }
);

//@desc		Get business by Id
//@route		GET /api/v1/business/:id
//@access		Public

export const getBusinessById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const businessRepository = dataSource.getRepository(Business);
    const id = req.params.id;

    const business = await businessRepository.findOne({
      where: { id },
      relations: ["users"],
    });

    if (!business) {
      return next(
        new ErrorResponse(`Business not found with id of ${id}`, 404)
      );
    }
    res.status(200).json({
      success: true,
      data: business,
    });
  }
);

//@desc
//@route		POST /api/v1/business/:id/verify-identity
//@access		Public

export const verifyIdentity = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const rapydService = new RapydService();
    const businessRepository = dataSource.getRepository(Business);

    const id = req.params.id;

    const business = await businessRepository.findOne({
      where: { id },
      relations: ["users"],
    });

    if (!business) {
      return next(
        new ErrorResponse(`Business not found with id of ${id}`, 404)
      );
    }

    let identityVerificationRequest: IdentityVerification.Request = {
      reference_id: `${makeId(9)}success`,
      ewallet: business.eWallet,
      contact: business.contact,
      complete_url: "",
      cancel_url: "",
      page_expiration: 5,
    };
    console.log(identityVerificationRequest);

    let response = await rapydService.generateIdentityVerificationPage(
      identityVerificationRequest
    );

    if (!business) {
      return next(new ErrorResponse(`Couldn't verify identity`, 404));
    }

    res.status(200).json({
      success: true,
      data: response?.redirect_url,
    });
  }
);

//@desc
//@route		GET /api/v1/business/:id/accounts
//@access		Public

export const getVirtualAccounts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const rapydService = new RapydService();
    const businessRepository = dataSource.getRepository(Business);

    const id = req.params.id;

    const business = await businessRepository.findOne({
      where: { id },
      relations: ["users"],
    });

    if (!business) {
      return next(
        new ErrorResponse(`Business not found with id of ${id}`, 404)
      );
    }
    console.log(business.eWallet);
    let response = await rapydService.listVirtualAccountsByWallet(
      business.eWallet
    );

    console.log(response);

    res.status(200).json({
      success: true,
      data: response?.bank_accounts,
    });
  }
);

//@desc
//@route		POST /api/v1/business/:id/transactions
//@access		Public

export const getTransactionsForBankAccount = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const rapydService = new RapydService();
    const id = req.params.id;

    let response = await rapydService.retrieveVirtualAccountHistory(id);

    res.status(200).json({
      success: true,
      data: {
        bank_account: response.bank_account,
        transactions: response.transactions,
        currency: response.currency,
      },
    });
  }
);

//@desc
//@route		POST /api/v1/business/simulate-bank-transfer
//@access		Public

export const simulateBankTransfer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const rapydService = new RapydService();

    let { issued_bank_account, amount, currency } = req.body;
    let simulateBankTransfer: ISimulateBankTransfer = {
      issued_bank_account,
      amount,
      currency,
    };

    let response = await rapydService.simulateBankTransfer(
      simulateBankTransfer
    );
    res.status(200).json({
      success: true,
    });
  }
);

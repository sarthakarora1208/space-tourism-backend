import asyncHandler from "../middleware/async";
import ErrorResponse from "../utils/errorResponse";
import { Request, Response, NextFunction } from "express";
import { dataSource } from "../server";
import { SpaceService } from "../entities/SpaceService";
import { Business } from "../entities/Business";
import { Rate } from "../entities/Rate";
import RapydService from "../services/rapydService";
import { ICreateVirtualAccount } from "../interfaces/db/idbvirtualaccount";
import { makeId } from "../utils/makeId";

//@desc     Get Space Service by id
//@route		GET /api/v1/space/:id
//@access		Public

export const getSpaceServicebyId = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const spaceServiceRepository = dataSource.getRepository(SpaceService);
    const id = req.params.id;

    const spaceService = await spaceServiceRepository.findOne({
      where: { id },
      relations: ["business", "rates"],
    });

    if (!spaceService) {
      return next(
        new ErrorResponse(`Space service not found with id of ${id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: spaceService,
    });
  }
);

//@desc     	Get space services
//@route		  GET /api/v1/space-service
//@desc     	Get space services for business
//@route		  GET  /api/v1/business/:businessId/space-service
//@access		  Public

export const getSpaceServices = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const spaceServiceRepository = dataSource.getRepository(SpaceService);
    let spaceServices: SpaceService[] = [];

    if (req.params.businessId) {
      const id = req.params.businessId;
      spaceServices = await spaceServiceRepository.find({
        where: { business: { id } },
        relations: ["business", "rates"],
      });
    } else {
      spaceServices = await spaceServiceRepository.find({
        where: {
          isAvailable: true,
        },
        relations: ["business", "rates"],
      });
    }

    res.status(200).json({
      success: true,
      data: spaceServices,
    });
  }
);

//@desc     Create space service
//@route		POST /api/v1/space-service
//@access		Public

export const createSpaceService = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const spaceServiceRepository = dataSource.getRepository(SpaceService);
    const businessRepository = dataSource.getRepository(Business);
    const rateRepository = dataSource.getRepository(Rate);
    const rapydService = new RapydService();

    const {
      name,
      description,
      seats,
      startTime,
      endTime,
      imageUrl,
      businessId,
      rates,
    } = req.body;

    const spaceService = spaceServiceRepository.create({
      name,
      description,
      seats,
      seatsLeft: seats,
      startTime,
      endTime,
      imageUrl,
    });

    const business = await businessRepository.findOne({
      where: { id: businessId },
    });

    if (!business) {
      return next(new ErrorResponse(`No business with id ${businessId}`, 404));
    }

    spaceService.business = business;

    let newSpaceService = await spaceServiceRepository.save(spaceService);

    let rateObjects: Rate[] = [];

    for (let i = 0; i < rates.length; i++) {
      let { amount, currency, country } = rates[i];
      let rate = rateRepository.create({ amount, currency, country });
      rate.spaceService = newSpaceService;
      rateObjects.push(rate);
    }

    await rateRepository.save(rateObjects);

    let wallet = await rapydService.getWallet(business.eWallet);

    console.log(wallet);

    for (let i = 0; i < rateObjects.length; i++) {
      let rate = rateObjects[i];
      if (wallet.verification_status === "verified") {
        let createVirtualAccount: ICreateVirtualAccount = {
          currency: rate.currency,
          country: rate.country,
          description: `${rate.spaceService.name} ${rate.country} ${rate.currency}`,
          ewallet: business.eWallet,
          merchant_reference_id: makeId(8),
          metadata: {
            merchant_defined: true,
          },
        };
        let response = await rapydService.issueVirtualAccountToWallet(
          createVirtualAccount
        );
        console.log(response);
      }
    }

    res.status(200).json({
      success: true,
      data: newSpaceService,
    });
  }
);

//@desc     Update Space Service
//@route		PUT /api/v1/space-service/:id
//@access		Public

export const updateSpaceService = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const spaceServiceRepository = dataSource.getRepository(SpaceService);

    const id = req.params.id;
    const { name, description, seats, startTime, endTime, imageUrl } = req.body;

    const spaceService = await spaceServiceRepository.findOne({
      where: { id },
      relations: ["rates", "business"],
    });

    if (!spaceService) {
      return next(
        new ErrorResponse(
          `Space sitter service not found with id of ${id}`,
          404
        )
      );
    }

    spaceServiceRepository.merge(spaceService, {
      name,
      description,
      imageUrl,
    });

    let updatedSpaceService = await spaceServiceRepository.save(spaceService);

    res.status(200).json({
      success: true,
      data: updatedSpaceService,
    });
  }
);

//@desc     Change space service status
//@route		POST /api/v1/space/:id/available
//@access		Public

export const changeSpaceServiceStatus = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const spaceServiceRepository = dataSource.getRepository(SpaceService);
    const id = req.params.id;
    const { status } = req.body;

    const spaceService = await spaceServiceRepository.findOne({
      where: { id },
      relations: ["rates", "business"],
    });

    if (!spaceService) {
      return next(
        new ErrorResponse(`Space service not found with id of ${id}`, 404)
      );
    }

    spaceServiceRepository.merge(spaceService, {
      isAvailable: status,
    });

    let spaceServiceSaved = await spaceServiceRepository.save(spaceService);

    res.status(200).json({
      success: true,
      data: spaceServiceSaved,
    });
  }
);

//@desc     Delete space service sitter service
//@route		DEL /api/v1/space-service/:id
//@access		Public

export const deleteSpaceService = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const spaceServiceRepository = dataSource.getRepository(SpaceService);
    const id = req.params.id;

    const spaceService = await spaceServiceRepository.findOne({
      where: { id },
    });
    if (!spaceService) {
      return next(new ErrorResponse(`No space service found!`, 404));
    }

    await spaceServiceRepository.delete(id);

    res.status(200).json({
      success: true,
      data: {},
    });
  }
);

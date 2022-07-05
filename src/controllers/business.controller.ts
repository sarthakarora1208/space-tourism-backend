import asyncHandler from "../middleware/async";
import ErrorResponse from "../utils/errorResponse";
import { Request, Response, NextFunction } from "express";
import { Business } from "../entities/Business";
import { User } from "../entities/User";
import { dataSource } from "../server";
import { SpaceService } from "../entities/SpaceService";

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

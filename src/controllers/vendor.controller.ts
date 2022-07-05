import asyncHandler from "../middleware/async";
import ErrorResponse from "../utils/errorResponse";
import { Request, Response, NextFunction } from "express";
import { User } from "../entities/User";
import { Business } from "../entities/Business";
import { USER_ROLE } from "../constants/userRoles";
import { dataSource } from "../server";

//@desc			Create Vendor
//@route		POST /api/v1/vendor
//@access		Public

export const createVendor = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const vendorRepository = dataSource.getRepository(User);
    const businessRepository = dataSource.getRepository(Business);
    let {
      id,
      name,
      email,
      username,
      phone,
      gender,
      address,
      state,
      city,
      postalCode,
      dob,
    } = req.body;
    let vendor = vendorRepository.create({
      id,
      name,
      email,
      username,
      phone,
      gender,
      address,
      state,
      city,
      postalCode,
      dob,
      role: USER_ROLE.VENDOR,
    });

    let business = businessRepository.create({});

    let newbusiness = await businessRepository.save(business);
    vendor.business = newbusiness;
    let newVendor = await vendorRepository.save(vendor);

    res.status(201).json({
      success: true,
      data: newVendor,
    });
  }
);

//@desciption		Get vendor by Id
//@route		GET /api/v1/vendor/:id
//@access		Public

export const getVendorById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const vendorRepository = dataSource.getRepository(User);
    const id = req.params.id;

    const vendor = await vendorRepository.findOne({
      where: { id },
      relations: ["business"],
    });
    if (!vendor) {
      return next(new ErrorResponse(`Vendor not found with id of ${id}`, 404));
    }
    res.status(200).json({
      success: true,
      data: vendor,
    });
  }
);

//@desc			Update Vendor
//@route		PUT /api/v1/vendor/:id
//@access		Public

export const updateVendor = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const vendorRepository = dataSource.getRepository(User);
    const businessRepository = dataSource.getRepository(Business);
    const id = req.params.id;

    let {
      name,
      phone,
      gender,
      profileImageUrl,
      address,
      state,
      city,
      postalCode,
      dob,
    } = req.body;
    console.log(req.body);

    let vendor = await vendorRepository.findOne({
      where: { id },
      relations: ["business"],
    });

    if (!vendor) {
      return next(new ErrorResponse(`No vendor found with id of ${id}`, 404));
    }
    vendorRepository.merge(vendor, {
      name,
      phone,
      gender,
      profileImageUrl,
      address,
      state,
      city,
      postalCode,
      dob,
    });

    let updatedVendor = await vendorRepository.save(vendor);

    let business = await businessRepository.findOne({
      where: {
        id: vendor.business.id,
      },
    });

    if (!business) {
      return next(new ErrorResponse(`No business found with id of ${id}`, 404));
    }

    businessRepository.merge(business, {
      address,
    });
    await businessRepository.save(business);

    res.status(200).json({
      success: true,
      data: updatedVendor,
    });
  }
);

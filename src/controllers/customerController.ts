import asyncHandler from "../middleware/async";
import ErrorResponse from "../utils/errorResponse";
import { Request, Response, NextFunction } from "express";
import { User } from "../entities/User";
import { dataSource } from "../server";

//@desc			Create Customer
//@route		POST /api/v1/customer
//@access		Public

export const createCustomer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const customerRepository = dataSource.getRepository(User);
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
    let customer = customerRepository.create({
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
    });
    let newCustomer = await customerRepository.save(customer);
    res.status(201).json({
      success: true,
      data: newCustomer,
    });
  }
);

//@desciption		Get customer by Id
//@route		GET /api/v1/customer/:id
//@access		Public

export const getCustomerById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const customerRepository = dataSource.getRepository(User);
    const id = req.params.id;

    const customer = await customerRepository.findOne({
      where: {
        id,
      },
    });
    if (!customer) {
      return next(new ErrorResponse(`No customer with id ${id}`, 404));
    }
    res.status(200).json({
      success: true,
      data: customer,
    });
  }
);

//@desc			Update Customer
//@route		PUT /api/v1/customer/:id
//@access		Public

export const updateCustomer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const customerRepository = dataSource.getRepository(User);
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
    const id = req.params.id;

    let customer = await customerRepository.findOne({
      where: { id },
    });

    if (!customer) {
      return next(new ErrorResponse(`No customer found with id of ${id}`, 404));
    }
    customerRepository.merge(customer, {
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

    let updatedCustomer = await customerRepository.save(customer);

    res.status(200).json({
      success: true,
      data: updatedCustomer,
    });
  }
);

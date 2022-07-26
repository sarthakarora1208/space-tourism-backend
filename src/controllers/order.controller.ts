import asyncHandler from "../middleware/async";
import ErrorResponse from "../utils/errorResponse";
import { Request, Response, NextFunction } from "express";
import { Order } from "../entities/Order";
import { dataSource } from "../server";
import { SpaceService } from "../entities/SpaceService";
import { User } from "../entities/User";
import { ORDER_STATUS } from "../constants/status";
import RapydService from "../services/rapydService";

//@desc			Get Order By Id
//@route		GET /api/v1/order/:id
//@access		Public

export const getOrderById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const orderRepository = dataSource.getRepository(Order);
    const id = req.params.id;
    const order = await orderRepository.findOne({
      where: { id },
      relations: ["user", "business", "spaceService", "review"],
    });
    if (!order) {
      return next(new ErrorResponse(`Order not found with id of ${id}`, 404));
    }
    res.status(200).json({
      success: true,
      data: order,
    });
  }
);

//@desc			Get Orders
//@route		GET /api/v1/order
//@desc			Get Orders For business
//@route		GET /api/v1/business/:businessId/order?status=:status
//@desc			Get Orders For Customer
//@route		GET /api/v1/customer/:customerId/order?status=:status
//@access		Public

export const getOrders = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const orderRepository = dataSource.getRepository(Order);
    let status = parseInt(req.query.status as string);

    let orders: Order[] = [];
    if (req.params.businessId) {
      const id = req.params.businessId;
      orders = await orderRepository.find({
        where: { business: { id }, status },
        relations: ["review", "business", "user", "spaceService"],
      });
    } else if (req.params.customerId) {
      const id = req.params.customerId;

      orders = await orderRepository.find({
        where: { user: { id }, status: status },
        relations: ["review", "business", "spaceService", "user"],
      });
    } else {
      //orders = await orderRepository.find();
      orders = [];
    }
    res.status(200).json({
      success: true,
      data: orders,
    });
  }
);

//@desc     Create Order
//@route		POST /api/v1/order
//@access		Public

export const createOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const orderRepository = dataSource.getRepository(Order);
    const userRepository = dataSource.getRepository(User);
    const spaceServiceRepository = dataSource.getRepository(SpaceService);

    const {
      amount,
      currency,
      country,
      serviceName,
      startTime,
      endTime,
      serviceId,
      userId,
    } = req.body;

    let spaceService = await spaceServiceRepository.findOne({
      where: { id: serviceId },
      relations: ["business", "rates"],
    });

    if (!spaceService) {
      return next(new ErrorResponse("Space service not found", 404));
    }
    console.log(
      spaceService.rates.filter((rate) => rate.currency === currency)
    );

    let senderId =
      spaceService.rates.filter((rate) => rate.currency === currency).length > 0
        ? spaceService.rates.filter((rate) => rate.currency === currency)[0]
            .senderId
        : "";

    const order = orderRepository.create({
      amount,
      country,
      startTime,
      endTime,
      currency,
      serviceName,
      senderId,
    });

    let user = await userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    order.user = user;

    order.serviceName = spaceService.name;
    order.spaceService = spaceService;
    order.business = spaceService.business;

    let newOrder = await orderRepository.save(order);

    res.status(201).json({
      success: true,
      data: newOrder,
    });
  }
);

//@desc		 	Complete Order
//@route		POST /api/v1/order/:id/complete
//@access		Public

export const completeOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const orderRepository = dataSource.getRepository(Order);
    const id = req.params.id;
    const order = await orderRepository.findOne({
      where: { id },
      relations: ["business"],
    });

    if (!order) {
      return next(new ErrorResponse(`Order not found with id of ${id}`, 404));
    }

    orderRepository.merge(order, {
      status: ORDER_STATUS.COMPLETED,
    });
    let completedOrder = await orderRepository.save(order);

    // make payment to vendor account using stripe
    res.status(200).json({
      success: true,
      data: completedOrder,
    });
  }
);
//@desc		 	Ongoing Order
//@route		POST /api/v1/order/:id/ongoing
//@access		Public

export const ongoingOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const orderRepository = dataSource.getRepository(Order);
    const id = req.params.id;
    const order = await orderRepository.findOne({
      where: { id },
      relations: ["business"],
    });

    if (!order) {
      return next(new ErrorResponse(`Order not found with id of ${id}`, 404));
    }

    orderRepository.merge(order, {
      status: ORDER_STATUS.ONGOING,
    });
    let completedOrder = await orderRepository.save(order);

    res.status(200).json({
      success: true,
      data: completedOrder,
    });
  }
);

//@desc		 	Cancel Order
//@route		POST /api/v1/order/:id/cancel
//@access		Public

export const cancelOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const orderRepository = dataSource.getRepository(Order);
    const id = req.params.id;
    const { cancellationComment, cancellationReason } = req.body;

    const order = await orderRepository.findOne({
      where: { id },
    });

    if (!order) {
      return next(new ErrorResponse(`Order not found with id of ${id}`, 404));
    }

    orderRepository.merge(order, {
      status: ORDER_STATUS.CANCELLED,
      cancellationComment,
      cancellationReason,
    });

    let cancelledOrder = await orderRepository.save(order);

    // initiate refund

    res.status(200).json({
      success: true,
      data: cancelledOrder,
    });
  }
);
//@desc       Cancel Order With Refund
//@route		POST /api/v1/order/:id/cancel-refund
//@access		Public

export const cancelOrderAndRefund = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const rapydService = new RapydService();
    const orderRepository = dataSource.getRepository(Order);
    const id = req.params.id;
    console.log(id);
    const { cancellationComment, cancellationReason } = req.body;

    const order = await orderRepository.findOne({
      where: { id },
    });

    if (!order) {
      return next(new ErrorResponse(`Order not found with id of ${id}`, 404));
    }

    orderRepository.merge(order, {
      //  status: ORDER_STATUS.CANCELLED,
      cancellationComment,
      cancellationReason,
    });

    let cancelledOrder = await orderRepository.save(order);

    // initiate refund
    let response = await await rapydService.createBenificiaryTokenizationPage(
      order.currency,
      order.country,
      order.id
    );

    res.status(200).json({
      success: true,
      data: response.redirect_url,
    });
  }
);

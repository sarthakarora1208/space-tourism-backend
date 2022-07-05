import asyncHandler from "../middleware/async";
import ErrorResponse from "../utils/errorResponse";
import { Request, Response, NextFunction } from "express";
import { Review } from "../entities/Review";
import { User } from "../entities/User";
import { Order } from "../entities/Order";
import { dataSource } from "../server";
import { SpaceService } from "../entities/SpaceService";

//@desc			Get Review By Id
//@route		GET /api/v1/review/:id
//@access		Public

export const getReviewById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const reviewRepository = dataSource.getRepository(Review);
    const id = req.params.id;
    const review = await reviewRepository.findOne({
      where: { id },
      relations: ["order", "business", "user"],
    });

    if (!review) {
      return next(new ErrorResponse(`No review with id ${id}`, 404));
    }

    res.status(200).json({
      success: true,
      data: review,
    });
  }
);

//@desc			Get Reviews
//@route		GET /api/v1/review
//@desc			Get Reviews For business
//@route		GET /api/v1/business/:businessId/review
//@desc			Get Reviews For Customer
//@route		GET /api/v1/customer/:customerId/review
//@desc			Get Reviews For Space Service
//@route		GET /api/v1/space-service/:spaceServiceId/review
//@access		Public

export const getReviews = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const reviewRepository = dataSource.getRepository(Review);
    let reviews: Review[] = [];

    if (req.params.businessId) {
      const id = req.params.businessId;

      reviews = await reviewRepository.find({
        where: { business: { id } },
        relations: ["business", "user"],
      });
    } else if (req.params.customerId) {
      const id = req.params.customerId;

      reviews = await reviewRepository.find({
        where: { user: { id } },
        relations: ["business", "user"],
      });
    } else if (req.params.spaceServiceId) {
      const id = req.params.spaceServiceId;

      reviews = await reviewRepository.find({
        where: { spaceService: { id } },
        relations: ["spaceService", "user"],
      });
    } else {
      //reviews = await reviewRepository.find({});
      reviews = [];
    }

    res.status(200).json({
      success: true,
      data: reviews,
    });
  }
);

//@desc			Create Review
//@route		POST /api/v1/review
//@access		Public

export const createReview = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const reviewRepository = dataSource.getRepository(Review);
    const userRepository = dataSource.getRepository(User);
    const orderRepository = dataSource.getRepository(Order);
    const spaceServiceRepository = dataSource.getRepository(SpaceService);

    const { stars, content, serviceType, orderId, userId, serviceId } =
      req.body;
    const review = reviewRepository.create({
      stars,
      content,
    });

    const order = await orderRepository.findOne({
      where: { id: orderId },
    });

    if (!order) {
      return next(new ErrorResponse(`No order with id ${orderId}`, 404));
    }

    review.order = order;

    let user = await userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    review.user = user;
    let newReview;

    let spaceService = await spaceServiceRepository.findOne({
      where: { id: serviceId },
      relations: ["business"],
    });

    if (!spaceService) {
      return next(new ErrorResponse("Space Service not found", 404));
    }

    review.spaceService = spaceService;
    review.business = spaceService.business;
    newReview = await reviewRepository.save(review);

    let { average } = await spaceServiceRepository
      .createQueryBuilder("spaceService")
      .where("spaceService.id = :id", { id: serviceId })
      .leftJoin("spaceService.reviews", "review")
      .select("AVG(review.stars)", "average")
      .getRawOne();

    let { count } = await spaceServiceRepository
      .createQueryBuilder("spaceService")
      .where("spaceService.id = :id", { id: serviceId })
      .leftJoin("spaceService.reviews", "review")
      .select("COUNT(review.stars)", "count")
      .getRawOne();

    spaceServiceRepository.merge(spaceService, {
      averageRating: average,
      reviewCount: count,
    });

    let updatedSpaceService = await spaceServiceRepository.save(spaceService);

    res.status(200).json({
      success: true,
      data: newReview,
    });
  }
);

//@desc     Add Reply
//@route		POST /api/v1/review/:id/reply
//@access		Public

export const addReplyToReview = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const reviewRepository = dataSource.getRepository(Review);

    let { reply } = req.body;
    const id = req.params.id;

    const review = await reviewRepository.findOne({
      where: { id },
    });

    if (!review) {
      return next(new ErrorResponse(`No review with id ${id}`, 404));
    }

    reviewRepository.merge(review, {
      reply,
    });

    let updatedReview = await reviewRepository.save(review);

    res.status(200).json({
      success: true,
      data: updatedReview,
    });
  }
);

//@desc			Delete Review
//@route		DEL /api/v1/review/:id
//@access		Public

export const deleteReview = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const reviewRepository = dataSource.getRepository(Review);
    const id = req.params.id;
    const review = await reviewRepository.findOne({ where: { id } });

    if (!review) {
      return next(new ErrorResponse(`No order found!`, 404));
    }

    await reviewRepository.delete(id);
    // updated review count
    // updated average rating

    res.status(200).json({
      success: true,
      data: {},
    });
  }
);

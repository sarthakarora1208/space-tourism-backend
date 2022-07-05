import { Router } from "express";
import { ORDER_ROUTE, REVIEW_ROUTE } from "../constants/routes";
import {
  getBusinessById,
  markIsBusinessVerified,
} from "../controllers/business.controller";
import orderRoute from "./order.route";
import reviewRoute from "./review.route";
import { protect } from "../middleware/auth";

const router = Router({ mergeParams: true });

router.use(`/:businessId${ORDER_ROUTE}`, orderRoute);
router.use(`/:businessId${REVIEW_ROUTE}`, reviewRoute);

router.route("/:id").get(protect, getBusinessById);
router.route("/:id/verified").post(protect, markIsBusinessVerified);

export = router;

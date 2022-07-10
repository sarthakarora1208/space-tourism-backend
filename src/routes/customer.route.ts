import { Router } from "express";
import { ORDER_ROUTE, REVIEW_ROUTE } from "../constants/routes";
import {
  createCustomer,
  getCustomerById,
  updateCustomer,
} from "../controllers/customer.controller";

import orderRoute from "./order.route";
import reviewRoute from "./review.route";
import { protect } from "../middleware/auth";

const router = Router({ mergeParams: true });

router.use(`/:customerId${ORDER_ROUTE}`, orderRoute);
router.use(`/:customerId${REVIEW_ROUTE}`, reviewRoute);

router.route("/").post(createCustomer);
router.route("/:id").get(protect, getCustomerById).put(protect, updateCustomer);

export = router;

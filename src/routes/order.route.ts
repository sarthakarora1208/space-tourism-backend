import { Router } from "express";
import {
  cancelOrder,
  completeOrder,
  createOrder,
  getOrderById,
  getOrders,
} from "../controllers/order.controller";
import { protect } from "../middleware/auth";

const router = Router({ mergeParams: true });

router.route("/").get(protect, getOrders).post(protect, createOrder);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/complete").post(protect, completeOrder);
router.route("/:id/cancel").post(protect, cancelOrder);

export = router;

import { Router } from "express";
import {
  cancelOrder,
  cancelOrderAndRefund,
  completeOrder,
  createOrder,
  getOrderById,
  getOrders,
  ongoingOrder,
} from "../controllers/order.controller";
import { protect } from "../middleware/auth";

const router = Router({ mergeParams: true });

router.route("/").get(protect, getOrders).post(protect, createOrder);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/ongoing").post(protect, ongoingOrder);
router.route("/:id/complete").post(protect, completeOrder);
router.route("/:id/cancel").post(protect, cancelOrder);
router.route("/:id/cancel-refund").post(protect, cancelOrderAndRefund);

export = router;

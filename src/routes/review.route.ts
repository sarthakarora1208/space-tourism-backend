import { Router } from "express";

import {
  addReplyToReview,
  createReview,
  deleteReview,
  getReviews,
} from "../controllers/review.controller";
import { protect } from "../middleware/auth";

const router = Router({ mergeParams: true });

router.route("/").get(getReviews).post(protect, createReview);
router.route("/:id").delete(protect, deleteReview);
router.route("/:id/reply").post(protect, addReplyToReview);

export = router;

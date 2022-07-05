import { Router } from "express";
import {
  createVendor,
  getVendorById,
  updateVendor,
} from "../controllers/vendor.controller";
import { protect } from "../middleware/auth";

const router = Router({ mergeParams: true });

router.route("/").post(createVendor);
router.route("/:id").get(protect, getVendorById).put(protect, updateVendor);

export = router;

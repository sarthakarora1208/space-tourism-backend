import { Router } from "express";
import { uploadImageToS3 } from "../controllers/s3.controller";
import { protect } from "../middleware/auth";

const router = Router({ mergeParams: true });

router.route("/").post(protect, uploadImageToS3);

export = router;

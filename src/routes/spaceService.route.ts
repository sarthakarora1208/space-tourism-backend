import { Router } from "express";

import {
  changeSpaceServiceStatus,
  createSpaceService,
  deleteSpaceService,
  getSpaceServicebyId,
  getSpaceServices,
  updateSpaceService,
} from "../controllers/spaceService.controller";

import { protect } from "../middleware/auth";

const router = Router({ mergeParams: true });

router.route("/").get(getSpaceServices).post(protect, createSpaceService);
router
  .route("/:id")
  .get(getSpaceServicebyId)
  .put(protect, updateSpaceService)
  .delete(protect, deleteSpaceService);
router.route("/:id/available").put(protect, changeSpaceServiceStatus);

export = router;

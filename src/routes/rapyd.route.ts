import { createWallet } from "../controllers/rapyd.controller";
import { Router } from "express";

import { protect } from "../middleware/auth";

const router = Router({ mergeParams: true });

router.route("/").post(createWallet);

export = router;

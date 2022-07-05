import { Router } from "express";

import { postWebhook } from "../controllers/webhook.controller";

const router = Router({ mergeParams: true });

router.route("/").post(postWebhook);

export = router;

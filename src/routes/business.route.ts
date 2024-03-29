import { Router } from "express";
import {
  ORDER_ROUTE,
  REVIEW_ROUTE,
  SPACE_SERVICE_ROUTE,
} from "../constants/routes";
import {
  getBusinessById,
  getPayoutsForBusiness,
  getSupportedCurrencies,
  getTransactionsForBankAccount,
  getVirtualAccounts,
  markIsBusinessVerified,
  retrieveRemitterDetails,
  simulateBankTransfer,
  verifyIdentity,
} from "../controllers/business.controller";

import orderRoute from "./order.route";
import reviewRoute from "./review.route";
import spaceServiceRoute from "./spaceService.route";

import { protect } from "../middleware/auth";

const router = Router({ mergeParams: true });

router.use(`/:businessId${ORDER_ROUTE}`, orderRoute);
router.use(`/:businessId${REVIEW_ROUTE}`, reviewRoute);
router.use(`/:businessId${SPACE_SERVICE_ROUTE}`, spaceServiceRoute);

router.route("/:id").get(protect, getBusinessById);
router.route("/:id/verified").post(protect, markIsBusinessVerified);
router.route("/:id/verify-identity").post(protect, verifyIdentity);
router.route("/:id/accounts").get(protect, getVirtualAccounts);
router.route("/:id/transactions").get(protect, getTransactionsForBankAccount);
router.route("/payouts").post(protect, getPayoutsForBusiness);

router.route("/simulate-transfer").post(protect, simulateBankTransfer);
router.route("/retrieve-bank-account").post(protect, retrieveRemitterDetails);
//router.route("/create-benificiary").post(protect, createBenificiary);
router.route("/supported-currencies").post(protect, getSupportedCurrencies);

export = router;

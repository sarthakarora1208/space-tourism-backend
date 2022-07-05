import { Request, Response, NextFunction } from "express";
import RapydService from "../services/rapydService";
import asyncHandler from "../middleware/async";
import ErrorResponse from "../utils/errorResponse";
import webhookEventService from "../services/webhookEventService";

export const postWebhook = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const rapydService = new RapydService();
    const url = `${req.protocol}://${req.hostname}${req.path}`;
    let signature = req.headers["signature"] as string;
    let salt = req.headers["salt"] as string;
    let timestamp = req.headers["timestamp"] as string;
    console.log("****");
    console.log(req.body);
    console.log("****");

    if (
      !rapydService.authWebhookRequest(
        signature,
        url,
        salt,
        parseInt(timestamp, 10),
        req.body
      )
    ) {
      new ErrorResponse("Signature does not match", 401);
    }
    const eventId = req.body.id;
    const eventType = req.body.type;
    const data = req.body.data;

    if (!eventId || !eventType || !data) {
      new ErrorResponse("Bad Request", 400);
    }
    const status = webhookEventService.tryAddEvent(eventId, eventType, data);
    const events = webhookEventService.getAllEvents();
    console.log(events);
    return res.status(200).json({ status });
  }
);

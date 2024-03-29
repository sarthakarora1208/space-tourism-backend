import { Request, Response, NextFunction } from "express";
import RapydService from "../services/rapydService";
import asyncHandler from "../middleware/async";
import ErrorResponse from "../utils/errorResponse";
import webhookEventService from "../services/webhookEventService";
import { dataSource } from "../server";
import { Order } from "../entities/Order";
import { ORDER_STATUS } from "../constants/status";
import { buildMessage } from "class-validator";
import { makeId } from "../utils/makeId";

export const postWebhook = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const rapydService = new RapydService();
    const url = `${req.protocol}://${req.hostname}${req.path}`;
    let signature = req.headers["signature"] as string;
    let salt = req.headers["salt"] as string;
    let timestamp = req.headers["timestamp"] as string;

    const orderRepository = dataSource.getRepository(Order);

    let { type, data } = req.body;
    if (type === "BENEFICIARY_CREATED") {
      let {
        id,
        country,
        currency,
        merchant_reference_id,
        default_payout_method_type,
      } = data;
      const order = await orderRepository.findOne({
        where: { id: merchant_reference_id },
        relations: ["user", "business", "review"],
      });
      console.log(order);
      const { senderId, business } = order!;

      // console.log(id);
      // console.log(senderId);
      // console.log(country);
      // console.log(business.eWallet);
      // console.log(order!.amount.toString());
      // console.log(currency);
      // console.log(default_payout_method_type);
      //console.log(id);
      //let beneficiary = await rapydService.retrieveBeneficiary(id);
      //console.log(beneficiary);
      //let sender = await rapydService.retrieveSender(senderId);
      //console.log(sender);

      let requiredPayoutFields = await rapydService.getPayoutRequiredFields(
        country,
        currency,
        default_payout_method_type
      );
      console.log(requiredPayoutFields);
      let mandatoryFields = ["country", "currency", "first_name", "last_name"];
      let senderBody: any = {};
      for (
        let i = 0;
        i < requiredPayoutFields.sender_required_fields.length;
        i++
      ) {
        let key = requiredPayoutFields.sender_required_fields[i].name;
        if (!mandatoryFields.includes(key)) {
          if (key === "address") {
            senderBody.address = business.address;
          }
          if (key === "city") {
            senderBody.city = business.address;
          }
          if (key === "state") {
            senderBody.state = business.address;
          }
          if (key === "postcode") {
            senderBody.postcode = "123456";
          }
          if (key === "date_of_birth") {
            senderBody.date_of_birth = "12/12/1990";
          }
          if (key === "description") {
            senderBody.description = "description";
          }
          if (key === "beneficiary_relationship") {
            senderBody.beneficiary_relationship = "supplier";
          }
          if (key === "source_of_income") {
            senderBody.source_of_income = "business";
          }
          if (key === "occupation") {
            senderBody.occupation = "space vendor";
          }
          if (key === "identification_type") {
            senderBody.identification_type = "company_registered_number";
            senderBody.identification_value = makeId(8);
          }
        }
      }

      let sender = await rapydService.createSenderWithRequiredFields(
        country,
        currency,
        order!.business.businessName,
        order!.business.businessName,
        senderBody
      );

      let payout = await rapydService.createPayout(
        id,
        sender.id,
        country,
        business.eWallet,
        order!.amount.toString(),
        currency,
        default_payout_method_type
      );
      let payout1 = await rapydService.completePayout(
        payout.id,
        order!.amount.toString()
      );
      console.log(payout1);
      orderRepository.merge(order!, {
        status: ORDER_STATUS.CANCELLED,
        beneficiaryId: id,
        payoutId: payout.id,
      });

      let cancelledOrder = await orderRepository.save(order!);
      console.log(cancelledOrder);
    }

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
    const webhookData = req.body.data;

    if (!eventId || !eventType || !webhookData) {
      new ErrorResponse("Bad Request", 400);
    }
    const status = webhookEventService.tryAddEvent(
      eventId,
      eventType,
      webhookData
    );
    const events = webhookEventService.getAllEvents();
    return res.status(200).json({ status });
  }
);

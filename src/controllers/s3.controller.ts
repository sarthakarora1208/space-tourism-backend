import asyncHandler from "../middleware/async";
import ErrorResponse from "../utils/errorResponse";
import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import fileType from "file-type";
import multiparty from "multiparty";
import fs from "fs";
import { s3bucket } from "../server";
import { v4 as uuidv4 } from "uuid";
import { PutObjectRequest } from "aws-sdk/clients/s3";

//@desc			Upload image to S3
//@route		POST /api/v1/s3/upload
//@access		Public

export const uploadImageToS3 = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const form = new multiparty.Form();
    form.parse(req, async (error, fields, files) => {
      if (error) {
        console.log(error);
        return res.status(500).send(error);
      }
      try {
        const path = files.file[0].path;
        const buffer = fs.readFileSync(path);
        const type = await fileType.fromBuffer(buffer);
        let params: PutObjectRequest = {
          ACL: "public-read",
          Bucket: process.env.BUCKET_NAME!,
          Key: `${uuidv4()}.${type!.ext}`,
          Body: buffer,
          ContentType: type!.mime,
        };
        let { Location, Key } = await s3bucket.upload(params).promise();
        console.log(Location);

        return res.status(201).json({
          success: true,
          data: Location,
        });
      } catch (err) {
        console.log(err);
        return res.status(500).send(err);
      }
    });
  }
);

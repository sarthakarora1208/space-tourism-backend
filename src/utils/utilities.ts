import * as crypto from "crypto";

// const https = require('https');
import https from "https";
import { IUtilitiesResponse } from "../interfaces/rapyd/rest-response";
const access_key = process.env.RAPYD_ACCESS_KEY;
const secretKey = process.env.RAPYD_SECRET_KEY;
const log = true;

export class RapydUtilties {
  constructor() {}
  async makeRequest(method, urlPath, body = null) {
    try {
      let hostname = "sandboxapi.rapyd.net";
      let path = urlPath;
      let salt = this.generateRandomString(8);
      let idempotency = new Date().getTime().toString();
      let timestamp = Math.round(new Date().getTime() / 1000);
      let signature = this.sign(method, path, salt, timestamp, body);

      const options = {
        hostname: hostname,
        port: 443,
        path: path,
        method: method,
        headers: {
          "Content-Type": "application/json",
          salt: salt,
          timestamp: timestamp,
          signature: signature,
          access_key: access_key,
          idempotency: idempotency,
        },
      };

      return await this.httpRequest(options, body);
    } catch (error) {
      console.error("Error generating request options");
      throw error;
    }
  }

  sign(method, urlPath, salt, timestamp, body) {
    try {
      let bodyString = "";
      if (body) {
        bodyString = JSON.stringify(body);
        bodyString = bodyString == "{}" ? "" : bodyString;
      }

      let toSign =
        method.toLowerCase() +
        urlPath +
        salt +
        timestamp +
        access_key +
        secretKey +
        bodyString;
      log && console.log(`toSign: ${toSign}`);

      let hash = crypto.createHmac("sha256", secretKey!);
      hash.update(toSign);
      const signature = Buffer.from(hash.digest("hex")).toString("base64");
      log && console.log(`signature: ${signature}`);

      return signature;
    } catch (error) {
      console.error("Error generating signature");
      throw error;
    }
  }

  generateRandomString(size) {
    try {
      return crypto.randomBytes(size).toString("hex");
    } catch (error) {
      console.error("Error generating salt");
      throw error;
    }
  }

  async httpRequest(options, body) {
    return new Promise<IUtilitiesResponse>((resolve, reject) => {
      try {
        let bodyString = "";
        if (body) {
          bodyString = JSON.stringify(body);
          bodyString = bodyString == "{}" ? "" : bodyString;
        }

        log && console.log(`httpRequest options: ${JSON.stringify(options)}`);
        const req = https.request(options, (res) => {
          let response: IUtilitiesResponse = {
            statusCode: res.statusCode!,
            headers: res.headers,
            body: "" as any,
          };

          res.on("data", (data) => {
            response.body += data;
          });

          res.on("end", () => {
            response.body = response.body
              ? JSON.parse(response.body as any)
              : {};
            log &&
              console.log(`httpRequest response: ${JSON.stringify(response)}`);

            if (response.statusCode !== 200) {
              return reject(response);
            }

            return resolve(response);
          });
        });

        req.on("error", (error) => {
          return reject(error);
        });

        req.write(bodyString);
        req.end();
      } catch (err) {
        return reject(err);
      }
    });
  }
}

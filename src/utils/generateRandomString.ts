import * as crypto from "crypto";

export const generateRandomString = (size: any) => {
  try {
    return crypto.randomBytes(size).toString("hex");
  } catch (error) {
    console.error("Error generating salt");
    throw error;
  }
};

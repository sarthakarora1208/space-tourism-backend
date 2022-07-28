const config = {
  accessKey: process.env.RAPYD_ACCESS_KEY || "",
  secretKey: process.env.RAPYD_SECRET_KEY || "",
  baseRapydApiUrl:
    process.env.BASERAPYDAPIURL || "https://sandboxapi.rapyd.net",
  port: parseInt(process.env.PORT!, 10) || 5000,
};

export default config;

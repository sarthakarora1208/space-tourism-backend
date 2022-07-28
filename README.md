# Keyano - Space Tourism Backend

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/open-source.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-markdown.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/check-it-out.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-git.svg)](https://forthebadge.com)
![](https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/sarthakarora1208/space-tourism-backend">
    <img src="https://user-images.githubusercontent.com/42542489/181535957-35921d70-45d1-4a3f-8388-403b014d6431.gif" alt="Logo">
  </a>

  <h3 align="center">Keyano Space Tourism</h3>

  <p align="center">
    <a href="https://devpost.com/software/keyano-space-tourism"><strong>Explore the docs »</strong></a>
    <br />
	World's first space marketplace. Get your ticket to space now!
    <br />
    <a href="https://youtu.be/eOFrOCmDVV4">View Demo</a>
    ·
    <a href="https://github.com/sarthakarora1208/space-tourism-backend/issues">Report Bug</a>
    ·
    <a href="https://github.com/sarthakarora1208/space-tourism-backend/issues">Request Feature</a>
  </p>
</p>

### Requirements

- [AWS Account](#AWS-Account)
- [Rapyd Account](#Rapyd-Account)
- [PostgreSQL](#PostgreSQL)
- [Nodejs](#Nodejs)

### AWS Account

You need a verified aws account to upload files to an S3 bucket

You can get your credentials file at `~/.aws/credentials (C:\Users\USER_NAME\.aws\credentials for Windows users)` and change the following lines in the [.env](./src/config/config.env) file.

```bash

AWS_ACCESS_KEY_ID="YOUR_ACCESS_KEY_ID"
AWS_SECRET_ACCESS_KEY="YOUR_SECRET_ACCESS_KEY"
BUCKET_NAME="YOUR_BUCKET_NAME"
REGION="YOUR_REGION"
```

### Rapyd Account

You need your Rapyd developer account credentials to create a new Rapyd account. Change the following lines in the [.env](./src/config/config.env) file.

```bash
RAPYD_SECRET_KEY="YOUR_RAPYD_SECRET_KEY"
RAPYD_ACCESS_KEY="YOUR_RAPYD_ACCESS_KEY"
BASERAPYDAPIURL="YOUR_RAPYD_API_URL"
```

### PostgreSQL

You must have a local postgres server running on your machine. To know more read at (https://www.postgresql.org/download/macosx/)

```bash
DATABASE_URL="YOUR_DATABASE_URL"
DATABASE_PASSWORD="YOUR_DATABASE_PASSWORD"
DATABASE_NAME="YOUR_DATABASE_NAME"
```

### Nodejs

You must have nodejs installed on your machine, [Node.js 10 or later with npm 5 or later](https://nodejs.org/en/download/).

Install all the packages and run the server

```
npm install
npm run start:dev
```

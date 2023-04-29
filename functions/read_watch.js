const aws = require("aws-sdk");
const DDB = new aws.DynamoDB.DocumentClient();
const { nanoid } = require('nanoid');
const WATCH_TABLE = process.env.WATCH_TABLE;



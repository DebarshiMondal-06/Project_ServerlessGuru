const aws = require("aws-sdk");
const DDB = new aws.DynamoDB.DocumentClient();
const WATCH_TABLE = process.env.WATCH_TABLE;



const sendResponse = (code, data, message) => {
  return {
    statusCode: code,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ result: data, message }),
  };
};


exports.get_all = async () => {
  try {
    const get_result = await DDB.scan({ TableName: WATCH_TABLE }).promise();
    return sendResponse(200, get_result, "All Watch Fetched!");
  }
  catch (error) {
    return sendResponse(400, error, "ERROR");
  }
};

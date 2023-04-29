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


exports.watch_category = async (event) => {
  try {
    const { watch_category } = JSON.parse(event.body);
    if (!watch_category)
      return sendResponse(400, null, "one of the following paramters not received for update!");

    const get_by_category_params = {
      TableName: WATCH_TABLE,
      IndexName: 'category-index',
      KeyConditionExpression: 'category=:category',
      ExpressionAttributeValues: {
        ':category': category,
      }
    };
    const get_result = await DDB.query(get_by_category_params).promise();
    return sendResponse(200, get_result, "All Watch Fetched by Category!");
  }
  catch (error) {
    return sendResponse(400, error, "ERROR");
  }
};

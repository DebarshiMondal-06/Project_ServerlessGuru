const aws = require("aws-sdk");
const DDB = new aws.DynamoDB.DocumentClient();
const { customAlphabet } = require('nanoid');
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



exports.create = async (event) => {
  const { name, brand, category, price, description } = JSON.parse(event.body);

  if (!name || !category || !price)
    return sendResponse(400, null, "one of the following paramters not received!");

  const nanoid = customAlphabet('1234567890', 6);
  
  try {
    const create_params = {
      Item: {
        watch_id: nanoid() * 1,
        name,
        brand,
        category,
        price,
        description,
        createdAt: new Date().toISOString(),
      },
      TableName: WATCH_TABLE,
    };
    await DDB.put(create_params).promise();
    return sendResponse(201, create_params, "Inserted successfully!");
  }
  catch (error) {
    return sendResponse(400, error, "ERROR");
  }
};
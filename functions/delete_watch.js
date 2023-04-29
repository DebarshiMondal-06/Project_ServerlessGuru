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


exports.delete = async (event) => {
  const { watch_id } = JSON.parse(event.body);
  if (!watch_id) return sendResponse(400, null, "Watch ID not provided!");


  try {
    // checking if the watch_id and category exists......
    const watch_params = {
      TableName: WATCH_TABLE,
      Key: {
        watch_id
      }
    };
    const get_watch = await DDB.get(watch_params).promise();
    if (!get_watch.Item) return sendResponse(400, "Error", `No Watch Found with - ${watch_id}`);


    const get_result = await DDB.delete(watch_params).promise();
    return sendResponse(200, get_result, "Watch Deleted!");
  }
  catch (error) {
    return sendResponse(400, error, "ERROR");
  }
};

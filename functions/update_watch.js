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


exports.update = async (event) => {
  const { watch_id, name, price, description } = JSON.parse(event.body);
  if (!watch_id || !name || !price || !description)
    return sendResponse(400, null, "one of the following paramters not received for update!");

  try {
    // checking if the watch_id and category exists......
    const check_watch_params = {
      TableName: WATCH_TABLE,
      Key: {
        watch_id,
      }
    };
    const get_watch = await DDB.get(check_watch_params).promise();
    if (!get_watch.Item) return sendResponse(400, "Error", `No Watch Found with - ${watch_id}`);

    // updating watch here......
    const update_params = {
      TableName: WATCH_TABLE,
      Key: {
        watch_id,
      },
      UpdateExpression: `set #watch_name = :name, description=:description, price=:price`,
      ExpressionAttributeValues: {
        ":name": name,
        ":price": price,
        ":description": description
      },
      ExpressionAttributeNames: {
        "#watch_name": "name"
      }
    };
    await DDB.update(update_params).promise();
    return sendResponse(200, update_params, "Watch updated!");
  }
  catch (error) {
    console.log(error);
    return sendResponse(400, error, "ERROR");
  }
};

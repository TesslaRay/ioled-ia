"use strict";

const Bigtable = require("@google-cloud/bigtable");

const TABLE_ID = "env-data";
const COLUMN_FAMILY_ID = "env";
const COLUMN_QUALIFIER = "enviromental-data";
const INSTANCE_ID = "ioled-data";

const bigtableClient = new Bigtable();
const instance = bigtableClient.instance(INSTANCE_ID);
const table = instance.table(TABLE_ID);

/**
 * Receive data from pubsub, then
 * write telemetry raw data to bigtable
 */
exports.testingPubSub = (input, context) => {
  const attributes = input.attributes;
  const deviceId = attributes["deviceId"];
  const message = JSON.parse(Buffer.from(input.data, "base64").toString());

  const data = {
    humidity: message.hum,
    temp: message.temp,
    deviceId: deviceId,
    timestamp: context.timestamp
  };
  console.log("[GOOGLE_CLOUD_FUNCTION][BIG_TABLE] Inserting row to BigTable");
  return Promise.all([insertIntoBigTable(data)]);
};

/**
 * Logic related to bigtable data insertions
 * there'll be no change to the data in the parameter
 */
const insertIntoBigTable = async data => {
  try {
    const todayNow = new Date();
    const rowToInsert = {
      key: `${data.deviceId}#${new Date().setHours(
        todayNow.getHours(),
        0,
        0,
        0
      )}`,
      data: {
        [COLUMN_FAMILY_ID]: {
          [COLUMN_QUALIFIER]: {
            value: `${data.humidity}#${data.temp}#${data.timestamp}`
          }
        }
      }
    };
    console.log(
      "[GOOGLE_CLOUD_FUNCTION][BIG_TABLE] Row To Insert: ",
      rowToInsert
    );
    await table.insert(rowToInsert);
  } catch (error) {
    console.error(
      "[GOOGLE_CLOUD_FUNCTION][BIG_TABLE] Something went wrong:",
      error
    );
  }
};

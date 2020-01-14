"use strict";

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");

// Imports the Google Cloud client library
const Bigtable = require("@google-cloud/bigtable");
const bigtable = Bigtable();

admin.initializeApp();

/**
 * Receive data from pubsub, then
 * write telemetry raw data to bigquery
 */
exports.PubSubToBigquery = functions.pubsub
  .topic("devices")
  .onPublish((message, context) => {
    const attributes = message.attributes;
    const payload = message.json;

    const deviceId = attributes["deviceId"];

    const data = {
      humidity: payload.hum,
      temp: payload.temp,
      deviceId: deviceId,
      timestamp: context.timestamp
    };

    console.log(data);

    insertIntoBigtable(data);
  });

/**
 * Store all the raw data in bigtable
 */
async function insertIntoBigtable(data) {
  const INSTANCE_ID = "ioled-data";
  const TABLE_ID = "env-data";

  // Connect to an existing instance:my-bigtable-instance
  const instance = bigtable.instance(INSTANCE_ID);

  // Connect to an existing table:my-table
  const table = instance.table(TABLE_ID);

  // Read a row from my-table using a row key
  const [singleRow] = await table.row("r1").get();

  // Print the row key and data (column value, labels, timestamp)
  const rowData = JSON.stringify(singleRow.data, null, 4);
  console.log(`Row key: ${singleRow.id}\nData: ${rowData}`);
}

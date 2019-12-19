'use strict';

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

// Import the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

admin.initializeApp();

/**
 * Receive data from pubsub, then 
 * write telemetry raw data to bigquery
 */
exports.receivePubSub = functions.pubsub
    .topic('devices')
    .onPublish((message, context) => {  

        const attributes = message.attributes;
        const payload = message.json;
    
        const deviceId = attributes['deviceId'];
    
        const data = {
          humidity: payload.hum,
          temp: payload.temp,
          deviceId: deviceId,
          timestamp: context.timestamp
        };

        console.log(data);

        return Promise.all([      
            insertIntoBigquery(data)
        ]) 

    });

/**
 * Store all the raw data in bigquery
 */
async function insertIntoBigquery(data) {
    const datasetId = 'state_devices_data';
    const tableId = 'raw_data';
    
    await bigquery
      .dataset(datasetId)
      .table(tableId)
      .insert(data);
    
    console.log(`Inserted rows`);

  }
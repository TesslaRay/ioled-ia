'use strict';

const automl = require('@google-cloud/automl');
const request = require('request');

const base64 = require('node-base64-image');

// Create client for prediction service.
const client = new automl.PredictionServiceClient();

const projectId = 'ioled-dev-248517';
const computeRegion = 'us-central1';
const modelId = 'ICN690568069034016768';
const fileURL = 'https://storage.cloud.google.com/ioled-upload/15725348648923.jpeg';
const scoreThreshold = '0.7';
const filePath = '/Users/cristian/Desktop/3.jpeg';

// Get the full path of the model.
const modelFullId = client.modelPath(projectId, computeRegion, modelId);

exports.predictWithImage = async (req, res) => {
  request.get({url: fileURL, encoding: null}, async (err, res, body) => {
    const data = body.toString('base64');

    // console.log(data);

    const params = {};

    if (scoreThreshold) {
      params.score_threshold = scoreThreshold;
    }

    // Set the payload by giving the content and type of the file.
    const payload = {};
    payload.image = {imageBytes: data};

    // params is additional domain-specific parameters.
    // currently there is no additional parameters supported.
    const [response] = await client.predict({
      name: modelFullId,
      payload: payload,
      params: params,
    });
    console.log('Prediction results');
    res.status(200).send({response});
    console.log(response);
  });

  // Read the file content for prediction.

  // console.log(image);

  // const params = {};

  // if (scoreThreshold) {
  //    params.score_threshold = scoreThreshold;
  // }

  // // Set the payload by giving the content and type of the file.
  // const payload = {};
  // payload.image = {imageBytes: data};

  // // params is additional domain-specific parameters.
  // // currently there is no additional parameters supported.
  // const [response] = await client.predict({
  //     name: modelFullId,
  //     payload: payload,
  //     params: params,
  // });
  // console.log('Prediction results');
  // res.status(200).send({response});
  // console.log(response);
};

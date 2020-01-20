"use strict";

const automl = require("@google-cloud/automl");
const fs = require("fs");

// Create client for prediction service.
const client = new automl.PredictionServiceClient();

//TODO(cv): move to constants keys file
const projectId = "ioled-dev-248517";
const computeRegion = "us-central1";
const modelId = "ICN690568069034016768";
const scoreThreshold = "0.7";

// Get the full path of the model.
const modelFullId = client.modelPath(projectId, computeRegion, modelId);

exports.predictWithImage = async (req, res) => {
  // Read the file content for prediction.
  const content = fs.readFileSync(req, "base64");

  const params = {};

  if (scoreThreshold) {
    params.score_threshold = scoreThreshold;
  }

  // Set the payload by giving the content and type of the file.
  const payload = {};
  payload.image = { imageBytes: content };

  console.log("Predicting...");

  // params is additional domain-specific parameters.
  // currently there is no additional parameters supported.
  const [response] = await client.predict({
    name: modelFullId,
    payload: payload,
    params: params
  });
  return response.payload;
};

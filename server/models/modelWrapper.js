const tf = require('@tensorflow/tfjs-node');
const path = require('path');

let model;

async function loadModel() {
  const modelPath = path.join(__dirname, '../../aimodels/model.json');
  model = await tf.loadLayersModel(`file://${modelPath}`);
}

async function predictPrice(bedrooms, bathrooms, parking) {
  if (!model) {
    await loadModel();
  }

  const input = tf.tensor2d([[bedrooms, bathrooms, parking]]);
  const prediction = model.predict(input);
  const result = await prediction.data();
  return result[0];
}

module.exports = { predictPrice };
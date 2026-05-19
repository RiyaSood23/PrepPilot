const { app, initializeApp } = require("../server");

let readyPromise;

module.exports = async (req, res) => {
  if (!readyPromise) {
    readyPromise = initializeApp();
  }

  await readyPromise;
  return app(req, res);
};
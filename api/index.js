const { app, initializeApp } = require("../server");

let readyPromise;

function needsBootstrap(requestPath) {
  return requestPath.startsWith("/api/") || requestPath === "/companies-view";
}

function sendBootstrapError(res, requestPath, error) {
  const message = error && error.message ? error.message : "Service unavailable";

  if (requestPath.startsWith("/api/")) {
    res.status(503).json({
      success: false,
      message: "Service unavailable",
      error: message
    });
    return;
  }

  res.status(503).send(`Service unavailable: ${message}`);
}

module.exports = async (req, res) => {
  const requestPath = (req.url || "/").split("?")[0];

  if (!needsBootstrap(requestPath)) {
    return app(req, res);
  }

  if (!readyPromise) {
    readyPromise = initializeApp();
  }

  try {
    await readyPromise;
  } catch (error) {
    return sendBootstrapError(res, requestPath, error);
  }

  return app(req, res);
};
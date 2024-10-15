// middleware/errorMiddleware/index.js

const express = require("express");

const errorHandler = async (err, req, res, next) => {
	// an error handler must accept 4 arguments
	console.error(err);
	res
		.status(err.status || 500)
		.json({ error: err.message || "A server error has occurred." });
};

module.exports = {
	errorHandler,
};

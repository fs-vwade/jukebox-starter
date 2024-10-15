const express = require("express");
const { routes, errorHandler } = require("./routes");

const app = express();
const PORT = 3000;

// i want to run all paths through a single router import
app.use(routes);

// lastly i want to run all errors through a single error handler
app.use(errorHandler);

// finally, run the server on PORT 3000
app.listen(PORT);

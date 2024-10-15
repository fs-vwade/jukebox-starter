// routes/users/index.js

const express = require("express");
const router = express.Router();

const userRoutes = {
	router.get("/", )
}
	router; /* i saw my instructor use some kind of function constructor which listed all available paths with their corresponding methods (get, post, put, etc) alongside their corresponding route handlers: such as `router.get("/", home_fn, home_login_fn)` or `router`

It was something like:

const routes = createRoutes(
	router.get("/", home_fn, auth_fn)
	router.get("/me", auth_fn, profile_fn)
	router.get("/posts", auth_fn, upload_fn)

	router.post("/search/:query", search_fn)
	router.post("/submit", auth_fn, upload_fn)

	router.put("/me", auth_fn, update_profile_fn)
)

Afterwards, it was a similar process for error handling as well.
Every function was able to call its `next()` function to continue the intended pipeline.

*/

module.exports = router;

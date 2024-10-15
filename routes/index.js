// routes/index.js

const express = require("express");
const usersRouter = require("./users");
const tracksRouter = require("./tracks");
const playlistsRouter = require("./playlists");
const { errorHandler } = require("../middleware");

const router = express.Router();

router.use(require("morgan")("dev"));
router.use(express.json());

router.use("/users", usersRouter);
router.use("/tracks", tracksRouter);
router.use("/playlists", playlistsRouter);

module.exports = {
	routes: router,
	errorHandler,
};

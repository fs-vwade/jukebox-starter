// routes/users/index.js

const express = require("express");
const prisma = require("../../prisma");
const router = express.Router();

// users
router.get("/", async (req, res, next) => {
	try {
		res.json(await prisma.user.findMany());
	} catch (e) {
		next(e);
	}
});
router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = await prisma.user.findUnique({
			where: { id: Number(id) },
		});
		if (user) {
			// send specific user. include all owned playlists
			user.playlists = await prisma.playlist.findMany({
				where: { ownerId: user.id },
			});
			res.json(user);
		} else {
			res.status(404).send("A user with that ID cannot be found.");
		}
	} catch (e) {
		next(e);
	}
});

module.exports = router;

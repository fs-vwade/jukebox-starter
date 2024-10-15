// routes/users/index.js

const express = require("express");
const prisma = require("../../prisma");
const router = express.Router();

// users
router.get("/", async (req, res) => {
	try {
		req.json(await prisma.user.findMany());
	} catch (e) {
		next(e);
	}
});
router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const user = await prisma.user.findUnique({
			where: { id: Number(id) },
		});
		if (user) {
			// send specific user. include all owned playlists
			res.json({ user: user.username, playlists: user.playlists });
		} else {
			res.status(404).send("A user with that ID cannot be found.");
		}
	} catch (e) {
		next(e);
	}
});

module.exports = router;

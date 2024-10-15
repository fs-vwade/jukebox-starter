// routes/tracks/index.js

const express = require("express");
const prisma = require("../../prisma");
const router = express.Router();

// tracks
router.get("/", async (req, res) => {
	try {
		res.json(await prisma.track.findMany());
	} catch (e) {
		next(e);
	}
});
router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const track = await prisma.track.findUnique({
			where: { id: Number(id) },
		});
		if (track) {
			// send specific track.
			res.json({ song: track.name });
		} else {
			res.status(404).send("A song with that ID cannot be found.");
		}
	} catch (e) {
		next(e);
	}
});

module.exports = router;

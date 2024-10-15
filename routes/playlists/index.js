// routes/playlists/index.js

const express = require("express");
const prisma = require("../../prisma");
const { faker } = require("@faker-js/faker");
const router = express.Router();

// playlists
router.get("/", async (req, res, next) => {
	try {
		res.json(await prisma.playlist.findMany());
	} catch (e) {
		next(e);
	}
});
router.post("/", async (req, res, next) => {
	try {
		const { userId, songIds } = req.body;
		const user = await prisma.playlist.findUnique({
			where: { id: Number(userId) },
		});

		if (user && Array.isArray(songIds)) {
			const playlist = await prisma.playlist.create({
				data: {
					name: `${faker.music.genre()} ${faker.music.album()}`,
					description: faker.lorem.text(),
					tracks: { connect: songIds.map((e) => ({ id: e })) },
					owner: { connect: { id: user.id } },
				},
			});
			res.status(201).json(playlist);
		} else {
			res.status(404).json({
				error: {
					user: user ? `OK` : `A user with ID#${id} cannot be found.`,
					songs: Array.isArray(songIds)
						? `OK`
						: `\`songIds\` is not an array. Got: ${songIds}`,
				},
			});
		}
	} catch (e) {
		next(e);
	}
});
router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const track = await prisma.playlist.findUnique({
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

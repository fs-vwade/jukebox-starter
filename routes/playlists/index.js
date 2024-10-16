// routes/playlists/index.js

const express = require("express");
const prisma = require("../../prisma");
const { faker } = require("@faker-js/faker");
const router = express.Router();

// playlists
router.get("/", async (req, res, next) => {
	try {
		res.json({ playlists: await prisma.playlist.findMany() });
	} catch (e) {
		next(e);
	}
});
router.post("/", async (req, res, next) => {
	try {
		const { userId: id, songIdList: list } = req.body;
		const user = await prisma.user.findUnique({
			where: { id: Number(id) },
		});

		if (user && Array.isArray(list)) {
			const playlist = await prisma.playlist.create({
				data: {
					name: `${faker.music.genre()} ${faker.music.album()}`,
					description: faker.lorem.sentences(),
					tracks: { connect: list.map((e) => ({ id: e })) },
					owner: { connect: { id: user.id } },
				},
			});
			res.status(201).json(playlist);
		} else {
			res.status(404).json({
				error: {
					user: user ? `OK` : `A user with ID#${id} cannot be found.`,
					songs: Array.isArray(list)
						? `OK`
						: `\`list\` is not an array. Got: ${list}`,
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
		const playlist = await prisma.playlist.findUnique({
			where: { id: Number(id) },
		});
		if (playlist) {
			// send specific playlist.
			res.json({ playlist: playlist });
		} else {
			res.status(404).send("A song with that ID cannot be found.");
		}
	} catch (e) {
		next(e);
	}
});

module.exports = router;

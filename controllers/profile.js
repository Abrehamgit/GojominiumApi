const handlePost = (db, jwt) => (req, res) => {
	console.log("postting");
	const {
		condoid,
		ownerid,
		apType,
		location,
		type,
		floor,
		area,
		sellorrent,
		price,
		phonenumber,
		description,
		kitchencabinate,
		gypsum,
		tiles,
		ceramics,
		spotlights,
		featured,
		images
	} = req.body;

	db.insert({
		id: condoid,
		ownerid,
		location,
		type,
		floor,
		area,
		sellorrent,
		price,
		phonenumber,
		description,
		kitchencabinate,
		gypsum,
		tiles,
		ceramics,
		spotlights,
		featured,
		aptype: apType,
		image1: images[0],
		image2: images[1],
		image3: images[2],
		image4: images[3],
		image5: images[4],
		image6: images[5],
		image7: images[6],
		image8: images[7],
		image9: images[8],
		image10: images[9]
	})
		.into("condominiums")
		.returning("*")
		.then(data => {
			res.json("successfully posted");
		})
		.catch(err => {
			console.log(err);
			res.status(400).json({ err: err, message: "something went wrong" });
		});
};

const handleGetCondos = (db, jwt) => (req, res) => {
	const { ownerid } = req.params;
	db.select("*")
		.from("condominiums")
		.orderBy("postedat", "desc")
		.where({ ownerid })
		.then(data => {
			res.json({ userCondos: data });
		})
		.catch(err => res.json({ message: "something whent wrong", err }));
};

const handleDeleteCondo = (db, jwt) => (req, res) => {
	const { condoId } = req.body;
	console.log("deleting", condoId);
	db.select("*")
		.from("condominiums")
		.where("id", "=", condoId)
		.del()
		.then(() => {
			res.json("deleted");
		})
		.catch(err => res.json("something went wrong"));
};

const handleEditCondo = (db, jwt) => (req, res) => {
	const {
		condoid,
		ownerid,
		apType,
		location,
		type,
		floor,
		area,
		sellorrent,
		price,
		phonenumber,
		description,
		kitchencabinate,
		gypsum,
		tiles,
		ceramics,
		spotlights,
		postedat,
		images
	} = req.body;
	db.select("*")
		.from("condominiums")
		.where("id", "=", condoid)
		.update({
			location,
			type,
			floor,
			area,
			sellorrent,
			price,
			phonenumber,
			description,
			kitchencabinate,
			gypsum,
			tiles,
			ceramics,
			spotlights,
			postedat,
			aptype: apType,
			image1: images[0],
			image2: images[1],
			image3: images[2],
			image4: images[3],
			image5: images[4],
			image6: images[5],
			image7: images[6],
			image8: images[7],
			image9: images[8],
			image10: images[9]
		})
		.then(() => {
			res.json("successfully editted");
		})
		.catch(err => res.json({ message: "something went wrong", err: err }));
};

module.exports = {
	handlePost,
	handleGetCondos,
	handleDeleteCondo,
	handleEditCondo
};

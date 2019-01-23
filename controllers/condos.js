const moment = require("moment");

const handleGetAllCondos = db => (req, res) => {
	const { offset } = req.params;

	db.select("*")
		.from("condominiums")
		.orderBy("postedat", "desc")
		.offset(offset * 9)
		.limit(9)
		.then(data => res.json({ allCondominiums: data, message: "loaded" }))
		.catch(err =>
			res.json({
				message: "something went wrong",
				error: err
			})
		);
};

const handleGetACondo = db => (req, res) => {
	console.log(req.params);
	const { condoId } = req.params;
	db.select("*")
		.from("condominiums")
		.where("id", "=", condoId)
		.then(data => res.json({ condo: data[0], message: "loaded" }))
		.catch(err => res.json({ message: "something went wrong", err }));
};

const handleGetFeaturedCondos = db => (req, res) => {
	const now = moment();

	db.select("*")
		.from("condominiums")
		.orderBy("postedat", "desc")
		.offset(0)
		.limit(15)
		.where("featured", "=", true)
		.returning("*")
		.where("expdate", ">=", now)
		.returning("*")
		.then(data => res.json({ featuredCondos: data, message: "lodaed" }))
		.catch(err => res.json({ err, message: "something went wrong" }));
};

const handleGetRecentCondos = db => (req, res) => {
	db.select("*")
		.from("condominiums")
		.orderBy("postedat", "desc")
		.offset(0)
		.limit(10)
		.then(data =>
			res.json({ recentCondos: data, message: "recent loaded" })
		)
		.catch(err => res.json({ err: err, message: "something went wrong" }));
};

const handleGetFilteredCondos = db => (req, res) => {
	console.log("params", req.params);
	const {
		location,
		type,
		sellorrent,
		minPrice,
		maxPrice,
		offset
	} = req.params;

	db.select("*")
		.from("condominiums")
		.orderBy("postedat", "desc")
		.where("location", "ilike", `%${location.trim()}%`)
		.returning("*")
		.where("sellorrent", "ilike", `%${sellorrent.trim()}%`)
		.returning("*")
		.where("type", "ilike", `%${type.trim()}%`)
		.returning("*")
		.whereBetween("price", [minPrice - 100, maxPrice])

		.limit(50)
		.then(data =>
			res.json({
				message: "filtered condos loaded",
				filteredCondos: data
			})
		)
		.catch(err => res.json({ err: err, message: "something went wrong" }));
};

module.exports = {
	handleGetAllCondos,
	handleGetACondo,
	handleGetFeaturedCondos,
	handleGetRecentCondos,
	handleGetFilteredCondos
};

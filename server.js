const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const knex = require("knex");
const bcrypt = require("bcrypt");
const moment = require("moment");

const signIn = require("./controllers/signIn");
const register = require("./controllers/register");
const profile = require("./controllers/profile");
const condos = require("./controllers/condos");
const secrets = require("./config/secrets");

const app = express();

const db = knex({
	client: "pg",
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: true
	}
});

const SECRET = secrets.JWT_SECRET;

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
	res.json("root request  i hear you");
});

app.post("/register", register.handleRegister(db, jwt, bcrypt, SECRET, moment));

app.post("/signin", signIn.handleSignIn(db, jwt, bcrypt, SECRET, moment));

app.post("/post", profile.handlePost(db, jwt));

app.put("/edit_condo", profile.handleEditCondo(db, jwt));

app.get("/get_condos/:ownerid", profile.handleGetCondos(db, jwt));

app.get("/get_all_condos/:offset", condos.handleGetAllCondos(db));

app.get("/get_a_condo/:condoId", condos.handleGetACondo(db));

app.get("/get_featured_condos", condos.handleGetFeaturedCondos(db));

app.get("/get_recent_condos", condos.handleGetRecentCondos(db));

app.get(
	"/get_filtered_condos/:location/:type/:sellorrent/:minPrice/:maxPrice",
	condos.handleGetFilteredCondos(db)
);

// app.post("/cover", upload.single("coverImg"), (req, res) => {
// 	console.log("uploading");
// 	console.log(req.file);
// });

app.delete("/delete_condo", profile.handleDeleteCondo(db, jwt));

app.listen(
	process.env.PORT || 8000,
	console.log(`app is running on port ${process.env.PORT}`)
);

// get filtered
// get recent
// get featured

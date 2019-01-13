const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const knex = require("knex");
const bcrypt = require("bcrypt");
// const multer = require("multer");
const signIn = require("./controllers/signIn");
const register = require("./controllers/register");
const profile = require("./controllers/profile");
const condos = require("./controllers/condos");

const app = express();
// const storage = multer.diskStorage({
// 	destination: function(req, file, cb) {
// 		cb(null, "./uploads");
// 	},
// 	filename: function(req, file, cb) {
// 		cb(null, new Date().toISOString() + file.originalname);
// 	}
// });

// const upload = multer({ storage: storage });

app.use(express.static("uploads"));

const db = knex({
	client: "pg",
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: true
	}
});

const SECRET = "akjasdiioqwbjbhio123hoihoxdcai12boiu123bouaoiasdo";

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
	console.log("reqesting");
	res.json("i hear you");
});

app.post("/register", register.handleRegister(db, jwt, bcrypt, SECRET));

app.post("/signin", signIn.handleSignIn(db, jwt, bcrypt, SECRET));

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

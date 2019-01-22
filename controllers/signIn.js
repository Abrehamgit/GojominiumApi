const handleSignIn = (db, jwt, bcrypt, SECRET, moment) => (req, res) => {
	const { email, password } = req.body;

	const expDate = moment().hour(2);

	db.select("id", "email", "hash")
		.from("users")
		.where("email", "=", email)
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].hash);
			if (isValid) {
				const userId = data[0].id;
				const token = jwt.sign({ userId }, SECRET, {
					expDate
				});

				res.json({ userId, token });
			} else {
				res.json("wrong credentials");
			}
		})
		.catch(err => res.json("wrong credentials"));
};

module.exports = {
	handleSignIn
};

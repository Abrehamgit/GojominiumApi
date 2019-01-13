const handleRegister = (db, jwt, bcrypt, SECRET) => (req, res) => {
	const { userId, email, password } = req.body;
	console.log(req.body);
	bcrypt.hash(password, 12, (err, hash) => {
		const token = jwt.sign({ userId }, SECRET, { expiresIn: "2hr" });
		db.insert({
			id: userId,
			email: email,
			hash: hash,
			joinedat: new Date()
		})
			.into("users")
			.returning("id")
			.then(data =>
				res.json({
					status: "registered",
					userId: data.id,
					token: token
				})
			)
			.catch(err => res.json({ error: err }));
	});
};

module.exports = {
	handleRegister
};

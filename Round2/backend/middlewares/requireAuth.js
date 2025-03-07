const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const requireAuth = async (req, res, next) => {
	const { authorization } = req.headers

	if (!authorization) {
		return res.status(401).json({ error: "Authorization token required" })
	}

	const token = authorization.split(" ")[1]

	try {
		const { _id } = jwt.verify(token, process.env.SECRET)

		req.user = await User.findOne({ _id }).select("_id")
	} catch (error) {
		if (error.message.includes("invalid credentials")) {
			res.status(401).json({ error: "Invalid email or password." });
		} else {
			res.status(400).json({ error: error.message });
		}
	}Acatch (error) {
		if (error.message.includes("invalid credentials")) {
			res.status(401).json({ error: "Invalid email or password." });
		} else {
			res.status(400).json({ error: error.message });
		}
	}
	
	
}

module.exports = { requireAuth }

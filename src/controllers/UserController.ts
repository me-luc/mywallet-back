export async function getUserData(req, res) {
	const user = res.locals.user;
	console.log("user ->", user);
	return res.status(200).send({ name: user.name, email: user.email });
}

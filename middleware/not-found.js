const notfound = (req, res) => res.status(404).json({msg: "The page you're looking for doesn't exist."})

module.exports = notfound;
var mongoose = require('mongoose');
var crypto = require('crypto');

var SaltSchema = new mongoose.Schema({
	coupleId: {type: mongoose.Schema.Types.ObjectId, ref: "Couple"},
	salt: String
});

SaltSchema.methods.setSalt = function () {
	var salt = crypto.randomBytes(64).toString("hex");
	this.salt = salt;
}

mongoose.model("Salts", SaltSchema);

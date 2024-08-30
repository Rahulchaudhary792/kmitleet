import mongoose from 'mongoose';
const signupSchema = mongoose.Schema({
	'username': {
		type: String
	},
	'email': {
		type: String
	},
	'password': {
		type: String
	}
});
const signupModel = mongoose.model('signupModel', signupSchema);
export default signupModel;
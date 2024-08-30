import mongoose from 'mongoose';
const db = mongoose.connect('mongodb://0.0.0.0:27017/leetcodesignup').then(() => {
	console.log('Connection Successful');
}).catch((error) => {
	console.log('Connection not successful');
});
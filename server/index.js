const express = require('express');
const mongoose = require('mongoose');
const TodoModel = require('./modules/Todo');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
	`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@crud.rpq4m.mongodb.net/todo?retryWrites=true&w=majority`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);
//send the data into the database
app.post('/', async (req, res) => {
	const todoItem = req.body.todo;
	const todo = new TodoModel({
		todo_item: todoItem,
	});

	try {
		await todo.save();
		res.send('its working');
	} catch (err) {
		console.log(err);
	}
});

// read/get data from the database
app.get('/read', (req, res) => {
	TodoModel.find({}, (err, result) => {
		if (err) {
			res.send(err);
		}
		res.send(result);
	});
});

app.delete('/delete/:id', async (req, res) => {
	const id = req.params.id;
	await TodoModel.findByIdAndRemove(id).exec();
	// console.log(id);
	res.send(id);
});

app.listen(3001, () => console.log('server is running in 3001'));

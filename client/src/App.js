import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function App() {
	const [todo, setTodo] = useState('');
	const [todoList, setTodoList] = useState([]);
	const [filter, setFilter] = useState([]);

	const handleClick = () => {
		Axios.post('http://localhost:3001/', {
			todo: todo,
		});
		setTodo('');
	};

	useEffect(() => {
		Axios.get('http://localhost:3001/read').then((res) =>
			setTodoList(res.data)
		);
	}, []);

	function handleDelete(id, index) {
		Axios.delete(`http://localhost:3001/delete/${id}`);
		setTodoList(todoList.filter((item, i) => i !== index));
		// console.log(id);
	}
	console.log(filter);

	return (
		<div className='todo'>
			<label htmlFor=''>Todo</label>
			<input
				type='text'
				onChange={(e) => setTodo(e.target.value)}
				value={todo}
			/>
			<button onClick={handleClick}>Add</button>

			<div>
				{todoList.map((item, index) => {
					return (
						<div className='todoItems' key={index}>
							<h3>{item.todo_item}</h3>
							<button onClick={() => handleDelete(item._id, index)}>
								Delete
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}

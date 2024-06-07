import React, { useState } from 'react';
import axios from 'axios';

export const TodoForm = ({ addTodo }) => {
    const [value, setValue] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (value) {
            try {
                const response = await axios.post('http://localhost:4000/todos', { task: value, completed: false });
                console.log('Todo added:', response.data);
                addTodo(response.data); // Add the response data as the new todo
                setValue('');
            } catch (error) {
                console.error('Error adding todo:', error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="TodoForm">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="todo-input"
                placeholder="What is the task today?"
            />
            <button type="submit" className="todo-btn">Add Task</button>
        </form>
    );
};

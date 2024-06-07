import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import axios from "axios";

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get('http://localhost:4000/todos');
                setTodos(response.data);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        fetchTodos();
    }, []);

    const addTodo = (todo) => {
        setTodos([
            ...todos,
            { id: uuidv4(), ...todo, isEditing: false },
        ]);
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/todos/${id}`);
            setTodos(todos.filter((todo) => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const toggleComplete = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const editTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
            )
        );
    };

    const editTask = async (task, id) => {
        try {
            const response = await axios.put(`http://localhost:4000/todos/${id}`, { task, completed: false });
            setTodos(
                todos.map((todo) =>
                    todo.id === id ? { ...response.data, isEditing: !todo.isEditing } : todo
                )
            );
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    return (
        <div className="TodoWrapper">
            <h1>To-Do-List !</h1>
            <TodoForm addTodo={addTodo} />
            {/* display todos */}
            {todos.map((todo) =>
                todo.isEditing ? (
                    <EditTodoForm editTodo={editTask} task={todo} key={todo.id} />
                ) : (
                    <Todo
                        key={todo.id}
                        task={todo}
                        deleteTodo={deleteTodo}
                        editTodo={editTodo}
                        toggleComplete={toggleComplete}
                    />
                )
            )}
        </div>
    );
};

import { useState, useEffect } from "react";
import "./todo.css";
// import { MdCheck } from "react-icons/md";
// import { AiTwotoneDelete } from "react-icons/ai";
// 
import { CiCircleCheck } from "react-icons/ci";
import { TiDeleteOutline } from "react-icons/ti";

const todokey = "TodoTask";

export const Todo = () => {
    const [inputValue, setInputValue] = useState("");
    const [task, setTask] = useState(() => {
        const rawData = localStorage.getItem(todokey);
        return rawData ? JSON.parse(rawData) : [];
    });
    const [completedTasks, setCompletedTasks] = useState([]);
    const [dateTime, setDateTime] = useState("");

    useEffect(() => {
        localStorage.setItem(todokey, JSON.stringify(task));
    }, [task]);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const formattedDate = now.toLocaleDateString();
            const formattedTime = now.toLocaleTimeString();
            setDateTime(`${formattedDate} - ${formattedTime}`);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleInputChange = (value) => {
        setInputValue(value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (!inputValue.trim() || task.includes(inputValue)) return;
        setTask((prevTask) => [...prevTask, inputValue]);
        setInputValue("");
    };

    const handleDeleteTodo = (value) => {
        setTask((prevTask) => prevTask.filter((curTask) => curTask !== value));
        setCompletedTasks((prevCompleted) => prevCompleted.filter((item) => item !== value));
    };

    const handleClearTodo = () => {
        setTask([]);
        setCompletedTasks([]);
    };

    const handleToggleComplete = (value) => {
        if (completedTasks.includes(value)) {
            setCompletedTasks((prevCompleted) => prevCompleted.filter((item) => item !== value));
        } else {
            setCompletedTasks((prevCompleted) => [...prevCompleted, value]);
        }
    };

    return (
        <section className="todo-container">
            <header>
                <h1>Todo List</h1>
                <h2 className="date-time">{dateTime}</h2>
            </header>
            <section className="form">
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <input
                            type="text"
                            className="todo-input"
                            autoComplete="off"
                            value={inputValue}
                            onChange={(event) => handleInputChange(event.target.value)}
                        />
                    </div>
                    <div>
                        <button type="submit" className="todo-btn">Add Task</button>
                    </div>
                </form>
            </section>

            <section className="myUnOrdList">
                <ul>
                    {task.map((curTask, index) => {
                        const isCompleted = completedTasks.includes(curTask);
                        return (
                            <li key={index} className="todo-item">
                                <span className={isCompleted ? "completed" : ""}>{curTask}</span>
                                <button className="check-btn" onClick={() => handleToggleComplete(curTask)}>
                                <CiCircleCheck />
                                </button>
                                <button className="delete-btn" onClick={() => handleDeleteTodo(curTask)}>
                                <TiDeleteOutline />
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </section>
            <section>
                <button className="clear-btn" onClick={handleClearTodo}>Clear All</button>
            </section>
        </section>
    );
};

import { useState } from 'react';
import PropTypes from 'prop-types';
import Task from './Task.jsx';

export default function Project(props) {
    const [taskList, setTaskList] = useState(props.tasks || []);

    const handleAddTask = () => {
        // Add new task to the task list
        const newTask = document.getElementById('task').value;
        setTaskList([...taskList, newTask]);
    };

    const handleRemoveTask = (taskToRemove) => {
        // Remove the specified task from the task list
        const updatedTaskList = taskList.filter(task => task !== taskToRemove);
        setTaskList(updatedTaskList);
    };

    const tasks = taskList.map((task) => (
        <Task key={task} task={task} onRemove={() => handleRemoveTask(task)} />
    ));

    return (
        <div className="p-8 w-2/3 flex flex-row justify-center">
            <div className="flex flex-col">
                <h1 className="text-3xl font-bold mb-2">{props.title}</h1>
                <h1 className="text-2xl mb-2">Due Date: {props.date}</h1>
                <h1 className="text-2xl mb-2">Description: {props.description}</h1>
                <label htmlFor="task" className="block text-lg mb-1">Add Task:</label>
                <input type="text" id="task" className="border rounded p-2 focus:outline-none focus:border-blue-500 border-black focus:ring focus:ring-blue-200" />
                <button onClick={handleAddTask}>Add Task</button>
                {tasks}
            </div>
        </div>
    );
}

Project.propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tasks: PropTypes.array,
};
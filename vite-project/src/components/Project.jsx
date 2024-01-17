import { useState } from 'react';
import PropTypes from 'prop-types';
import Task from './Task.jsx';

export default function Project(props) {
  const [taskList, setTaskList] = useState(props.tasks || []);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = async () => {
    console.log(props.id)
    // Add new task to the task list
    setTaskList([...taskList, newTask]);

    // Clear the task input
    setNewTask('');

    // Send a request to update tasks in the backend
    try {
      await fetch(`http://localhost:3000/projects/${props.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tasks: [...taskList, newTask] }),
      });
    } catch (error) {
      console.error('Error updating tasks:', error);
      // Handle error as needed
    }
  };

  const handleRemoveTask = async (taskToRemove) => {
    if (!props.id) {
      console.error('Project ID is undefined');
      // Handle this case, perhaps show a user-friendly message
      return;
    }
  
    // Remove the specified task from the task list
    const updatedTaskList = taskList.filter((task) => task !== taskToRemove);
    setTaskList(updatedTaskList);
  
    // Send a request to update tasks in the backend
    try {
      await fetch(`http://localhost:3000/projects/${props.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tasks: updatedTaskList }),
      });
    } catch (error) {
      console.error('Error updating tasks:', error);
      // Handle error as needed
    }
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
        <label htmlFor="task" className="block text-lg mb-1">
          Add Task:
        </label>
        <input
          type="text"
          id="task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border rounded p-2 focus:outline-none focus:border-blue-500 border-black focus:ring focus:ring-blue-200"
        />
        <button onClick={handleAddTask}>Add Task</button>
        {tasks}
      </div>
    </div>
  );
}

Project.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tasks: PropTypes.array,
};
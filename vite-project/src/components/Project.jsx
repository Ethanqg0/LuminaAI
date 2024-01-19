import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Task from './Task.jsx';
import plusPhoto from '../assets/plus.png';

export default function Project(props) {
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`http://localhost:3000/projects/${props.id}`, {
        headers: {
          'Authorization': `Bearer ${props.token}`,
        },
      });
      const data = await response.json();
      setTaskList(data.tasks);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false); // Set loading to false in case of an error
    }
  }
  
  useEffect(() => {
    fetchTasks();
  }, [props.token, props.id, props.title]);

  // adds task to the task list, and updates the database, and resets the input field
  const handleAddTask = async () => {
    const updatedTaskList = [...taskList, newTask];
    try {
      await fetch(`http://localhost:3000/projects/${props.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.token}`,
        },
        body: JSON.stringify({ tasks: updatedTaskList }),
      });
    } catch (error) {
      console.error('Error updating tasks:', error);
    }
    setTaskList(updatedTaskList);
    setNewTask('');
  };

  // removes task from the task list, and updates the database
  const handleRemoveTask = async (taskToRemove) => {
    const updatedTaskList = taskList.filter((task) => task !== taskToRemove);
    try {
      await fetch(`http://localhost:3000/projects/${props.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.token}`,
        },
        body: JSON.stringify({ tasks: updatedTaskList }),
      });
    } catch (error) {
      console.error('Error updating tasks:', error);
      // Handle error as needed
    }
    setTaskList(updatedTaskList);
    console.log(updatedTaskList)
  };

  const tasks = taskList.map((task, index) => (
    <Task key={index} task={task} onRemove={() => handleRemoveTask(task)} />
  ));
  
  return (
    <div className="p-8 w-2/3 h-4/5 flex flex-row">
      <div className="flex w-full flex-col justify-around">
        <div className="w-full">
          <h1 className="text-4xl font-bold mb-2">{props.title}</h1>
          <h1 className="text-lg text-stone-600 mb-8">Due Date: {props.date}</h1>
          <h1 className="text-lg text-stone-800 mb-2 font"><span className="font-bold">Description:</span> {props.description}</h1>
        </div>
        <div className="flex flex-row items-center w-full">
          <label htmlFor="task" className="block text-lg mb-1 mr-4">
            Add Task:
          </label>
          <input
            type="text"
            id="task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="border rounded p-1 focus:outline-none focus:border-blue-500 border-black focus:ring focus:ring-blue-200 w-1/2"
          />
          <img src={plusPhoto} onClick={handleAddTask} className="w-8 ml-4"></img>
        </div>
        <div className="w-full h-1/3 overflow-auto border p-4 shadow-md">
          <ul className="">
            {tasks.map((task, index) => (
              <li key={index} className="mb-2 no-underline flex flex-row">
                {task}
              </li>
            ))}
          </ul>
        </div>
        <div className="">
          <button className="rounded-md bg-black px-6 py-2 text-sm font-semibold text-white shadow-s hover:bg-red-600 hover:text-black transition-colors duration-300" onClick={() => props.handleDeleteProject(props.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}

Project.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tasks: PropTypes.array,
  token: PropTypes.string, // Assuming you have a token prop for authorization
  handleDeleteProject: PropTypes.func.isRequired,
};
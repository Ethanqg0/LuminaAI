import { useState } from 'react';
import './index.css';
import Nav from './components/Nav.jsx';
import Project from './components/Project.jsx';
import SideBar from './components/SideBar.jsx';

export default function App() {
  const [creatingProject, setCreatingProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    date: "", 
    tasks: []
  });

  const toggleCreateProject = () => {
    setCreatingProject(!creatingProject);
  }

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    console.log(project.description);
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    // Create a new project using form values
    const newProject = { ...formValues, tasks: [] };
  
    // Update the projects state with the new project
    setProjects([...projects, newProject]);
  
    // Reset the form values
    setFormValues({
      title: "",
      description: "",
      date: "",
      tasks: []  // Make sure to include tasks here
    });
  
    toggleCreateProject(); // Close the create project section
  }

  const handleDeleteProject = (project) => {
    // Filter out the selected project from the projects state
    const updatedProjects = projects.filter((p) => p !== project);
    setProjects(updatedProjects);

    // Clear the selected project
    setSelectedProject(null);
  }

  return (
    <>
      <Nav />
      <div className="w-full h-full flex items-center bg-white">
        <SideBar
          projects={projects}
          toggleCreateProject={toggleCreateProject}
          handleProjectSelect={handleProjectSelect}
          handleDeleteProject={handleDeleteProject} // Pass the delete function to SideBar
        />
        {creatingProject ? (
          <div className="w-3/4 p-8">
          <form className="flex flex-col space-y-4 ml-56">
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={formValues.title}
              onChange={handleFormChange}
              className="p-2 border rounded w-1/2"
            />
            <input
              type="text"
              name="description"
              placeholder="Project Description"
              value={formValues.description}
              onChange={handleFormChange}
              className="p-2 border rounded w-1/2"
            />
            <input
              type="text"
              name="date"
              placeholder="Project Date"
              value={formValues.date}
              onChange={handleFormChange}
              className="p-2 border rounded w-1/6"
            />
            <div>
              <button
                type="submit"
                onClick={handleFormSubmit}
                className="bg-green-500 text-white p-2 rounded hover:bg-green-700 cursor-pointer"
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
        ) : (
          <div className="w-3/4 h-full flex justify-center items-center">
            {selectedProject ? (
              <Project
                title={selectedProject.title}
                description={selectedProject.description}
                date={selectedProject.date}
                tasks={selectedProject.tasks}
              />
            ) : (
              <p>No selected project. Please select a project.</p>
            )}
          </div>
        )}
      </div>
    </>
    );
}

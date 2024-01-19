import { useState, useEffect } from 'react';
import './index.css';
import Footer from './components/Footer.jsx';
import Nav from './components/Nav2.jsx';
import Project from './components/Project.jsx';
import SideBar from './components/SideBar.jsx';
import { useAuth } from './contexts/AuthContext.jsx';

export default function App() {
  const { isLoggedIn, token, handleLogin, signOut } = useAuth();

  const [creatingProject, setCreatingProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [showAuthorizationMessage, setAuthorizationMessage] = useState(false);

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    date: "", 
    tasks: []
  });
  
  useEffect(() => {
    const fetchProjects = async () => {
        try {
            const userEmail = isLoggedIn;

            const response = await fetch('http://localhost:3000', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: userEmail }),
            });

            const data = await response.json();
            setProjects(data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    fetchProjects();
}, [isLoggedIn, token]);

  const toggleCreateProject = () => {
    setCreatingProject(!creatingProject);
  }

  const toggleSelectedProject = () => {
    setSelectedProject(!selectedProject);
  }

  const handleProjectSelect = (project) => {
    setSelectedProject({ ...project, id: project.id, tasks: project.tasks });
    console.log(project.description);
  }  

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3000/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({
          ...formValues,
          email: isLoggedIn, // Assuming isLoggedIn is an array
        }),
      });
  
      if (response.ok) {
        // Call fetchProjects and await its completion
        const updatedProjectsData = await fetchProjects();
        
        // Update the state with the new list of projects
        setProjects(updatedProjectsData);
  
        setFormValues({
          title: '',
          description: '',
          date: '',
          tasks: [],
        });
        toggleCreateProject();
      } else {
        setAuthorizationMessage(true);
        console.error('Failed to create project:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };
  
  const fetchProjects = async () => {
    try {
      const userEmail = isLoggedIn;
  
      const response = await fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email: userEmail }),
      });
  
      const data = await response.json();
      return data; // Return the fetched projects data
    } catch (error) {
      console.error('Error fetching projects:', error);
      return []; // Return an empty array or handle errors accordingly
    }
  };
  

  const handleDeleteProject = async (project) => {
    try {
      console.log(project)
      const response = await fetch(`http://localhost:3000/projects/${project.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.ok) {
        const updatedProjects = projects.filter((p) => p.id !== project.id);
        setProjects(updatedProjects);
        setSelectedProject(null);
      } else {
        console.error('Failed to delete project:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };
  

  return (
    <>
      <Nav signOut={signOut} isLoggedIn={isLoggedIn} />
      <div className="w-full h-full flex items-center bg-white">
        <SideBar
          projects={projects}
          toggleCreateProject={toggleCreateProject}
          handleProjectSelect={handleProjectSelect}
          handleDeleteProject={handleDeleteProject}
          selectedProject={selectedProject}
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
              className="p-2 border rounded w-1/2 bg-stone-200 focus:bg-stone-100 border-b-2 border-stone-300"
            />
            <input
              type="text"
              name="description"
              placeholder="Project Description"
              value={formValues.description}
              onChange={handleFormChange}
              className="p-2 border rounded w-1/2 bg-stone-200 focus:bg-stone-100 border-b-2 border-stone-300"
            />
            <input
              type="text"
              name="date"
              placeholder="Project Date"
              value={formValues.date}
              onChange={handleFormChange}
              className="p-2 border rounded w-1/6 bg-stone-200 focus:bg-stone-100 border-b-2 border-stone-300"
            />
            <div>
              <button
                type="submit"
                onClick={handleFormSubmit}
                className="px-4 py-2 text-xs rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 cursor-pointer border-b-2 border-stone-300"
              >
                Create Project
              </button>
              <button
                type="submit"
                onClick={toggleCreateProject}
                className="px-4 py-2 ml-6 text-sm hover:text-stone-600 text-stone-400 cursor-pointer"
              >
                Cancel
              </button>
              {showAuthorizationMessage ? (
                <p className="text-red-500">You must log in for this feature.</p>
              ) : null}
            </div>
          </form>
        </div>
        ) : (
          <div className="w-3/4 h-full flex flex-col justify-center items-center">
            {selectedProject ? (
              <Project
              id={selectedProject.id}
              title={selectedProject.title}
              description={selectedProject.description}
              date={selectedProject.date}
              tasks={selectedProject.tasks}
              token={token}
              setToken={setToken}
            />
            ) : (
              <div className="h-1/6 flex flex-col items-center justify-between">
                <h1 className="text-3xl font-bold text-stone-700">
                Welcome to Project Manager, {isLoggedIn}!
                </h1>
                <p>No selected project. Please select a project.</p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </>
    );
}

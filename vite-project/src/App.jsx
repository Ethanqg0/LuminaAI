import { useState, useEffect } from 'react';
import './index.css';
import Footer from './components/Footer.jsx';
import Nav from './components/Nav2.jsx';
import Project from './components/Project.jsx';
import SideBar from './components/SideBar.jsx';
import { AuthContextProvider, useAuth } from './contexts/AuthContext.jsx';
import EmptyState from './components/EmptyState.jsx';

export default function App() {
  const { isLoggedIn, setIsLoggedIn, token, setToken, handleLogin, signOut } = useAuth();

  const [creatingProject, setCreatingProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    date: "", 
    tasks: []
  });

  const handleDeleteProject = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const updatedProjects = projects.filter((p) => p.id !== id);
        setProjects(updatedProjects);
        setSelectedProject(null);
      } else {
        console.error('Failed to delete project:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };
  
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
          email: isLoggedIn,
        }),
      });

      if (response.ok) {
        const newProject = await response.json();
        setProjects(prevProjects => [...prevProjects, newProject]);

        setFormValues({
          title: '',
          description: '',
          date: '',
          tasks: [],
        });
        toggleCreateProject();
      } else {
        console.error('Failed to create project:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  // After login, set email to isLoggedIn and localStorage to isLoggedIn. If the page is refreshed, isLoggedIn will be undefined, so we need to check localStorage for the email.
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        let userEmail = localStorage.getItem('email');
        setIsLoggedIn(userEmail);

        console.log(userEmail)
  
        const response = await fetch('http://localhost:3000', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ email: userEmail }),
        });
  
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.log('Error fetching projects:', error)
      }
    };
  
    fetchProjects();
  }, [isLoggedIn, projects.length]); // Add isLoggedIn as a dependency
  

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
              handleDeleteProject={handleDeleteProject}
            />
            ) : (
              <EmptyState />
            )}
          </div>
        )}
      </div>
      <div className="mt-0">
        <Footer />
      </div>
    </>
    );
}

import React, { useState, useEffect } from 'react';
import Nav from './Nav2';
import { AuthContextProvider, useAuth } from '../contexts/AuthContext.jsx';
import collapseUp from '../assets/collapseup.svg';
import collapseDown from '../assets/collapsedown.svg';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const { isLoggedIn, setIsLoggedIn, token, setToken, handleLogin, signOut } = useAuth();

  const fetchProjects = async () => {
    try {
      let userEmail = localStorage.getItem('email');
      setIsLoggedIn(userEmail);

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
      console.log('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [token, isLoggedIn]);

  // Define section states using an object
  const [sectionStates, setSectionStates] = useState({
    recentProjects: false,
    upcomingProjects: false,
    dueProjects: false,
  });

  const toggleSection = (section) => {
    setSectionStates((prevStates) => ({
      ...prevStates,
      [section]: !prevStates[section],
    }));
  };
  const orderProjectsByTimestamp = (projects) => {
    const orderedProjects = projects.sort((a, b) => {
      const dateA = new Date(a.lastModified);
      const dateB = new Date(b.lastModified);
  
      return dateB - dateA;
    });
  
    return orderedProjects;
  };
  

  const orderProjectsByDueDate = (projects) => {
    // First, order projects by due date
    // Example: 2024-01-26
    const orderedProjects = projects.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
  
    console.log("Ordered Projects", orderedProjects);
  
    // Second, if the date is past the current date, remove it from the list
    const currentDate = new Date();
    console.log("Current Date", currentDate);
  
    const filteredProjects = orderedProjects.filter((project) => {
        const projectDate = new Date(project.date);
        const midnightCurrentDate = new Date(currentDate);
        midnightCurrentDate.setHours(0, 0, 0, 0);
      
        console.log("Project Due Date:", project.date);
        console.log("Converted Project Date:", projectDate);
        console.log("Midnight Current Date:", midnightCurrentDate);
        console.log("Comparison Result:", projectDate.getTime() >= midnightCurrentDate.getTime());
      
        return projectDate.getTime() >= midnightCurrentDate.getTime();
      });
      
    console.log("Filtered Projects", filteredProjects);
  
    return filteredProjects;
  };

  const fetchDueProjects = (projects) => {
    const currentDate = new Date();
    const midnightCurrentDate = new Date(currentDate);
    midnightCurrentDate.setHours(0, 0, 0, 0);
  
    const orderedProjects = projects.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
  
    const dueProjects = orderedProjects.filter((project) => {
      const projectDate = new Date(project.date);
  
      return projectDate < midnightCurrentDate;
    });
  
    return dueProjects;
  };
  
  const renderProjects = (projectList) => {
    return projectList.map((project) => (
      <div key={project.id} className="flex flex-col w-full">
        <div className="pt-4 pb-4 flex flex-row hover:bg-gray-200 w-full">
          <h1 className="ml-6">{project.title}:</h1>
          <h1 className="ml-2">{project.date}</h1>
        </div>
      </div>
    ));
  };

  const mostRecentProjects = orderProjectsByTimestamp(projects).slice(0, 3);
  const recentProjects = renderProjects(mostRecentProjects).slice(0, 3);

  const upcomingProjects = orderProjectsByDueDate(projects).reverse();
  const renderUpcomingProjects = renderProjects(upcomingProjects);

  const dueProjects = fetchDueProjects(projects);
  const renderDueProjects = renderProjects(dueProjects);

  return (
    <>
      <Nav />
      <div className="mt-20 flex flex-col items-center">
        <div className=" w-1/2 justify-start">
          <h1 className="text-2xl font-semibold">Hello, <span>{isLoggedIn}!</span></h1>
        </div>

        <div onClick={() => toggleSection('recentProjects')} className="mt-10 w-1/2 flex flex-col justify-start bg-zinc-100">
          <div className="flex flex-row p-4">
            <img src={sectionStates.recentProjects ? collapseUp : collapseDown}></img>
            <h1 className="ml-4 poppins text-xl">Recent Projects</h1>
            <div className="ml-2 bg-green-400 w-8 rounded-full flex justify-center items-center"><h1>{recentProjects.length}</h1></div>
          </div>
          {sectionStates.recentProjects && <div className="mt-2 border-t-2 border-gray-200">{recentProjects}</div>}
        </div>

        <div onClick={() => toggleSection('upcomingProjects')} className="mt-10 w-1/2 flex flex-col justify-start bg-zinc-100">
          <div className="flex flex-row p-4">
            <img src={sectionStates.upcomingProjects ? collapseUp : collapseDown}></img>
            <h1 className="ml-4 poppins text-xl">Upcoming Projects</h1>
            <div className="ml-2 bg-blue-400 w-8 rounded-full flex justify-center items-center"><h1>{upcomingProjects.length}</h1></div>
          </div>
          {sectionStates.upcomingProjects && <div className="mt-2 border-t-2 border-gray-200">{renderUpcomingProjects}</div>}

        </div>

        <div onClick={() => toggleSection('dueProjects')} className="mt-10 w-1/2 flex flex-col justify-start bg-zinc-100">
          <div className="flex flex-row p-4">
            <img src={sectionStates.dueProjects? collapseUp : collapseDown}></img>
            <h1 className="ml-4 poppins text-xl">Due Projects</h1>
            <div className="ml-2 bg-red-400 w-8 rounded-full flex justify-center items-center"><h1>{dueProjects.length}</h1></div>
          </div>
          <div className="">
            {sectionStates.dueProjects && <div className="mt-2 border-t-2 border-gray-200">{renderDueProjects}</div>}
          </div>
        </div>

        <div className="mt-20">
            TODO: Completed Projects Here
        </div>
      </div>
    </>
  );
}

import { useState, useEffect } from 'react';
import Nav from './Nav';
import { useAuth } from '../contexts/AuthContext.jsx';
import collapseUp from '../assets/collapseup.svg';
import collapseDown from '../assets/collapsedown.svg';
import Footer from './Footer.jsx';
import Stats from './Stats.jsx';
import Chart from './Chart.jsx';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const { isLoggedIn, setIsLoggedIn, token, signOut } = useAuth();
  const [sectionStates, setSectionStates] = useState({
      recentProjects: false,
      upcomingProjects: false,
      dueProjects: false,
      completedProjects: false,
  });

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
  
    // Second, if the date is past the current date, remove it from the list
    const currentDate = new Date();
  
    const filteredProjects = orderedProjects.filter((project) => {
        const projectDate = new Date(project.date);
        const midnightCurrentDate = new Date(currentDate);
        midnightCurrentDate.setHours(0, 0, 0, 0);
      
        return projectDate.getTime() >= midnightCurrentDate.getTime();
      });
  
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
      <Link key={project.id} to={"/projects"}>
      <div className="flex flex-col w-full">
        <div className="pt-4 pb-4 flex flex-col hover:bg-neutral-100 bg-neutral-50 w-full">
          <h1 className="ml-2">{project.date}</h1>
          <h1 className="ml-2">{project.title}</h1>
        </div>
      </div>
      </Link>
    ));
  };

  const mostRecentProjects = orderProjectsByTimestamp(projects).slice(0, 3);
  const recentProjects = renderProjects(mostRecentProjects).slice(0, 3);

  const upcomingProjects = orderProjectsByDueDate(projects).reverse();
  const renderUpcomingProjects = renderProjects(upcomingProjects);

  const dueProjects = fetchDueProjects(projects);
  const renderDueProjects = renderProjects(dueProjects);


  const getBackgroundColor = (value) => {
    if (value < 25) {
      return 'red';
    } else if (value < 50) {
      return 'gold';
    } else if (value < 75) {
      return 'green';
    } else {
      return '#006400';
    }
  };
  
  let value = 90;
  // const backgroundColorTest = getBackgroundColor(value);
  // TODO: Currently hardcoding the value for the chart. Replace with actual data
  return (
    <div className="w-full h-full">
      <Nav signOut={signOut}/>
      <div className="w-full flex flex-row h-full">
        <div id="dashboardProjects" className="w-2/3 h-full border-b-2 bg-white">
            <div className="mt-20 flex flex-col items-center">
              <div className=" w-2/3 justify-start">
                <h1 className="text-4xl poppins font-semibold">Welcome Back, Ethan! 💻 </h1>
              </div>

              <div onClick={() => toggleSection('recentProjects')} className="mt-10 w-2/3 flex flex-col justify-start bg-zinc-100">
                <div className="flex flex-row p-4 border-t-4 border-green-500">
                  <img src={sectionStates.recentProjects ? collapseUp : collapseDown} className="w-3"></img>
                  <h1 className="ml-4 font-sans font-semibold text-xl">Recent Projects</h1>
                  <div className="ml-2 bg-green-400 w-8 rounded-full flex justify-center items-center"><h1>{recentProjects.length}</h1></div>
                </div>
                {sectionStates.recentProjects && <div className="mt-2 border-t-2 border-gray-200">{recentProjects}</div>}
              </div>

              <div onClick={() => toggleSection('upcomingProjects')} className="mt-10 w-2/3 flex flex-col justify-start bg-zinc-100">
                <div className="flex flex-row p-4 border-t-4 border-blue-500">
                  <img src={sectionStates.upcomingProjects ? collapseUp : collapseDown} className="w-3"></img>
                  <h1 className="ml-4 font-sans font-semibold text-xl">Upcoming Projects</h1>
                  <div className="ml-2 bg-blue-400 w-8 rounded-full flex justify-center items-center"><h1>{upcomingProjects.length}</h1></div>
                </div>
                {sectionStates.upcomingProjects && <div className="mt-2 border-t-2 border-gray-200">{renderUpcomingProjects}</div>}

              </div>

              <div onClick={() => toggleSection('dueProjects')} className="mt-10 w-2/3 flex flex-col justify-start bg-zinc-100">
                <div className="flex flex-row p-4 border-t-4 border-red-500">
                  <img src={sectionStates.dueProjects? collapseUp : collapseDown} className="w-3"></img>
                  <h1 className="ml-4 font-sans font-semibold text-xl">Due Projects</h1>
                  <div className="ml-2 bg-red-400 w-8 rounded-full flex justify-center items-center"><h1>{dueProjects.length}</h1></div>
                </div>
                <div className="">
                  {sectionStates.dueProjects && <div className="mt-2 border-t-2 border-gray-200">{renderDueProjects}</div>}
                </div>
              </div>

              <div onClick={() => toggleSection('completedProjects')} className="mt-10 w-2/3 flex flex-col justify-start bg-zinc-100">
                <div className="flex flex-row p-4 border-t-4 border-indigo-400">
                  <img src={sectionStates.completedProjects? collapseUp : collapseDown} className="w-3"></img>
                  <h1 className="ml-4 font-sans font-semibold text-xl">Completed Projects</h1>
                  <div className="ml-2 bg-indigo-400 w-8 rounded-full flex justify-center items-center"><h1>{dueProjects.length}</h1></div>
                </div>
                <div className="">
                  {sectionStates.dueProjects && <div className="mt-2 border-t-2 border-gray-200">{renderDueProjects}</div>}
                </div>
              </div>
            </div>

        </div>
        <div className="w-1/2 flex flex-col items-center">
          <div className="flex flex-col items-center justify-center w-full border-l-2 h-1/2 bg-neutral-50">
            <h1 className="text-xl poppins font-semibold mb-6">Active Projects</h1>
            <Chart title={"Project(s) Progress"} value={40} backgroundColor={getBackgroundColor(40)}/>
            <Chart title={"Milestones Met"} value={20} backgroundColor={getBackgroundColor(20)}/>
            <Chart title={"Task Completion"} value={value} backgroundColor={getBackgroundColor(value)}/>
            <Chart title={"Task Duration"} value={70} backgroundColor={getBackgroundColor(70)}/>
          </div>
          <div className="flex items-center justify-center flex-col border-t-2  w-full border-l-2 bg-neutral-100 border-b-2 h-1/2">
            <h1 className="mb-10 text-xl poppins font-semibold">Analytics</h1>
            <Stats />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

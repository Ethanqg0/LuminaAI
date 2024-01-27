import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import React, { useState } from 'react';

const SideBar = ({ projects, toggleCreateProject, handleProjectSelect, selectedProject }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  }

  // Filter projects based on the search term
  const filteredProjects = projects.filter(project => {
    const projectTitle = project.title || ''; // Default to an empty string if title is undefined
    return projectTitle.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  return (
    <div className="w-1/5 rounded-b-lg h-full bg-white flex flex-col items-center border-r border-b border-gray-200 overflow-y-scroll">
      <span className='w-full border-b-2 flex flex-col justify-center items-center mt-6'>
        <SearchBar handleInputChange={handleInputChange}/>
        <button onClick={toggleCreateProject} className="m-4 mt-6 mb-6 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <h1 className="text-white text-xs mb-"> + New Project</h1>
        </button>
      </span>
      <div className="w-full h-full flex flex-col">
        <ul>
          {filteredProjects.map((project) => (
            <li key={project.title} className={`w-full text-base ${selectedProject && selectedProject.id === project.id ? 'text-indigo-600 bg-slate-200' : 'hover:bg-slate-100'}`}>
              <span
                onClick={() => handleProjectSelect(project)}
                className="cursor-pointer p-4 block"
                style={{ height: '85px', display: 'flex', alignItems: 'center'}}
              >
                <h1 className="text-sm overflow-hidden overflow-ellipsis">{project.title}</h1>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

SideBar.propTypes = {
  projects: PropTypes.array.isRequired,
  toggleCreateProject: PropTypes.func.isRequired,
  handleProjectSelect: PropTypes.func.isRequired,
}

export default SideBar;